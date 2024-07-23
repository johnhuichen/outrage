import cx from "classnames";
import noop from "lodash/noop";
import { useCallback } from "react";

interface InputProps {
  value: string;
  setValue(value: string): void;
  name?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  required?: boolean;
  handleFocus?(): void;
  handleKeyUp?(event: React.KeyboardEvent<HTMLInputElement>): void;
  handleChange?(event: React.ChangeEvent<HTMLInputElement>): void;
  handleClick?(event: React.MouseEvent<HTMLInputElement>): void;
}

const Input: React.FC<InputProps> = ({
  value,
  setValue,
  name,
  type = "text",
  placeholder = "",
  className = "",
  minLength = 0,
  maxLength = 255,
  min = 0,
  max = 1e12,
  required = false,
  handleFocus = noop,
  handleKeyUp = noop,
  handleChange = noop,
  handleClick = noop,
}: InputProps) => {
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(event);
      setValue(event.target.value);
    },
    [setValue, handleChange],
  );

  return (
    <input
      className={cx(
        className,
        "p-2 rounded-md w-full h-full border border-solid border-slate-300 text-black",
      )}
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      autoComplete="on"
      minLength={minLength}
      maxLength={maxLength}
      min={min}
      max={max}
      required={required}
      pattern=".*\S+.*"
      onChange={onChange}
      onFocus={handleFocus}
      onKeyUp={handleKeyUp}
      onClick={handleClick}
    />
  );
};

export default Input;
