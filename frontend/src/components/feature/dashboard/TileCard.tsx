import { IconLoader, IconPlus } from "@tabler/icons-react";
import React from "react";
import { Link, useParams, generatePath } from "react-router-dom";
import { LivePreview, LiveProvider } from "react-live";
import { TW, tw } from "twind";
import { Tile } from "../../../hooks/dashboard/useDashboardQuery";
import paths from "../../../utils/paths";
import Button from "../../input/Button";
import { Variable } from "../../../hooks/template/useCreateTemplate";

export function getVariable(
  data?: Tile | { variables: Omit<Variable, "id">[] }
): (name: string) => string {
  return (name: string) => {
    if (!data || !data.variables) return "";

    return data.variables.find((v) => v.name === name)?.value ?? "";
  };
}

export interface TileProps {
  col: number;
  row: number;
  scope: { tw: TW; getVariable: (name: string) => string };
  className?: string;
  tile?: Tile;
  compiledData?: string;
  editing?: boolean;
  onEditClick: (id: number) => void;
  onCreate: (col: number, row: number) => void;
  onDelete: (id?: number) => void;
}

const TileCard: React.FC<TileProps> = ({
  col,
  row,
  tile,
  className,
  editing,
  scope,
  onEditClick,
  onCreate,
  onDelete,
}) => {
  const { dashboardId } = useParams();

  if (!dashboardId) return <IconLoader />;

  console.log(tile?.variables);
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

          <div className=" hover:bg-gray-500 hover:cursor-pointer">
            {tile ? (
              <Link
                to={generatePath(paths.dashboard.tile.create, {
                  dashboardId: dashboardId,
                  col: col,
                  row: row,
                })}
              >
                <span>{tile.name}</span>
              </Link>
            ) : (
              <IconPlus onClick={() => onCreate(col, row)} />
            )}
          </div>
        </div>
      ) : (
        <div className="h-full p-4">
          {tile ? (
            <div className="h-full rounded-3xl overflow-hidden flex justify-center bg-gray-700 border border-gray-800">
              <LiveProvider code={tile?.template.data} scope={scope}>
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
