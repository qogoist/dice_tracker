import React from "react";
import { FocusOn } from "react-focus-on";

type Props = {
  className?: string;
  enabled: boolean;
  onClose?: (...args: any[]) => void;
};

const Modal: React.FC<Props> = ({ children, className, enabled, onClose }) => {
  return (
    <FocusOn className="modal-focus" enabled={enabled} onEscapeKey={onClose}>
      <div
        className={"card modal" + (className ? ` ${className}` : "")}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </FocusOn>
  );
};

export default Modal;
