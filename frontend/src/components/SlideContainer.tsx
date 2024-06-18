import React, { HTMLAttributes } from "react";

export interface SlideContainerProps extends HTMLAttributes<HTMLDivElement> {
  panels: PanelRefType[];
}

type PanelRefType = {
  defaultWidth?: string;
  element: React.ReactNode | null;
  minWidth?: number;
  maxWidth?: number;
};

const img = new Image();
img.src =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";

const SlideContainer: React.FC<SlideContainerProps> = (props) => {
  const parentRef = React.useRef<HTMLDivElement | null>();
  const panelsRef = React.useRef<HTMLDivElement[]>([]);

  const onDrag = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>, index: number) => {
      event.dataTransfer.setDragImage(new Image(0, 0), 0, 0);
      const x = event.pageX;
      const y = event.pageY;
      const dragElementWidth =
        event.currentTarget.getBoundingClientRect().width;

      if (x === 0 || y === 0 || !parentRef.current) return;

      if (index >= panelsRef.current.length) return;

      const leftPanelRef = panelsRef.current[index];
      const rightPanelRef = panelsRef.current[index + 1];

      if (leftPanelRef && rightPanelRef) {
        const width =
          x - leftPanelRef.getBoundingClientRect().left - dragElementWidth / 2;

        leftPanelRef.style.width = width.toString() + "px";
      }
    },
    []
  );

  return (
    <div className={props.className}>
      <div
        ref={(ref) => (parentRef.current = ref)}
        className="h-full w-full flex overflow-hidden"
      >
        {props.panels.map((panel, i) => (
          <>
            {!panel.element ? null : (
              <>
                <div
                  key={panel.element.toString()}
                  className="flex h-full overflow-hidden"
                >
                  <div
                    ref={(ref) =>
                      ref &&
                      !panelsRef.current.some((element) => element === ref) &&
                      panelsRef.current.push(ref)
                    }
                    className="w-full h-full overflow-hidden"
                  >
                    {panel.element}
                  </div>
                </div>

                {i < props.panels.length - 1 && props.panels.length > 1 && (
                  <div
                    className="w-4 border h-full cursor-grab transition-all hover:bg-white/20"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setDragImage(img, 0, 0)}
                    onDrag={(e) => {
                      onDrag(e, i);
                    }}
                  ></div>
                )}
              </>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export interface SlidePanelProps extends HTMLAttributes<HTMLDivElement> {}

export default SlideContainer;
