import React from "react";

type Props = {
  description: string;
  type: string;
  name: string;
  placeholder?: string;
  autocomplete?: "new-password" | "current-password" | "username" | string;
  value?: string;
  defaultValue?: string;
  isRequired?: boolean;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const FormLabel: React.FC<Props> = ({
  description,
  type,
  name,
  placeholder,
  autocomplete,
  value,
  defaultValue,
  isRequired,
  handleChange,
}) => {
  return (
    <div className="form-label">
      <input
        onChange={handleChange}
        type={type}
        name={name}
        placeholder={placeholder ? placeholder : " "}
        autoComplete={autocomplete ? autocomplete : "on"}
        value={value}
        defaultValue={defaultValue}
        required={isRequired}
      />
      <label>{description}</label>
    </div>
  );
};

export default FormLabel;
