import React, { HtmlHTMLAttributes } from "react";
import { tw } from "twind";

const Card: React.FC<HtmlHTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={tw(
        "p-4 bg-gray-600 border border-gray-700 rounded",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
