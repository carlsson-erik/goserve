import { Route, Routes } from "react-router-dom";
import DashboardCreateScreen from "./dashboard/DashboardCreateScreen";
import paths from "../utils/paths";
import DashboardScreen from "./dashboard/DashboardScreen";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";

export const HomeScreen = () => {
  return (
    <div className="h-full">
      <Navbar />
      <div className="w-full h-full flex">
        <SideBar />

        <Routes>
          <Route
            path={paths.dashboard.create}
            element={<DashboardCreateScreen />}
          />
          <Route path={"*"} element={<DashboardScreen />} />
        </Routes>
      </div>
    </div>
  );
};
