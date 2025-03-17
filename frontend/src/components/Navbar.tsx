import { Link } from "react-router-dom";
import paths from "../utils/paths";
import { useState } from "react";
import EditTilesButton from "./input/EditTilesButton";
import Tooltip from "./Tooltip";
import LoginScreen from "../screens/account/LoginScreen";

const Navbar = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);

  const handleEditModeChange = (newEditMode: boolean) => {
    setEditMode(newEditMode);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
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
        <button className="text-gray-100 hover:bg-gray-600 p-2" onClick={handleLoginClick}>
          Login
        </button>
        <Link to={paths.dashboard.about}>
          <button className="text-gray-100 hover:bg-gray-600 p-2">
            {editMode ? <p>Edit</p> : <p>About</p>}
          </button>
        </Link>
      </div>
      {showLogin && (
        <div className="login-modal">
          <LoginScreen />
          <button onClick={handleCloseLogin}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
