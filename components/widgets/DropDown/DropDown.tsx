import cx from "classnames";
import { useCallback } from "react";

interface LabelValueOption {
  label: string;
  value: string;
}

interface DropDownProps {
  value: string;
  options: LabelValueOption[] | string[];
  setValue(value: string): void;
  className?: string;
  required?: boolean;
}

const DropDown = ({
  value,
  options,
  setValue,
  className = "",
  required = false,
}: DropDownProps) => {
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(event.target.value);
    },
    [setValue],
  );

  return (
    <select
      value={value}
      onChange={onChange}
      className={cx(
        className,
        "w-full px-2.5 py-2 bg-white border border-solid border-gray-300 rounded-md text-black",
      )}
      required={required}
    >
      <option value=""></option>
      {options.map((option) => {
        const newValue = typeof option === "string" ? option : option.value;
        const label = typeof option === "string" ? option : option.label;

        return (
          <option key={`option-${newValue}`} value={newValue}>
            {label}
          </option>
        );
      })}
    </select>
  );
};

export default DropDown;
