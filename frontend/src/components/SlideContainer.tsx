import React, { HTMLAttributes } from "react";

export interface SlideContainerProps extends HTMLAttributes<HTMLDivElement> {
  panels: PanelRefType[];
}

type PanelRefType = {
  defaultWidth?: string;
  element: React.ReactNode | null;
  minWidth?: string;
  maxWidth?: string;
};

const img = new Image();
img.src =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";

const SlideContainer: React.FC<SlideContainerProps> = (props) => {
  const panelsRef = React.useRef<HTMLDivElement[]>([]);

  const onDrag = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>, index: number) => {
      event.dataTransfer.setDragImage(new Image(0, 0), 0, 0);
      const x = event.pageX;
      const y = event.pageY;
      const dragElementWidth =
        event.currentTarget.getBoundingClientRect().width;

      if (x === 0 || y === 0) return;

      console.log("x,y", x, y);
      console.log(panelsRef.current.length);

      if (index >= panelsRef.current.length) return;

      const leftPanel = panelsRef.current[index];
      const rightPanel = panelsRef.current[index + 1];

      if (leftPanel && rightPanel) {
        const leftPanelDefault = props.panels[index];
        if (leftPanelDefault.maxWidth)
          leftPanel.style.maxWidth = leftPanelDefault.maxWidth;

        if (leftPanelDefault.minWidth)
          leftPanel.style.minWidth = leftPanelDefault.minWidth;

        const computedMaxWidth = window.getComputedStyle(leftPanel).maxWidth;
        const computedMinWidth = window.getComputedStyle(leftPanel).minWidth;
        console.log(computedMaxWidth);

        const width =
          x - leftPanel.getBoundingClientRect().left + dragElementWidth / 2;
        if (width >= computedMaxWidth) {
          width = computedMaxWidth;
        }
        if (width <= computedMaxWidth) {
          width = computedMinWidth;
        }
        panelsRef.current[index].width = width.toString() + "px";
        leftPanel.style.width = width.toString() + "px";
      }
    },
    []
  );

  return (
    <div className={props.className}>
      <div className="h-full w-full flex">
        {props.panels.map((panel, i) => (
          <>
            {!panel.element ? null : (
              <div className="flex h-full overflow-hidden">
                <div
                  ref={(ref) =>
                    ref &&
                    !panelsRef.current.some((element) => element === ref) &&
                    panelsRef.current.push(ref)
                  }
                  className="w-full h-full overflow-hidden"
                  style={{ minWidth: panel.minWidth, maxWidth: panel.maxWidth }}
                >
                  {panel.element}
                </div>
                {i < props.panels.length - 1 && props.panels.length > 1 && (
                  <div
                    className="w-4 border h-full cursor-grab transition-all hover:bg-white/20"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setDragImage(img, 0, 0)}
                    onDrag={(e) => onDrag(e, i)}
                  ></div>
                )}
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export interface SlidePanelProps extends HTMLAttributes<HTMLDivElement> {}
const SlidePanel: React.FC<SlidePanelProps> = (props) => {
  return <div>{props.children}</div>;
};

export default SlideContainer;
