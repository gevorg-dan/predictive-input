import React from "react";
import styled from "styled-components";

interface TextFieldInterface {
  className?: string;
  value: string;
  placeholder?: string;
  onChange: (newValue: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

function TextField({
  className,
  value,
  placeholder,
  onChange,
  onFocus,
  onBlur
}: TextFieldInterface) {
  return (
    <input
      className={className}
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}

export default styled(TextField)`
  display: inline-flex;
  position: relative;
  width: 100%;
  height: 56px;
  padding: 15.5px 20px 15.5px 15px;
  border: 1px solid rgb(196, 196, 196);
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.87);
  cursor: text;
  font-size: 1rem;
  box-sizing: border-box;
  align-items: center;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  letter-spacing: 0.00938em;
  margin-top: 16px;
  margin-bottom: 8px;
  line-height: 1.43;
  text-overflow: ellipsis;
  :hover {
    border-color: rgba(0, 0, 0, 0.87);
  }
  :focus {
    border: 2px solid rgb(25, 118, 210);
  }
`;
