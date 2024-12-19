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
      stroke="#141B34"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.5 22h-3c-3.3 0-4.95 0-5.975-1.08C2.5 19.843 2.5 18.106 2.5 14.633V9.368c0-3.473 0-5.21 1.025-6.289C4.55 2 6.2 2 9.5 2h3c3.3 0 4.95 0 5.975 1.08C19.5 4.157 19.5 5.894 19.5 9.367V11"
    />
    <path
      stroke="#141B34"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M18 15v7m3.5-3.5h-7"
    />
    <path
      stroke="#141B34"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m7 2 .082.493c.2 1.197.3 1.796.72 2.152C8.22 5 8.827 5 10.041 5h1.917c1.213 0 1.82 0 2.24-.355.42-.356.52-.955.719-2.152L15 2"
    />
    <path
      stroke="#141B34"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M7 16h4m-4-5h8"
    />
  </svg>
)
export default SvgComponent
