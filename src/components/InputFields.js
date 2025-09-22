import React from "react";

function InputField({ type, value, onChange, placeholder }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ margin: "5px", padding: "8px" }}
    />
  );
}

export default InputField;