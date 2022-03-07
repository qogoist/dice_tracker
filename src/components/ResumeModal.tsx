import React from "react";
import Backdrop from "./Backdrop";
import Modal from "./Modal";
import ModalBtnClose from "./ModalBtnClose";

type Props = {
  show: boolean;
  onClose: () => void;
  onResume: () => void;
};

const ResumeModal: React.FC<Props> = ({ show, onClose, onResume }) => {
  return (
    <Backdrop show={show} onClick={onClose}>
      <Modal enabled={show}>
        <h1>Resuming Session</h1>
        <div className="modal-content">
          <p>
            You are trying to resume this session while there is already an ongoing session.
            Proceeding will delete the ongoing session.
          </p>
          <button className="btn btn-danger" onClick={onResume}>
            Proceed
          </button>
        </div>
        <ModalBtnClose onClick={onClose} />
      </Modal>
    </Backdrop>
  );
};

export default ResumeModal;
