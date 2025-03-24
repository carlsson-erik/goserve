import { Link } from "react-router-dom";
import paths from "../utils/paths";

const Navbar = () => {
  return (
    <div className="p-2 flex justify-between gap-2 bg-gray-800 border-b border-gray-700">
      <Link to={paths.root} className="p-2 font-medium text-2xl text-gray-100">
        <span>Go Serve</span>
      </Link>
      <div className="flex items-center"></div>
    </div>
  );
};

export default Navbar;
