import * as React from "react"
const DoneTaskIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <rect width={16} height={16} fill="#198A46" rx={4} />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m3.334 9.334 2.333 2.333 7-7.333"
    />
  </svg>
)
export default DoneTaskIcon
