import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...props }) => {
  return (
    <button
      {...props}
      className={
        props.className +
        " px-2 py-1 bg-gray-950 border rounded border-gray-700 hover:bg-gray-800 text-gray-200"
      }
    >
      {loading ? "loading" : children}
    </button>
  );
};
export default Button;
