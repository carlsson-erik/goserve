import React from "react";
import { tw } from "twind";
import DraggableCard, { Drag } from "./DraggableCard";
import { Tile } from "../../hooks/dashboard/useDashboardQuery";
import { useThrottledCallback } from "use-debounce";
import TileCard from "../../components/feature/dashboard/TileCard";
import paths from "../../utils/paths";
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

  const width = gridRef.current?.clientWidth ?? 0;
  const height = gridRef.current?.clientHeight ?? 0;
  const [cursorX, setCursorX] = React.useState(0);
  const [cursorY, setCursorY] = React.useState(0);

  const gridCol = Math.floor(width / MIN_GRID_SIZE);
  const gridRow = Math.floor(height / MIN_GRID_SIZE);

  const colWidth = width / gridCol;
  const rowHeight = height / gridRow;

  const getGridPos = React.useCallback(
    (clientX: number, clientY: number) => {
      const pos = [
        Math.floor((clientX - (gridRef.current?.offsetLeft ?? 0)) / colWidth),
        Math.floor((clientY - (gridRef.current?.offsetTop ?? 0)) / rowHeight),
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

  React.useEffect(() => {}, []);

  return (
    <div
      ref={gridRef}
      onMouseMove={(e) => {
        setCursorX(e.clientX - (gridRef.current?.offsetLeft ?? 0));
        setCursorY(e.clientY - (gridRef.current?.offsetTop ?? 0));
      }}
      className={tw(className, "relative border")}
    >
      <div className="absolute bottom-0 right-0">
        <div>Width: {width}px</div>
        <div>height: {height}px</div>
        <div>gridCol: {gridCol}</div>
        <div>gridRow: {gridRow}</div>
        <div>ColWidth: {colWidth}</div>
        <div>RowHeight: {rowHeight}</div>
        <div>CursorX: {cursorX}</div>
        <div>CursorY: {cursorY}</div>
        <div>hehj</div>
      </div>
      {/* {Array.from({ length: gridCol * gridRow }).map((_, i) => (
        <div
          key={i}
          className="absolute border border-white/10"
          style={{
            top: Math.floor(i / gridCol) * rowHeight,
            left: (i % gridCol) * colWidth,
            height: rowHeight,
            width: colWidth,
          }}
        ></div>
      ))} */}
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
            {editing && (
              <a className="absolute top-1 right-1" href={paths.template.id}>
                Edit
              </a>
            )}
            <TileCard tile={t} className="w-full h-full" />
          </div>
        </DraggableCard>
      ))}
    </div>
  );
};

export default DashboardGrid;
