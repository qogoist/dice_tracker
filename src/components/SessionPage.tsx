import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdOutlineReplay } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

import Card from "./Card";
import DeleteModal from "./DeleteModal";
import DiceStatView from "./DiceStatView";

const SessionPage: React.FC = () => {
  const [session, setSession] = useState<ISession | undefined>();
  const [deleteModal, setDeleteModal] = useState(false);

  const { sessionId } = useParams();
  const { getSession, removeSession } = useSession();
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
    navigate("/continue-session", { state: session });
  };

  const handleEdit = () => {
    navigate("/edit-session", { state: { session: session, edit: true } });
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
          <button
            className="btn btn-neutral icon"
            title="Edit Session Information"
            onClick={handleEdit}
          >
            <MdEdit />
          </button>
          <button
            className="btn btn-neutral icon"
            title="Resume Session (Add Rolls)"
            onClick={handleResume}
          >
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
          message="You are about to delete this session. This cannot be undone. Proceed?"
          type="Deleting Session"
          show={deleteModal}
          onClose={() => setDeleteModal(false)}
          onDelete={handleDelete}
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
