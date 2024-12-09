import * as React from "react"
const InReviewIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <rect
      width={15.2}
      height={15.2}
      x={0.4}
      y={0.4}
      stroke="#3AB54A"
      strokeWidth={0.8}
      rx={7.6}
    />
    <path
      fill="#3AB54A"
      d="M1.677 7.922A6.4 6.4 0 1 0 8.154 1.6L8.076 8l-6.4-.078Z"
    />
  </svg>
)
export default InReviewIcon
