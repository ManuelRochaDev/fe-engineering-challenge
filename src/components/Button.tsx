import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "link";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  const baseStyles = "cursor-pointer transition-all duration-200 font-bold uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = {
    danger: "bg-red-700 hover:bg-red-800 hover:scale-105 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl border-2 border-red-900",
    link: "text-blue-600 hover:text-blue-700 underline bg-transparent p-0 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded",
    primary: "bg-red-600 hover:bg-red-700 hover:scale-105 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl border-2 border-red-800",
    secondary: "bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-xl shadow-md hover:shadow-lg border-2 border-gray-400",
    success: "bg-green-600 hover:bg-green-700 hover:scale-105 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl border-2 border-green-800",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
