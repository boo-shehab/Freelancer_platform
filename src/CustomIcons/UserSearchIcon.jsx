import * as React from "react"
const UserSearchIcon = ({props, color = "black" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.333 29.333H8.788c-2.06 0-3.7-1.002-5.171-2.404-3.012-2.87 1.933-5.164 3.82-6.287A14.178 14.178 0 0 1 16 18.73"
    />
    <path
      stroke={color}
      strokeWidth={2}
      d="M20.667 8.667a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"
    />
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m27.2 27.2 2.133 2.133m-1.066-5.866a4.8 4.8 0 1 0-9.6 0 4.8 4.8 0 0 0 9.6 0Z"
    />
  </svg>
)
export default UserSearchIcon
