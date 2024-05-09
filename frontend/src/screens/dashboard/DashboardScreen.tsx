import { Link, useParams } from "react-router-dom";
import paths from "../../utils/paths";
import Button from "../../components/input/Button";
import { useQuery } from "@apollo/client";
import {
  GET_DASHBOARDS,
  GetDashboardsResult,
} from "../../hooks/useDashboardQuery";

const DashboardScreen = () => {
  const { dashboardId } = useParams();

  const { data } = useQuery<GetDashboardsResult>(GET_DASHBOARDS);

  const dashboard = data?.dashboards.find((d) => d.id === dashboardId);
  if (!dashboard || !dashboardId) {
    return (
      <div>
        <div className="text-black">
          <span className="text-2xl">Create new dashboard</span>
          <Link to={paths.dashboard.create}>
            <Button>Create dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <span>{dashboard.name}</span>
    </div>
  );
};

export default DashboardScreen;
