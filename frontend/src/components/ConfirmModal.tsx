import React from "react";
import Modal, { useModal } from "./Modal";
import Dialog from "./Dialog";

export interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  const modal = useModal();

  return (
    <Modal {...modal.props}>
      {() => (
        <Dialog title={title} onConfirm={onConfirm} onCancel={onCancel}>
          {message}
        </Dialog>
      )}
    </Modal>
  );
};

const useConfirmModal = () => {
  const [modal, setModal] = React.useState<React.ReactNode | null>(null);

  const confirm = (message: string, title = "Confirm"): Promise<boolean> => {
    const promise = new Promise<boolean>((resolve) => {
      setModal(
        ConfirmModal({
          title,
          message,
          onConfirm: () => {
            setModal(null);
            resolve(true);
          },
          onCancel: () => {
            setModal(null);
            resolve(false);
          },
        })
      );
    });

    return promise;
  };

  return [confirm, modal] as const;
};

export default useConfirmModal;
