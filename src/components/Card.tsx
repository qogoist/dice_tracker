import React from "react";

type Props = {
  className?: string;
};

const Card: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={"card" + (className ? ` ${className}` : "")} onClick={e => e.stopPropagation()}>
      {children}
    </div>
  );
};

export default Card;
