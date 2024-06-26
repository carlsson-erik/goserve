import { usePopper } from "react-popper";
import React from "react";
import { Placement } from "@popperjs/core";

type PopperTrigger = "hover" | "click";

export interface TooltipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
  trigger?: PopperTrigger;
  placement?: Placement;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  trigger = "hover",
  placement = "bottom",
}) => {
  const [referenceElement, setReferenceElement] =
    React.useState<Element | null>(null);
  const [popperElement, setPopperElement] = React.useState<HTMLElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = React.useState<HTMLElement | null>(
    null
  );

  const [visible, setVisible] = React.useState(false);

  const { attributes, styles, update } = usePopper(
    referenceElement,
    popperElement,
    {
      modifiers: [{ name: "arrow", options: { element: arrowElement } }],
      placement,
    }
  );

  const onVisible = React.useCallback(
    async (visible: boolean) => {
      setVisible(visible);
      update?.();
    },
    [update]
  );

  return (
    <>
      <div
        ref={setReferenceElement}
        onBlur={() => trigger === "click" && onVisible(false)}
        onClick={() => trigger === "click" && onVisible(true)}
        onMouseEnter={() => trigger === "hover" && onVisible(true)}
        onMouseLeave={() => trigger === "hover" && onVisible(false)}
      >
        {children}
      </div>
      <div
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        hidden={!visible}
      >
        <div className="bg-black py-1 px-2 rounded">{content}</div>
        <div ref={setArrowElement} style={styles.arrow} />
      </div>
    </>
  );
};

export default Tooltip;
