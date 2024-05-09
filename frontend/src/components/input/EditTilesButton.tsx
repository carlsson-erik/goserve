import { IconEditOff, IconEyeEdit } from "@tabler/icons-react";
import { useState } from "react";
import Button from "./Button";

const EditTilesButton = ({
  onEditModeChange,
}: {
  onEditModeChange: (editMode: boolean) => void;
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    onEditModeChange(!editMode);
  };

  return (
    <Button
      onClick={toggleEditMode}
      className="text-white hover:bg-gray-600 p-2"
    >
      {editMode ? <IconEyeEdit /> : <IconEditOff />}
    </Button>
  );
};

export default EditTilesButton;
