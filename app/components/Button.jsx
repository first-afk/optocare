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
  color = "primary",
  ...props
}) => {
  const baseClass =
    "relative font-semibold rounded-2xl transition-all duration-200 ease-out shadow-sm";
  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary/90 shadow-primary/20 hover:shadow-md cursor-pointer",
    secondary:
      "bg-secondary text-white hover:bg-secondary/95 shadow-secondary/20 hover:shadow-md cursor-pointer",
    outline:
      "border border-white/50 text-white hover:border-white/70 cursor-pointer",
  };
  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-5 py-2.5 text-md",
    large: "px-7 py-3.5 text-lg",
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
