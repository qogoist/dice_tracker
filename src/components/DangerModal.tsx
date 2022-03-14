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
  btn?: string;
};

const DangerModal: React.FC<Props> = ({ show, onClose, onDelete, message, type, btn }) => {
  return (
    <Backdrop show={show} onClick={onClose}>
      <Modal enabled={show}>
        <h2>{type}</h2>
        <div className="modal-content">
          <p>{message}</p>
          <button className="btn btn-danger" onClick={onDelete}>
            {btn ? btn : "Delete"}
          </button>
        </div>
        <ModalBtnClose onClick={onClose} />
      </Modal>
    </Backdrop>
  );
};

export default DangerModal;
