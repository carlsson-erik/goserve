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
import TileCard from "../../components/TileCard";
import { IconEdit, IconEditOff } from "@tabler/icons-react";
import { Tile } from "../../hooks/useTileQuery";
import useDeleteTile from "../../hooks/useDeleteTile";

const DashboardScreen = () => {
  const [editing, setEditing] = React.useState(true);

  const { dashboardId } = useParams();

  const { data: dashboardData } = useQuery<GetDashboardsResult>(GET_DASHBOARDS);

  const [deleteDashboard] = useDeleteDashboard();

  const [deleteTile] = useDeleteTile();

  const onTileEditClick = React.useCallback((id: number) => {}, []);

  const onDeleteDashboard = React.useCallback(
    (id: number) => {
      deleteDashboard(id);
    },
    [deleteDashboard]
  );

  const onDeleteTile = React.useCallback(
    (id?: number) => {
      if (!id) return;

      deleteTile(id);
    },
    [deleteTile]
  );

  const dashboard = dashboardData?.dashboards.find(
    (d) => d.id === Number(dashboardId)
  );

  const tiles: (Tile | undefined)[] = React.useMemo(() => {
    if (!dashboard) return [];
    const numberOfTiles = dashboard.cols * dashboard.rows;

    const tmpTiles = Array(numberOfTiles).fill(undefined);

    if (dashboard.tiles.length > 0) {
      setEditing(false);
    }

    dashboard.tiles.forEach((tile) => {
      tmpTiles[tile.row * tile.col] = tile;
    });

    return tmpTiles;
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
        <span className="text-2xl">{dashboard.name}</span>
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
        className={`w-full h-full bg-gray-600 grid grid-rows-4 justify-stretch`}
      >
        <div className="grid grid-cols-subgrid grid-flow-col col-span-6">
          {tiles.slice(0, 6).map((t, index) => {
            return (
              <TileCard
                col={index}
                row={1}
                key={t ? t.id + index : index}
                className={
                  t && t.width > 1
                    ? "w-full h-full col-span-2"
                    : "w-full h-full"
                }
                editing={editing}
                tile={t}
                onEditClick={onTileEditClick}
                onDelete={onDeleteTile}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-subgrid col-span-6">
          {tiles.slice(6, 12).map((t, index) => {
            return (
              <TileCard
                col={index}
                row={2}
                key={t ? t.id + index : index}
                className="w-full h-full"
                editing={editing}
                tile={t}
                onEditClick={onTileEditClick}
                onDelete={onDeleteTile}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-subgrid col-span-6">
          {tiles.slice(12, 18).map((t, index) => {
            return (
              <TileCard
                col={index}
                row={3}
                key={t ? t.id + index : index}
                className="w-full h-full"
                editing={editing}
                tile={t}
                onEditClick={onTileEditClick}
                onDelete={onDeleteTile}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-subgrid col-span-6">
          {tiles.slice(18, 24).map((t, index) => {
            return (
              <TileCard
                col={index}
                row={4}
                key={t ? t.id + index : index}
                className="w-full h-full"
                editing={editing}
                tile={t}
                onEditClick={onTileEditClick}
                onDelete={onDeleteTile}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
