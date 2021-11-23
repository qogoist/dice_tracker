import React from "react";

type Props = {
  onClick: () => void;
  show: boolean;
};

const Backdrop: React.FC<Props> = ({ onClick, show, children }) => {
  const classes = show ? "backdrop active" : "backdrop hidden";

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

export default Backdrop;
