import React from "react";

type Props = {
  onClick?: (...args: any[]) => void;
  onKeyPress?: () => void;
  className?: string;
  value?: string;
};

const Button: React.FC<Props> = ({ children, value, className, onClick, onKeyPress }) => {
  const keyHandler = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (onKeyPress) onKeyPress();
    else {
      if (e.key === "Enter") e.currentTarget.click();
    }
  };

  return (
    <button
      className={className ? `${className}` : ""}
      onClick={onClick}
      onKeyPress={keyHandler}
      tabIndex={0}
      value={value}
    >
      {children}
    </button>
  );
};

export default Button;
