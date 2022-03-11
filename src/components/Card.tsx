import React from "react";

type Props = {
  className?: string;
  title?: string;
};

const Card: React.FC<Props> = ({ children, className, title }) => {
  return (
    <div
      className={"card" + (className ? ` ${className}` : "")}
      title={title ? title : ""}
      onClick={e => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

export default Card;
