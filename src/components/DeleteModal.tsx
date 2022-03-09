import React from "react";
import Backdrop from "./Backdrop";
import Modal from "./Modal";
import ModalBtnClose from "./ModalBtnClose";

type Props = {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
  message: string;
  type: string;
};

const DeleteModal: React.FC<Props> = ({ show, onClose, onDelete, message, type }) => {
  return (
    <Backdrop show={show} onClick={onClose}>
      <Modal enabled={show}>
        <h1>{type}</h1>
        <div className="modal-content">
          <p>{message}</p>
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
