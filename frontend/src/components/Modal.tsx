import React from "react";

export interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <div className="absolute w-full h-full bg-black/40 z-10 flex justify-center items-center">
      {props.children}
    </div>
  );
};

export const useModal = () => {};

export default Modal;
