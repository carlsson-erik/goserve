import { IconPlus } from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";
import paths from "../utils/paths";

export interface TileProps {
  className?: string;
  data?: string;
  compiledData?: string;
  editing?: boolean;
  onEditClick: (id: string) => void;
}

const Tile: React.FC<TileProps> = ({
  data,
  className,
  editing,
  onEditClick,
}) => {
  const dataRender = Function(data ?? "return ");

  return (
    <div className={className}>
      {editing ? (
        <Link to={paths.tile.create}>
          <div
            className="w-full h-full flex justify-center items-center hover:bg-gray-500 hover:cursor-pointer"
            onClick={() => onEditClick}
          >
            <IconPlus />
          </div>
        </Link>
      ) : (
        <div>
          Tile
          {dataRender()}
        </div>
      )}
    </div>
  );
};

export default Tile;
