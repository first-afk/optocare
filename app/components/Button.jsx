import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  onClick,
  type = "button",
  className = "",
  ariaLabel,
  color = 'primary',
  ...props
}) => {
  const baseClass = "relative font-medium rounded-md transition-colors";
  const variants = {
    primary: "bg-primary text-primary hover:bg-opacity-90 cursor-pointer transition-all ",
    secondary: "bg-neutral-600 text-primary hover:bg-opacity-90 cursor-pointer transition-all ",
    outline: "border border-white cursor-pointer transition-all ",
  };
  const sizes = {
    small: "px-2 py-1.5 text-sm",
    medium: "px-4 py-2 text-md",
    large: "px-6 py-3 text-lg",
  };

  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";
  const finalClass = `${baseClass} ${variants[variant]} ${sizes[size]} ${disabledClass} ${className}`;

  return (
    <>  
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={finalClass}
          aria-label={ariaLabel}
          {...props}
        >
          {children}
        </button>
    </>
  );
};

export default Button;
