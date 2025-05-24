import React from "react";

function Button({
  children, //text
  type = "button",
  bgColor = "bg-blue-600",
  textcolor = "text-white",
  className,
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg ${bgColor} ${textcolor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
