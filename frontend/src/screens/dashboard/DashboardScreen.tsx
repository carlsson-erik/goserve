import { Link, useParams } from "react-router-dom";
import paths from "../../utils/paths";
import Button from "../../components/input/Button";
import { useQuery } from "@apollo/client";
import React from "react";
import useDeleteTile from "../../hooks/tile/useDeleteTile";
import {
  GET_DASHBOARDS,
  GetDashboardsResult,
  Tile,
} from "../../hooks/dashboard/useDashboardQuery";
import useDeleteDashboard from "../../hooks/dashboard/useDeleteDashboard";
import useConfirmModal from "../../components/ConfirmModal";
import Modal, { useModal } from "../../components/Modal";
import DashboardGrid from "./DashboardGrid";
import { indexBy } from "ramda";
import useCreateOrUpdateTiles from "../../hooks/tile/useCreateOrUpdateTiles";
import { CreateTileData } from "../../hooks/tile/useCreateTile";
import TileCreateForm from "../tile/TileCreateForm";

const DashboardScreen = () => {
  const [editing, setEditing] = React.useState(false);

  const { dashboardId } = useParams();

  const { data: dashboardData, refetch: refetchDashboard } =
    useQuery<GetDashboardsResult>(GET_DASHBOARDS);

  const [confirmDelete, deleteModal] = useConfirmModal();

  const dashboard = dashboardData?.dashboards.find(
    (d) => d.id === Number(dashboardId)
  );

  const [tilesCopy, setTilesCopy] = React.useState<Record<number, Tile>>({});

  React.useEffect(() => {
    if (!dashboard) return;

    setTilesCopy(indexBy((t) => t.id, [...dashboard.tiles]));
  }, [dashboard]);

  const updateTile = React.useCallback((id: number, data: Partial<Tile>) => {
    console.log("update", data);
    setTilesCopy((value) => {
      const tmp = { ...value };
      tmp[id] = { ...value[id], ...data };
      return tmp;
    });
  }, []);

  const createTileModal = useModal<{
    dashboardId: number;
    col: number;
    row: number;
  }>();

  const [deleteDashboard] = useDeleteDashboard();
  const [createOrUpdateTiles] = useCreateOrUpdateTiles();

  const [deleteTile] = useDeleteTile();

  const onDeleteDashboard = React.useCallback(
    async (id: number) => {
      const response = await confirmDelete("Do you want to delete dashboard?");

      if (response) {
        deleteDashboard(id);
      }
    },
    [confirmDelete, deleteDashboard]
  );

  const onSaveTile = React.useCallback(async () => {
    if (!dashboard) return;

    const data: CreateTileData[] = Object.values(tilesCopy).map((t) => ({
      id: t.id,
      name: t.name,
      col: t.col,
      row: t.row,
      width: t.width,
      height: t.height,
      dashboardId: dashboard.id,
      templateId: t.template.id,
      variables: (t.variables ?? []).map((v) => ({
        id: v.id,
        name: v.name,
        value: v.value,
        default: v.default,
      })),
    }));
    console.log("save", data);
    await createOrUpdateTiles(data);
    await refetchDashboard();
    setEditing(false);
  }, [createOrUpdateTiles, dashboard, refetchDashboard, tilesCopy]);

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
          <TileCreateForm
            col={data?.col}
            row={data?.row}
            onCancel={createTileModal.close}
            onSubmit={createTileModal.close}
          />
        )}
      </Modal>
      <div className="h-full flex flex-col">
        <div className="p-2 flex justify-between">
          <span className="text-2xl">{dashboard.name}</span>
          <div className="flex gap-2">
            <Button
              className="text-red-400"
              onClick={() => onDeleteDashboard(dashboard.id)}
            >
              Delete
            </Button>
            <div className="flex items-center gap-2">
              <Button
                onClick={(value) => {
                  if (editing) {
                    setTilesCopy(indexBy((t) => t.id, [...dashboard.tiles]));
                  }
                  setEditing(!editing);
                }}
              >
                {editing ? "cancel" : "edit"}
              </Button>
            </div>
            {editing && (
              <>
                <Button onClick={onSaveTile} variant="primary">
                  Save
                </Button>
                <Button onClick={() => onCreateTile(1, 1)}>+</Button>
              </>
            )}
          </div>
        </div>
        <DashboardGrid
          className="h-full"
          tiles={tilesCopy}
          onUpdateTile={updateTile}
          editing={editing}
        />
      </div>
    </>
  );
};

export default DashboardScreen;
