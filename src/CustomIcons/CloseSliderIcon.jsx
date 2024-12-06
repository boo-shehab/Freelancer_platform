import * as React from "react"
const CloseSliderIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <path
      fill="#FAFAFA"
      d="M35.5 18c0 9.665-7.835 17.5-17.5 17.5S.5 27.665.5 18 8.335.5 18 .5 35.5 8.335 35.5 18Z"
    />
    <path
      stroke="#BFBFBF"
      d="M35.5 18c0 9.665-7.835 17.5-17.5 17.5S.5 27.665.5 18 8.335.5 18 .5 35.5 8.335 35.5 18Z"
    />
    <path
      stroke="#BFBFBF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21 12s-6 4.419-6 6c0 1.581 6 6 6 6"
    />
  </svg>
)
export default CloseSliderIcon
