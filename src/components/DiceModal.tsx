import React from "react";

import Backdrop from "./Backdrop";
import Modal from "./Modal";
import ModalBtnClose from "./ModalBtnClose";
import NumberGrid from "./NumberGrid";

type Props = {
  show: boolean;
  die: number;
  handleClose: () => void;
  hndClick: (e: React.FormEvent) => void;
};

const DiceModal: React.FC<Props> = ({ show, die, handleClose, hndClick }) => {
  return (
    <Backdrop onClick={handleClose} show={show}>
      <Modal className="dice-modal" enabled={show} onClose={handleClose}>
        <h1>D{die}</h1>
        <ModalBtnClose onClick={handleClose} />
        <NumberGrid die={die} hndClick={hndClick} />
      </Modal>
    </Backdrop>
  );
};

export default DiceModal;
