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
import TileCreateScreen from "./template/TemplateCreateScreen";
import { GET_TEMPLATES, GetTemplatesResult } from "../hooks/useTemplateQuery";
import TemplateCreateScreen from "./template/TemplateCreateScreen";

export const HomeScreen = () => {
  const { data: dashboards } = useQuery<GetDashboardsResult>(GET_DASHBOARDS);

  const { data: templates } = useQuery<GetTemplatesResult>(GET_TEMPLATES);

  return (
    <div className="w-full h-full flex">
      <SideBar
        className="h-full w-36 overflow-hidden shrink-0"
        dashboards={dashboards?.dashboards}
        templates={templates?.templates}
      />
      <div className="grow h-full">
        <Routes>
          <Route
            path={paths.dashboard.create}
            element={<DashbordCreateScreen />}
          />
          <Route
            path={paths.dashboard.tile.create}
            element={<TileCreateScreen />}
          />
          <Route path={paths.dashboard.id} element={<DashboardScreen />} />
          <Route
            path={paths.template.create}
            element={<TemplateCreateScreen />}
          />

          <Route path={"*"} element={<DashboardScreen />} />
        </Routes>
      </div>
    </div>
  );
};
