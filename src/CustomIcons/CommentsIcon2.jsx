import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#141B34"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.667 11.25h6.667M6.667 7.083H10"
    />
    <path
      stroke="#141B34"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M5.083 15.833c-1.084-.107-1.895-.432-2.44-.976-.976-.977-.976-2.548-.976-5.69V8.75c0-3.143 0-4.714.976-5.69.977-.977 2.548-.977 5.69-.977h3.334c3.143 0 4.714 0 5.69.976.977.977.977 2.548.977 5.69v.417c0 3.143 0 4.714-.977 5.69-.976.977-2.547.977-5.69.977-.467.01-.84.046-1.204.13-1 .23-1.924.74-2.838 1.186-1.302.635-1.953.952-2.362.655-.781-.582-.017-2.386.154-3.221"
    />
  </svg>
)
export default SvgComponent
