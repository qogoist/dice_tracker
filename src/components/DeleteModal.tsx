import React from "react";
import Backdrop from "./Backdrop";
import Modal from "./Modal";
import ModalBtnClose from "./ModalBtnClose";

type Props = {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const DeleteModal: React.FC<Props> = ({ show, onClose, onDelete }) => {
  return (
    <Backdrop show={show} onClick={onClose}>
      <Modal enabled={show}>
        <h1>Deleting Session</h1>
        <div className="modal-content">
          <p>You are about to delete this session. This cannot be undone. Proceed?</p>
          <button className="btn btn-danger" onClick={onDelete}>
            Delete
          </button>
        </div>
        <ModalBtnClose onClick={onClose} />
      </Modal>
    </Backdrop>
  );
};

export default DeleteModal;
