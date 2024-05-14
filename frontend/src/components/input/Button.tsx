import { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "default" | "primary";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: ButtonVariant;
}

const buttonStyle = (
  variant?: ButtonVariant
): React.CSSProperties | undefined => {
  if (variant === "primary") return { background: "green" };
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  variant,
  ...props
}) => {
  return (
    <button
      style={buttonStyle(variant)}
      {...props}
      className={
        props.className +
        " px-2 py-1 bg-gray-950 border rounded w-fit border-gray-700 hover:bg-gray-800 text-gray-200"
      }
    >
      {loading ? "loading" : children}
    </button>
  );
};
export default Button;
