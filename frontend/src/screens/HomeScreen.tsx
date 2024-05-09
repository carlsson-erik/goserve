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
import React from "react";
import useDeleteDashboard from "../hooks/useDeleteDashboard";

export const HomeScreen = () => {
  const { data } = useQuery<GetDashboardsResult>(GET_DASHBOARDS);

  const [deleteDashboard] = useDeleteDashboard();

  const onDeleteDashboard = React.useCallback(
    (id: number) => {
      deleteDashboard(id);
    },
    [deleteDashboard]
  );

  return (
    <div className="w-full h-full flex">
      <SideBar
        dashboards={data?.dashboards}
        onDeleteDashboard={onDeleteDashboard}
      />

      <Routes>
        <Route
          path={paths.dashboard.create}
          element={<DashboardCreateScreen />}
        />
        <Route path={paths.dashboard.id} element={<DashboardScreen />} />
        <Route path={"*"} element={<DashboardScreen />} />
      </Routes>
    </div>
  );
};
