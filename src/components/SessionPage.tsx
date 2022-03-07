import React, { useEffect, useState } from "react";
import { MdDelete, MdOutlineReplay } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

import Card from "./Card";
import DeleteModal from "./DeleteModal";
import DiceStatView from "./DiceStatView";
import ResumeModal from "./ResumeModal";

const SessionPage: React.FC = () => {
  const [session, setSession] = useState<ISession | undefined>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [resumeModal, setResumeModal] = useState(false);

  const { sessionId } = useParams();
  const { currSession, setCurrSession, getSession, removeSession } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (getSession) {
      const tempSession = getSession!(sessionId!);
      setSession(tempSession);
    }
  }, [getSession]);

  const handleDelete = async () => {
    try {
      await removeSession?.(session!._id!);

      navigate("/");
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleResume = () => {
    if (currSession) {
      setResumeModal(true);
      return;
    }

    confirmResume();
  };

  const confirmResume = async () => {
    setCurrSession?.(session);
    navigate("/ongoing-session");
  };

  if (getSession === null) {
    return (
      <div className="session-stats-grid">
        <h1>Loading...</h1>
        <Card className="stats"></Card>
      </div>
    );
  }

  if (session != null) {
    return (
      <div className="session-stats-grid">
        <h1>{session.name}</h1>
        <Card className="stats">
          <DiceStatView stats={session.stats} />
        </Card>
        <div className="buttons">
          <button className="btn btn-neutral icon" title="Resume Session" onClick={handleResume}>
            <MdOutlineReplay />
          </button>
          <button
            className="btn btn-danger icon"
            title="Delete Session"
            onClick={() => setDeleteModal(true)}
          >
            <MdDelete />
          </button>
        </div>

        <DeleteModal
          show={deleteModal}
          onClose={() => setDeleteModal(false)}
          onDelete={handleDelete}
        />
        <ResumeModal
          show={resumeModal}
          onClose={() => setResumeModal(false)}
          onResume={confirmResume}
        />
      </div>
    );
  } else {
    return (
      <div className="card-fit">
        <h1>No session found with this id 😦</h1>
      </div>
    );
  }
};

export default SessionPage;
