import React, { HTMLAttributes } from "react";

export interface SlideContainerProps extends HTMLAttributes<HTMLDivElement> {
  panels: PanelRefType[];
}

type PanelRefType = {
  defaultWidth?: number;
  element: React.ReactNode | null;
  minWidth?: number;
};

const img = new Image();
img.src =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";

const SplitePanel: React.FC<SlideContainerProps> = ({ panels, className }) => {
  const parentRef = React.useRef<HTMLDivElement | null>();
  const panelsRef = React.useRef<HTMLDivElement[]>([]);

  const onDrag = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>, index: number) => {
      event.dataTransfer.setDragImage(new Image(0, 0), 0, 0);
      const x = event.clientX;

      if (x === 0 || !parentRef.current) return;

      if (index >= panelsRef.current.length) return;

      const leftPanelRef = panelsRef.current[index];
      const rightPanelRef = panelsRef.current[index + 1];

      if (leftPanelRef && rightPanelRef) {
        const totalWidth = parentRef.current.getBoundingClientRect().width;

        const leftBound = leftPanelRef.getBoundingClientRect();
        const rightBound = rightPanelRef.getBoundingClientRect();
        const rightX = rightBound.left;
        const rightWidth = rightBound.width;

        const leftPanel = panels[index];
        const rightPanel = panels[index + 1];

        let newLeftWidth = x - leftBound.left;

        if (
          leftPanel.minWidth &&
          newLeftWidth < leftPanel.minWidth * totalWidth
        ) {
          newLeftWidth = leftPanel.minWidth * totalWidth;
        }

        let newRightWidth =
          rightX +
          rightWidth -
          newLeftWidth -
          leftPanelRef.getBoundingClientRect().left -
          16;

        if (
          rightPanel.minWidth &&
          newRightWidth < rightPanel.minWidth * totalWidth
        ) {
          newRightWidth = rightPanel.minWidth * totalWidth;
        }

        leftPanelRef.style.width = newLeftWidth.toString() + "px";
        rightPanelRef.style.width = newRightWidth.toString() + "px";
      }
    },
    []
  );

  React.useEffect(() => {
    if (!parentRef.current) return;
    const totalWidth = parentRef.current.getBoundingClientRect().width;
    panels.forEach((p, i) => {
      const elem = panelsRef.current[i];
      elem.style.width =
        ((p.defaultWidth ?? 1 / panels.length) * totalWidth - 11).toString() +
        "px";
    });
  }, [panels]);

  return (
    <div className={className}>
      <div
        className="relative h-full w-full flex overflow-hidden"
        ref={(ref) => (parentRef.current = ref)}
      >
        {panels.map((panel, i) => (
          <>
            {!panel.element ? null : (
              <>
                <div
                  ref={(ref) =>
                    ref &&
                    !panelsRef.current.some((element) => element === ref) &&
                    panelsRef.current.push(ref)
                  }
                  className="shrink h-full overflow-hidden"
                >
                  {panel.element}
                </div>

                {i < panels.length - 1 && panels.length > 1 && (
                  <div
                    className="w-4  border h-full shrink cursor-grab transition-all hover:bg-white/20"
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

export interface SplitPanelProps extends HTMLAttributes<HTMLDivElement> {}

export default SplitePanel;
