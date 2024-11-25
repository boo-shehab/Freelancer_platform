import * as React from "react"
const SearchIcon = (props) => (
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
      d="M17.5 17.5 22 22"
    />
    <path
      stroke="#BFBFBF"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20 11a9 9 0 1 0-18 0 9 9 0 0 0 18 0Z"
    />
  </svg>
)
export default SearchIcon
