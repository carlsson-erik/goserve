import React from "react";
import Dialog from "../Dialog";
import TileCreateForm from "../../screens/tile/TileCreateForm";

export interface DashboardCreateTileDialog {
  className?: string;
  col: number | undefined;
  row: number | undefined;
  onCancel: () => void;
  onConfirm: () => void;
}

const DashboardCreateTileDialog: React.FC<DashboardCreateTileDialog> = ({
  col,
  row,
  onCancel,
  onConfirm,
}) => {
  return (
    <Dialog onCancel={onCancel} onConfirm={onConfirm}>
      <TileCreateForm col={col} row={row} />
    </Dialog>
  );
};

export default DashboardCreateTileDialog;
