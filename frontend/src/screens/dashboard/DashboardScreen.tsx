import { Link, useParams } from "react-router-dom";
import paths from "../../utils/paths";
import Button from "../../components/input/Button";
import { useQuery } from "@apollo/client";
import {
  GET_DASHBOARDS,
  GetDashboardsResult,
} from "../../hooks/useDashboardQuery";
import useDeleteDashboard from "../../hooks/useDeleteDashboard";
import React from "react";

const DashboardScreen = () => {
  const { dashboardId } = useParams();

  const { data } = useQuery<GetDashboardsResult>(GET_DASHBOARDS);

  const [deleteDashboard] = useDeleteDashboard();

  const onDeleteDashboard = React.useCallback(
    (id: number) => {
      deleteDashboard(id);
    },
    [deleteDashboard]
  );

  const dashboard = data?.dashboards.find((d) => d.id === Number(dashboardId));

  const tiles = React.useMemo(() => {
    const numberOfTiles = dashboard ? dashboard?.cols * dashboard?.rows : 0;

    return new Array(numberOfTiles).fill(undefined);
  }, [dashboard]);

  if (!dashboard || !dashboardId) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <span className="text-2xl">No dashboard</span>
        <Link to={paths.dashboard.create}>
          <Button>Create dashboard</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col">
      <div className="p-2 flex justify-between">
        <span>{dashboard.name}</span>
        <Button
          className="text-red-400"
          onClick={() => onDeleteDashboard(dashboard.id)}
        >
          Delete
        </Button>
      </div>
      <div
        className={`w-full h-full bg-gray-600 grid grid-cols-8 justify-stretch`}
      >
        {tiles.map((t, index) => {
          return <div className="border">{index} </div>;
        })}
      </div>
    </div>
  );
};

export default DashboardScreen;
