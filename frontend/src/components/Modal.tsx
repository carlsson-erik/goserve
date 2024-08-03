import React from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
  children: React.ReactNode;
  open?: boolean;
  close: () => void;
}

const Modal = (props: ModalProps) => {
  if (!props.open) return null;
  return createPortal(
    <>
      <div
        className="absolute w-full z-10 h-full cursor-pointer bg-black/10"
        onClick={() => {
          console.log("close");
          props.close();
        }}
      />
      <div className="absolute w-full z-10 h-full pointer-events-none flex justify-center items-center">
        <div className="pointer-events-auto">{props.children}</div>
      </div>
    </>,
    document.getElementById("modal-root") ?? document.body
  );
};

export const useModal = <T,>() => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<T | undefined>();

  return {
    props: { open, close: () => setOpen(false) },
    open: (data: T) => {
      setData(data);
      setOpen(true);
    },
    data,
    close: () => setOpen(false),
  };
};

export default Modal;
