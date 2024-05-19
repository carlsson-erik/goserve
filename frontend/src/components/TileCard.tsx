import { IconPlus } from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";
import paths from "../utils/paths";
import { Tile } from "../hooks/useTileQuery";
import { LivePreview, LiveProvider } from "react-live";

export interface TileProps {
  className?: string;
  tile?: Tile;
  compiledData?: string;
  editing?: boolean;
  onEditClick: (id: string) => void;
}

const TileCard: React.FC<TileProps> = ({
  tile,
  className,
  editing,
  onEditClick,
}) => {
  return (
    <div className={className}>
      {editing ? (
        <Link to={paths.tile.create}>
          <div
            className="w-full h-full flex border justify-center items-center hover:bg-gray-500 hover:cursor-pointer"
            onClick={() => onEditClick}
          >
            {tile ? <span>{tile.name}</span> : <IconPlus />}
          </div>
        </Link>
      ) : (
        <div className="h-full p-4">
          {tile ? (
            <div className="w-full h-full rounded-3xl overflow-hidden flex justify-center bg-gray-700 border border-gray-800">
              <LiveProvider code={tile?.data}>
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
