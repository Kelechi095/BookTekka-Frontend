"use client";
import { BiDollar } from "react-icons/bi";


const Input = ({
  id,
  label,
  type = "text",
  disabled,
  onChange,
  errors,
}) => {
  return (
    <div className="w-full relative">
      
      <input
        id={id}
        disabled={disabled}
        onChange={onChange}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          p-1
          pt-6 
          pl-4 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
        `}
      />
      <label
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3
          text-neutral-500 
          top-5 
          z-10 
          origin-[0] 
          left-4
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
