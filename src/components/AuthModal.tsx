import React from "react";
import AlertBox from "./AlertBox";
import Backdrop from "./Backdrop";
import FormLabel from "./FormLabel";
import Modal from "./Modal";
import ModalBtnClose from "./ModalBtnClose";

type Props = {
  show: boolean;
  error: string;
  onClose: () => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const AuthModal: React.FC<Props> = ({ show, error, onClose, onChange, onSubmit }) => {
  return (
    <Backdrop show={show} onClick={onClose}>
      <Modal enabled={show}>
        <h2>Authenticate</h2>
        <form className="modal-content" onSubmit={onSubmit} id="auth-form">
          <AlertBox active={error ? true : false} type="error" message={error} />
          <FormLabel
            description="Email"
            name="email"
            type="email"
            autocomplete="username"
            isRequired={true}
            handleChange={onChange}
          />
          <FormLabel
            description="Password"
            name="password"
            type="password"
            autocomplete="current-password"
            isRequired={true}
            handleChange={onChange}
          />
          <button className="btn auth-btn">Confirm</button>
        </form>
        <ModalBtnClose onClick={onClose} />
      </Modal>
    </Backdrop>
  );
};

export default AuthModal;
