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
import Tile from "../../components/Tile";
import { IconEdit, IconEditOff } from "@tabler/icons-react";

const DashboardScreen = () => {
  const [editing, setEditing] = React.useState(false);

  const { dashboardId } = useParams();

  const { data } = useQuery<GetDashboardsResult>(GET_DASHBOARDS);

  const [deleteDashboard] = useDeleteDashboard();

  const onTileEditClick = React.useCallback((id: string) => {}, []);

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
        <div className="flex items-center gap-2">
          <Button onClick={() => setEditing(!editing)}>
            {editing ? <IconEditOff /> : <IconEdit />}
          </Button>
          <Button
            className="text-red-400"
            onClick={() => onDeleteDashboard(dashboard.id)}
          >
            Delete
          </Button>
        </div>
      </div>
      <div
        className={`w-full h-full bg-gray-600 grid grid-cols-8 justify-stretch`}
      >
        {tiles.map((t, index) => {
          return (
            <Tile
              className="border"
              editing={editing}
              onEditClick={onTileEditClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DashboardScreen;
