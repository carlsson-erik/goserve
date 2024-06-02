import { IconPlus } from "@tabler/icons-react";
import React from "react";
import { Link, useParams, generatePath } from "react-router-dom";
import paths from "../utils/paths";
import { Tile } from "../hooks/useTileQuery";
import { LivePreview, LiveProvider } from "react-live";
import Button from "./input/Button";
import { tw } from "twind";

export interface TileProps {
  col: number;
  row: number;
  className?: string;
  tile?: Tile;
  compiledData?: string;
  editing?: boolean;
  onEditClick: (id: number) => void;
  onDelete: (id?: number) => void;
}

const TileCard: React.FC<TileProps> = ({
  col,
  row,
  tile,
  className,
  editing,
  onEditClick,
  onDelete,
}) => {
  const { dashboardId } = useParams();
  console.log(dashboardId, col, row);
  return (
    <div className={tw(className, "relative w-full h-full")}>
      {editing ? (
        <div className="h-full flex justify-center items-center border">
          {tile && (
            <Button
              className="absolute top-2 right-2"
              onClick={() => onDelete(tile?.id)}
            >
              X
            </Button>
          )}
          <Link
            to={generatePath(paths.dashboard.tile.create, {
              dashboardId: dashboardId,
              col: col,
              row: row,
            })}
          >
            <div
              className=" hover:bg-gray-500 hover:cursor-pointer"
              onClick={() => onEditClick}
            >
              {tile ? <span>{tile.name}</span> : <IconPlus />}
            </div>
          </Link>
        </div>
      ) : (
        <div className="h-full p-4">
          {tile ? (
            <div className="h-full rounded-3xl overflow-hidden flex justify-center bg-gray-700 border border-gray-800">
              <LiveProvider code={tile?.template.data}>
                <LivePreview />
              </LiveProvider>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default TileCard;
