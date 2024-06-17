import { Route, Routes } from "react-router-dom";
import paths from "../utils/paths";
import DashboardScreen from "./dashboard/DashboardScreen";
import SideBar from "../components/SideBar";
import { useQuery } from "@apollo/client/react/hooks/useQuery";
import { GET_TEMPLATES } from "../hooks/template/useTemplateQuery";
import DashboardCreateScreen from "./dashboard/DashboardCreateScreen";
import TileCreateScreen from "./tile/TileCreateScreen";
import TemplateCreateScreen from "./template/TemplateCreateScreen";
import {
  GET_DASHBOARDS,
  GetDashboardsResult,
} from "../hooks/dashboard/useDashboardQuery";

export const HomeScreen = () => {
  const { data: dashboards } = useQuery<GetDashboardsResult>(GET_DASHBOARDS);

  const { data: templates } = useQuery(GET_TEMPLATES);

  return (
    <div className="w-full h-full flex items-stretch overflow-hidden">
      <SideBar
        className="shrink-0"
        dashboards={dashboards?.dashboards}
        templates={templates?.templates}
      />
      <div className="grow">
        <Routes>
          <Route
            path={paths.dashboard.create}
            element={<DashboardCreateScreen />}
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
          <Route path={paths.template.id} element={<TemplateCreateScreen />} />

          <Route path={"*"} element={<DashboardScreen />} />
        </Routes>
      </div>
    </div>
  );
};
