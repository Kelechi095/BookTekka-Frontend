"use client";
import { BiDollar } from "react-icons/bi";

const Input = ({
  id,
  id1,
  label,
  type = "text",
  disabled,
  onChange,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <label
        className={`
          pl-1

        `}
      >
        {label}
      </label>
      <input
        id={id}
        disabled={disabled}
        onChange={onChange}
        placeholder={label.toLowerCase()}
        type={type}
        className={`
          w-full
          pl-2
          py-3
          font-light
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          "border-neutral-300"
           "focus:border-black"
        `}
      />
    </div>
  );
};

export default Input;
