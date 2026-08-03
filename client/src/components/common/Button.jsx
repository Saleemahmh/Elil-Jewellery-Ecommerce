import { Link } from "react-router-dom";

const Button = ({
  children,
  to,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center px-8 py-3 rounded-full font-medium transition-all duration-300 ease-in-out tracking-wide";

  const variants = {
    primary:
      "bg-[#4A294B] text-white hover:bg-[#5F2147] hover:-translate-y-1 hover:shadow-lg",

    secondary:
      "border border-[#C7A05A] text-[#4A294B] hover:bg-[#C7A05A] hover:text-white hover:-translate-y-1",

    gold:
      "bg-[#C7A05A] text-white hover:brightness-110 hover:-translate-y-1 hover:shadow-lg",

    outline:
      "border border-[#4A294B] text-[#4A294B] hover:bg-[#4A294B] hover:text-white hover:-translate-y-1 hover:shadow-lg",

     whiteOutline:
    "border border-white text-white hover:bg-white hover:text-[#4A294B] hover:-translate-y-1 hover:shadow-lg",
  };

  if (to) {
    return (
      <Link
        to={to}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;