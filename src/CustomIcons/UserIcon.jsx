import * as React from "react";

const UserIcon = ({ width = 32, height = 32, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      stroke="#0A0A0A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.77 20.642c-1.886 1.123-6.832 3.417-3.82 6.287 1.472 1.402 3.11 2.404 5.171 2.404H21.88c2.06 0 3.7-1.002 5.17-2.404 3.013-2.87-1.933-5.164-3.82-6.287-4.423-2.634-10.035-2.634-14.459 0Z"
    />
    <path
      stroke="#0A0A0A"
      strokeWidth={1.5}
      d="M22 8.667a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"
    />
  </svg>
);

export default UserIcon;
