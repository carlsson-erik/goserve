import { IconLoader } from "@tabler/icons-react";
import React from "react";
import { useParams } from "react-router-dom";
import { LivePreview, LiveProvider } from "react-live";
import { tw } from "twind";
import { Tile } from "../../../hooks/dashboard/useDashboardQuery";
import useScope from "../../../hooks/useScope";
import Button from "../../input/Button";
import Modal, { useModal } from "../../Modal";
import TileEditor from "./TileEditor";

export interface TileProps {
  className?: string;
  tile: Tile;
  onUpdate: (id: number, data: Partial<Tile>) => void;
  editing: boolean;
}

const TileCard: React.FC<TileProps> = ({
  tile,
  editing,
  className,
  onUpdate,
}) => {
  const { dashboardId } = useParams();

  const scope = useScope(tile);

  const editModal = useModal<undefined>();

  if (!dashboardId) return <IconLoader />;

  if (editing) {
    return (
      <div className="h-full flex justify-center items-center">
        <Modal
          {...editModal.props}
          children={() => (
            <TileEditor
              onUpdate={onUpdate}
              onCancel={editModal.close}
              onSubmit={editModal.close}
              className="h-[25rem] w-[50rem]"
              tile={tile}
            />
          )}
        />
        <Button onClick={() => editModal.open(undefined)}>Edit</Button>
      </div>
    );
  }

  return (
    <div className={tw(className, "relative")}>
      <div className="h-full rounded-3xl overflow-hidden bg-gray-700 border border-gray-800">
        <LiveProvider
          code={tile.template.data}
          scope={scope as unknown as Record<string, unknown>}
        >
          <LivePreview className="h-full" />
        </LiveProvider>
      </div>
    </div>
  );
};

export default TileCard;
