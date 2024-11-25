import * as React from "react"
const BellIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#9C9C9C"
      fill={props.active? "#21868E" :''}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.03 14.77c-.213 1.394.738 2.361 1.902 2.843 4.463 1.85 10.673 1.85 15.136 0 1.164-.482 2.115-1.45 1.902-2.843-.13-.857-.777-1.57-1.256-2.267-.627-.924-.689-1.931-.69-3.003 0-4.142-3.368-7.5-7.524-7.5-4.156 0-7.525 3.358-7.525 7.5 0 1.072-.062 2.08-.69 3.003-.478.697-1.124 1.41-1.255 2.267Z"
    />
    <path
      stroke="#9C9C9C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.5 19c.458 1.725 2.075 3 4 3 1.925 0 3.541-1.275 4-3"
    />
  </svg>
)
export default BellIcon
