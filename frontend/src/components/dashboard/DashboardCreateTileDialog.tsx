import React from "react";
import Dialog from "../Dialog";

export interface DashboardCreateTileDialog {
  className?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const DashboardCreateTileDialog: React.FC<DashboardCreateTileDialog> = ({
  onCancel,
  onConfirm,
}) => {
  return (
    <Dialog onCancel={onCancel} onConfirm={onConfirm}>
      Hej
    </Dialog>
  );
};

export default DashboardCreateTileDialog;
