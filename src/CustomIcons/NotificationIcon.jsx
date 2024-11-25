import * as React from "react";
const NotificationIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#9C9C9C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.53 14.77c-.213 1.394.738 2.361 1.902 2.843 4.463 1.85 10.673 1.85 15.136 0 1.164-.482 2.115-1.45 1.902-2.843-.13-.857-.777-1.57-1.256-2.267-.627-.924-.689-1.931-.69-3.003C19.525 5.358 16.157 2 12 2 7.844 2 4.475 5.358 4.475 9.5c0 1.072-.062 2.08-.69 3.003-.478.697-1.124 1.41-1.255 2.267Z"
    />
    <path
      stroke="#9C9C9C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 19c.458 1.725 2.075 3 4 3 1.925 0 3.541-1.275 4-3"
    />
  </svg>
);

export default NotificationIcon;
