import React from "react";
import { tw } from "twind";

export interface Drag {
  e: React.MouseEvent<HTMLDivElement, MouseEvent>;
  offsetX: number;
  offsetY: number;
}

export interface DraggableCardProps {
  className?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  draggable: boolean;
  resizeable: boolean;
  onDrag?: (event: Drag) => void;
  onDragStart?: (event: Drag) => void;
  onDragEnd?: (event: Drag) => void;
  onResize?: (event: Drag) => void;
  onResizeStart?: (event: Drag) => void;
  onResizeEnd?: (event: Drag) => void;
  children?: React.ReactNode;
}

const DraggableCard: React.FC<DraggableCardProps> = ({
  className,
  x,
  y,
  width,
  height,
  children,
  draggable,
  resizeable,
  onDrag,
  onDragStart,
  onDragEnd,
  onResize,
  onResizeStart,
  onResizeEnd,
}) => {
  const [offsetX, setOffsetX] = React.useState(0);
  const [offsetY, setOffsetY] = React.useState(0);
  const getOffset = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const box = e.currentTarget.getBoundingClientRect();
    console.log(box.x, box.y, e.clientX, e.clientY);
    const pos = [e.clientX - box.x, e.clientY - box.y] as const;
    console.log(pos);
    return pos;
  };

  return (
    <div
      style={{
        left: x,
        top: y,
        width: width,
        height: height,
      }}
      className={tw("absolute border bg-white/10", className)}
    >
      {children}
      {draggable && (
        <div
          draggable
          onDrag={(e) => {
            onDrag?.({
              e,
              offsetX: offsetX,
              offsetY: offsetY,
            });
          }}
          onDragStart={(e) => {
            const [x, y] = getOffset(e);
            setOffsetX(x);
            setOffsetY(y);
            onDragStart?.({
              e,
              offsetX: offsetX,
              offsetY: offsetY,
            });
          }}
          onDragEnd={(e) => {
            onDragEnd?.({
              e,
              offsetX: offsetX,
              offsetY: offsetY,
            });
          }}
          className="w-full h-8 absolute top-0 bg-white/50 hover:bg-white/70 cursor-grab"
        ></div>
      )}
      {resizeable && (
        <div
          draggable
          onDrag={(e) => {
            onResize?.({
              e,
              offsetX: offsetX,
              offsetY: offsetY,
            });
          }}
          onDragStart={(e) => {
            const [x, y] = getOffset(e);
            setOffsetX(x);
            setOffsetY(y);
            onResizeStart?.({
              e,
              offsetX: offsetX,
              offsetY: offsetY,
            });
          }}
          onDragEnd={(e) => {
            onResizeEnd?.({
              e,
              offsetX: offsetX,
              offsetY: offsetY,
            });
          }}
          className="absolute bottom-0 right-0 border font-bold text-3xl cursor-grab hover:bg-white/20 active:cursor-grabbing"
        >
          /
        </div>
      )}
    </div>
  );
};

export default DraggableCard;
