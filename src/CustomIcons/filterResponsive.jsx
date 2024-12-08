import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#BFBFBF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 7h3M3 17h6M18 17h3M15 7h6"
    />
    <path
      stroke="#BFBFBF"
      strokeWidth={1.5}
      d="M6 7c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C7.602 4 8.068 4 9 4c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C12 5.602 12 6.068 12 7c0 .932 0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C10.398 10 9.932 10 9 10c-.932 0-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C6 8.398 6 7.932 6 7ZM12 17c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C13.602 14 14.068 14 15 14c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C18 15.602 18 16.068 18 17c0 .932 0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C16.398 20 15.932 20 15 20c-.932 0-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C12 18.398 12 17.932 12 17Z"
    />
  </svg>
)
export default SvgComponent
