import { Route, Routes } from "react-router-dom";
import DashboardCreateScreen from "./dashboard/DashboardCreateScreen";
import paths from "../utils/paths";
import DashboardScreen from "./dashboard/DashboardScreen";
import SideBar from "../components/SideBar";
import { useQuery } from "@apollo/client/react/hooks/useQuery";
import {
  GET_DASHBOARDS,
  GetDashboardsResult,
} from "../hooks/useDashboardQuery";
import TileCreateScreen from "./tile/TileCreateScreen";

export const HomeScreen = () => {
  const { data } = useQuery<GetDashboardsResult>(GET_DASHBOARDS);

  return (
    <div className="w-full h-full flex">
      <SideBar
        className="h-full w-36 overflow-hidden shrink-0"
        dashboards={data?.dashboards}
      />
      <div className="grow h-full">
        <Routes>
          <Route
            path={paths.dashboard.create}
            element={<DashboardCreateScreen />}
          />
          <Route path={paths.dashboard.id} element={<DashboardScreen />} />
          <Route path={paths.tile.create} element={<TileCreateScreen />} />
          <Route path={"*"} element={<DashboardScreen />} />
        </Routes>
      </div>
    </div>
  );
};
