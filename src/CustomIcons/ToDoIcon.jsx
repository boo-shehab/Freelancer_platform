import * as React from "react"
const ToDoIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={10}
    fill="none"
    {...props}
  >
    <rect
      width={9.5}
      height={9.5}
      x={0.25}
      y={0.25}
      stroke="#BFBFBF"
      strokeWidth={0.5}
      rx={3.75}
    />
  </svg>
)
export default ToDoIcon
