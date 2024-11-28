import * as React from "react"
const TaskDoneIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#0A0A0A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.5 20s1 0 2 2c0 0 3.177-5 6-6"
    />
    <path
      stroke="#0A0A0A"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M7 16h4m-4-5h8M6.5 3.5c-1.556.047-2.483.22-3.125.862-.879.88-.879 2.295-.879 5.126v6.506c0 2.832 0 4.247.879 5.127C4.253 22 5.668 22 8.496 22h2.5m4.496-18.5c1.556.047 2.484.22 3.125.862.88.88.88 2.295.88 5.126V13.5"
    />
    <path
      stroke="#0A0A0A"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.496 3.75c0-.966.784-1.75 1.75-1.75h5.5a1.75 1.75 0 1 1 0 3.5h-5.5a1.75 1.75 0 0 1-1.75-1.75Z"
    />
  </svg>
)
export default TaskDoneIcon
