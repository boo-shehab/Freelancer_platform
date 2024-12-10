import * as React from "react"
const UsersIcone = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#141B34"
      strokeWidth={1.5}
      d="M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
    />
    <path
      stroke="#141B34"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 11a4 4 0 0 0 0-8"
    />
    <path
      stroke="#141B34"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11 14H7a5 5 0 0 0-5 5 2 2 0 0 0 2 2h10a2 2 0 0 0 2-2 5 5 0 0 0-5-5Z"
    />
    <path
      stroke="#141B34"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17 14a5 5 0 0 1 5 5 2 2 0 0 1-2 2h-1.5"
    />
  </svg>
)
export default UsersIcone
