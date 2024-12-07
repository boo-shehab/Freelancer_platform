import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={130}
    height={81}
    fill="none"
    {...props}
  >
    <path
      fill="#F8FBFC"
      d="M130 34.652c-41.206 0-29.101 44.45-65 44.45-35.898 0-30.179-44.45-65-44.45h130Z"
    />
    <g filter="url(#a)">
      <path
        fill="#3C97AF"
        d="M37 36.292c0-15.464 12.536-28 28-28s28 12.536 28 28-12.536 28-28 28-28-12.536-28-28Z"
        shapeRendering="crispEdges"
      />
      <path
        stroke="#F8FBFC"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M65 28.292v16m8-8H57"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={80}
        height={80}
        x={25}
        y={0.292}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={6} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.235294 0 0 0 0 0.592157 0 0 0 0 0.686275 0 0 0 0.32 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_4118_1355"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_4118_1355"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)
export default SvgComponent
