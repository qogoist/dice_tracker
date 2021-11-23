import React from "react";
import { MdClose } from "react-icons/md";
import Button from "./Button";

type Props = {
  onClick: () => void;
};

const ModalBtnClose: React.FC<Props> = ({ onClick }) => {
  return (
    <Button className="modal-btn-close" onClick={onClick}>
      <MdClose />
    </Button>
  );
};

export default ModalBtnClose;
