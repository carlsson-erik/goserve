import React from "react";
import { tw } from "twind";
import DraggableCard, { Drag } from "./DraggableCard";
import { Tile } from "../../hooks/dashboard/useDashboardQuery";
import { useThrottledCallback } from "use-debounce";
import TileCard from "../../components/feature/dashboard/TileCard";
const MIN_GRID_SIZE = 20;

export interface DashboardGridProps {
  className?: string;
  tiles: Record<number, Tile>;
  editing: boolean;
  onUpdateTile: (id: number, data: Partial<Tile>) => void;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({
  className,
  tiles,
  editing,
  onUpdateTile,
}) => {
  const gridRef = React.useRef<HTMLDivElement>(null);
  console.log(gridRef.current);

  const colWidth = React.useMemo(() => {
    if (!gridRef.current) return 0;
    const width = gridRef.current.clientWidth;
    const gridCol = Math.floor(width / MIN_GRID_SIZE);
    return width / gridCol;
  }, [gridRef.current]);

  const rowHeight = React.useMemo(() => {
    if (!gridRef.current) return 0;
    const height = gridRef.current.clientHeight;
    const gridRow = Math.floor(height / MIN_GRID_SIZE);
    return height / gridRow;
  }, [gridRef.current]);

  const getGridPos = React.useCallback(
    (clientX: number, clientY: number) => {
      const pos = [
        Math.max(
          0,
          Math.floor((clientX - (gridRef.current?.offsetLeft ?? 0)) / colWidth)
        ),
        Math.max(
          0,
          Math.floor((clientY - (gridRef.current?.offsetTop ?? 0)) / rowHeight)
        ),
      ] as const;
      return pos;
    },
    [colWidth, rowHeight]
  );

  const onDrag = React.useCallback(
    (id: number, drag: Drag) => {
      const [col, row] = getGridPos(
        drag.e.clientX - drag.offsetX,
        drag.e.clientY - drag.offsetY
      );
      console.log("drag");

      onUpdateTile(id, { col: col, row: row });
    },
    [getGridPos, onUpdateTile]
  );

  const onDragThrottle = useThrottledCallback(onDrag, 50);

  const onResize = React.useCallback(
    (id: number, drag: Drag) => {
      const [col, row] = getGridPos(drag.e.clientX, drag.e.clientY);
      onUpdateTile(id, {
        width: col - tiles[id].col,
        height: row - tiles[id].row,
      });
    },
    [getGridPos, onUpdateTile, tiles]
  );

  const onResizeThrottle = useThrottledCallback(onResize, 50);

  return (
    <div ref={gridRef} className={tw(className, "relative border")}>
      <div className="absolute bottom-0 right-0">
        <div>ColWidth: {colWidth}</div>
        <div>RowHeight: {rowHeight}</div>
      </div>

      {Object.values(tiles).map((t) => (
        <DraggableCard
          draggable={editing}
          resizeable={editing}
          key={t.id}
          x={t.col * colWidth}
          y={t.row * rowHeight}
          width={t.width * colWidth}
          height={t.height * rowHeight}
          onDrag={(event) => onDragThrottle(t.id, event)}
          onDragEnd={(event) => onDragThrottle(t.id, event)}
          onResize={(event) => onResizeThrottle(t.id, event)}
          onResizeEnd={(event) => onResizeThrottle(t.id, event)}
        >
          <div className="h-full">
            <TileCard
              editing={editing}
              onUpdate={onUpdateTile}
              tile={t}
              className="w-full h-full"
            />
          </div>
        </DraggableCard>
      ))}
    </div>
  );
};

export default DashboardGrid;
