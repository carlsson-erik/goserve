import React from "react";
import Button from "./input/Button";

export interface DialogProps {
  title?: string;
  children?: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  onCancel,
  onConfirm,
  children,
  title,
}) => {
  return (
    <div className="bg-gray-900 rounded min-w-64 border border-gray-700">
      <div className="p-2 bg-gray-900">{title}</div>
      <div className="p-2 bg-gray-800">{children}</div>
      <div className="p-2 flex gap-4 flex-row-reverse">
        <Button onClick={onConfirm}>Confirm</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
};

export default Dialog;
