"use client";

const Button = ({ label, onClick, disabled, outline, small, Icon, isLoading }) => {
    console.log(isLoading)
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full 
    ${outline ? "bg-white" : "bg-blue-500"}
    ${outline ? "border-black" : "border-none"}
    ${outline ? "text-black" : "text-white"}
    ${small ? "py-1" : "py-3"}
    ${small ? "text-sm" : "text-lg"}
    ${small ? "font-light" : "font-semibold"}
    ${outline ? "border-[1px]" : "border-2"}`}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {isLoading && !outline ? "Submitting" : label}
    </button>
  );
};

export default Button;
