import React from "react";

export default function ContainerProfileScreen({ children }) {
  return (
    <div
      style={{
        maxWidth: 1800,
        margin: "auto",
        paddingLeft: 56,
        paddingRight: 56,
      }}
    >
      {children}
    </div>
  );
}
