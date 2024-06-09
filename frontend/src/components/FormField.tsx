import React from "react";

export interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ children, error, ...props }) => {
  return (
    <div {...props}>
      {children}
      {error && <span className="block text-red-800">{error}</span>}
    </div>
  );
};

export default FormField;
