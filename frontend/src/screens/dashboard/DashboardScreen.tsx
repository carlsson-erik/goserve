import { Link, useParams } from "react-router-dom";
import paths from "../../utils/paths";
import Button from "../../components/input/Button";
import { useQuery } from "@apollo/client";
import React from "react";
import { IconEdit, IconEditOff } from "@tabler/icons-react";
import useDeleteTile from "../../hooks/tile/useDeleteTile";
import { tw } from "twind";
import {
  GET_DASHBOARDS,
  GetDashboardsResult,
  Tile,
} from "../../hooks/dashboard/useDashboardQuery";
import useDeleteDashboard from "../../hooks/dashboard/useDeleteDashboard";
import useConfirmModal from "../../components/ConfirmModal";
import Modal, { useModal } from "../../components/Modal";
import DashboardCreateTileDialog from "../../components/dashboard/DashboardCreateTileDialog";
import TileCard, {
  getVariable,
} from "../../components/feature/dashboard/TileCard";

const DashboardScreen = () => {
  const [editing, setEditing] = React.useState(true);

  const { dashboardId } = useParams();

  const { data: dashboardData } = useQuery<GetDashboardsResult>(GET_DASHBOARDS);

  const [confirmDelete, deleteModal] = useConfirmModal();

  const dashboard = dashboardData?.dashboards.find(
    (d) => d.id === Number(dashboardId)
  );

  const createTileModal = useModal<{
    dashboardId: number;
    col: number;
    row: number;
  }>();

  const [deleteDashboard] = useDeleteDashboard();

  const [deleteTile] = useDeleteTile();

  const onTileEditClick = React.useCallback((id: number) => {
    console.log(id);
  }, []);

  const onDeleteDashboard = React.useCallback(
    async (id: number) => {
      const response = await confirmDelete("Do you want to delete dashboard?");

      if (response) {
        deleteDashboard(id);
      }
    },
    [confirmDelete, deleteDashboard]
  );

  const onDeleteTile = React.useCallback(
    (id?: number) => {
      if (!id) return;

      deleteTile(id);
    },
    [deleteTile]
  );

  const onCreateTile = React.useCallback(
    (col: number, row: number) => {
      if (!dashboard) return;
      createTileModal.open({
        dashboardId: dashboard.id,
        col,
        row,
      });
    },
    [createTileModal, dashboard]
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
    <>
      {deleteModal}
      <Modal {...createTileModal.props}>
        {(data) => (
          <DashboardCreateTileDialog
            col={data?.col}
            row={data?.row}
            onCancel={() => createTileModal.close()}
            onConfirm={() => console.log("confirm")}
          />
        )}
      </Modal>

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
          className={`w-full h-full bg-gray-800 grid grid-rows-4 justify-stretch`}
        >
          <div className="grid grid-cols-subgrid grid-flow-col col-span-6">
            {tiles.slice(0, 6).map((t, index) => {
              return (
                <TileCard
                  scope={{ tw: tw, getVariable: getVariable(t) }}
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
                  onCreate={onCreateTile}
                />
              );
            })}
          </div>
          <div className="grid grid-cols-subgrid col-span-6">
            {tiles.slice(6, 12).map((t, index) => {
              return (
                <TileCard
                  scope={{ tw: tw, getVariable: getVariable(t) }}
                  col={index}
                  row={2}
                  key={t ? t.id + index : index}
                  className="w-full h-full"
                  editing={editing}
                  tile={t}
                  onEditClick={onTileEditClick}
                  onDelete={onDeleteTile}
                  onCreate={onCreateTile}
                />
              );
            })}
          </div>
          <div className="grid grid-cols-subgrid col-span-6">
            {tiles.slice(12, 18).map((t, index) => {
              return (
                <TileCard
                  scope={{ tw: tw, getVariable: getVariable(t) }}
                  col={index}
                  row={3}
                  key={t ? t.id + index : index}
                  className="w-full h-full"
                  editing={editing}
                  tile={t}
                  onEditClick={onTileEditClick}
                  onDelete={onDeleteTile}
                  onCreate={onCreateTile}
                />
              );
            })}
          </div>
          <div className="grid grid-cols-subgrid col-span-6">
            {tiles.slice(18, 24).map((t, index) => {
              return (
                <TileCard
                  scope={{ tw: tw, getVariable: getVariable(t) }}
                  col={index}
                  row={4}
                  key={t ? t.id + index : index}
                  className="w-full h-full"
                  editing={editing}
                  tile={t}
                  onEditClick={onTileEditClick}
                  onDelete={onDeleteTile}
                  onCreate={onCreateTile}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardScreen;
