import React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const AspectRatio = ({ ratio = 16 / 9, children, style, ...props }) => {
  return (
    <AspectRatioPrimitive.Root
      style={{
        position: "relative",
        width: "100%",
        paddingTop: `${100 / ratio}%`,
        ...style,
      }}
      {...props}
    >
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        {children}
      </div>
    </AspectRatioPrimitive.Root>
  );
};

export { AspectRatio };
