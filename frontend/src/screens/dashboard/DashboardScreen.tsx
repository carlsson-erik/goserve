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
import { GET_TILES, GetTilesResult, Tile } from "../../hooks/useTileQuery";

const DashboardScreen = () => {
  const [editing, setEditing] = React.useState(true);

  const { dashboardId } = useParams();

  const { data: dashboardData } = useQuery<GetDashboardsResult>(GET_DASHBOARDS);

  const { data: tileData } = useQuery<GetTilesResult>(GET_TILES);

  console.log(tileData);

  const [deleteDashboard] = useDeleteDashboard();

  const onTileEditClick = React.useCallback((id: string) => {}, []);

  const onDeleteDashboard = React.useCallback(
    (id: number) => {
      deleteDashboard(id);
    },
    [deleteDashboard]
  );

  const dashboard = dashboardData?.dashboards.find(
    (d) => d.id === Number(dashboardId)
  );

  const tiles: (Tile | undefined)[] = React.useMemo(() => {
    const numberOfTiles = dashboard ? dashboard?.cols * dashboard?.rows : 0;

    const tmpTiles = Array(numberOfTiles).fill(undefined);

    if (tileData && tileData.tiles.length > 0) {
      setEditing(false);
    }

    tileData?.tiles
      .filter((t) => t.dashboard_id === dashboard?.id)
      .forEach((tile) => {
        tmpTiles[tile.row * tile.col] = tile;
      });

    tmpTiles.map((t) => {});
    return tmpTiles;
  }, [dashboard, tileData]);

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
        className={`w-full h-full bg-gray-600 grid grid-rows-4 auto-rows-fr justify-stretch`}
      >
        <div className="grid grid-cols-subgrid col-span-6">
          {tiles.slice(0, 6).map((t, index) => {
            return (
              <TileCard
                key={t ? t.id + index : index}
                className="w-full h-full"
                editing={editing}
                tile={t}
                onEditClick={onTileEditClick}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-subgrid col-span-6">
          {tiles.slice(6, 12).map((t, index) => {
            return (
              <TileCard
                key={t ? t.id + index : index}
                className="w-full h-full"
                editing={editing}
                tile={t}
                onEditClick={onTileEditClick}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-subgrid col-span-6">
          {tiles.slice(12, 18).map((t, index) => {
            return (
              <TileCard
                key={t ? t.id + index : index}
                className="w-full h-full"
                editing={editing}
                tile={t}
                onEditClick={onTileEditClick}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-subgrid col-span-6">
          {tiles.slice(18, 24).map((t, index) => {
            return (
              <TileCard
                key={t ? t.id + index : index}
                className="w-full h-full"
                editing={editing}
                tile={t}
                onEditClick={onTileEditClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
