import React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

// Avatar container
const Avatar = React.forwardRef(({ size = 40, style, children, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    style={{
      position: "relative",
      display: "flex",
      height: size,
      width: size,
      overflow: "hidden",
      borderRadius: "50%",
      flexShrink: 0,
      ...style,
    }}
    {...props}
  >
    {children}
  </AvatarPrimitive.Root>
));
Avatar.displayName = "Avatar";

// Avatar image
const AvatarImage = React.forwardRef(({ src, alt, style, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    src={src}
    alt={alt}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      ...style,
    }}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

// Fallback avatar (when image fails)
const AvatarFallback = React.forwardRef(({ style, children, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    style={{
      display: "flex",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      backgroundColor: "#e5e7eb", // light gray
      color: "#374151", // dark gray text
      fontSize: 14,
      ...style,
    }}
    {...props}
  >
    {children}
  </AvatarPrimitive.Fallback>
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
