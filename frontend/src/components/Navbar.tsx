import { Link } from "react-router-dom";
import paths from "../utils/paths";
import React from "react";
import EditTilesButton from "./input/EditTilesButton";
import Tooltip from "./Tooltip";

const Navbar = () => {
  const [editMode, setEditMode] = React.useState<boolean>(false);

  const handleEditModeChange = (newEditMode: boolean) => {
    setEditMode(newEditMode);
  };

  return (
    <div className="p-2 flex justify-between gap-2 bg-gray-800 border-b border-gray-700">
      <Link to={paths.root} className="p-2 font-medium text-2xl text-gray-100">
        <span>Go Serve</span>
      </Link>
      <div className="flex items-center">
        <Tooltip content="Edit dashboard">
          <EditTilesButton onEditModeChange={handleEditModeChange} />
        </Tooltip>
        <Link to={paths.dashboard.about}>
          <button className="text-gray-100 hover:bg-gray-600 p-2">
            {editMode ? <p>Edit</p> : <p>About</p>}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
