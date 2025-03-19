import { IconLoader } from "@tabler/icons-react";
import React from "react";
import { useParams } from "react-router-dom";
import { LivePreview, LiveProvider } from "react-live";
import { tw } from "twind";
import { Tile } from "../../../hooks/dashboard/useDashboardQuery";
import useScope from "../../../hooks/useScope";

export interface TileProps {
  className?: string;
  tile: Tile;
}

const TileCard: React.FC<TileProps> = ({ tile, className }) => {
  const { dashboardId } = useParams();

  const scope = useScope(tile);

  if (!dashboardId) return <IconLoader />;

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
