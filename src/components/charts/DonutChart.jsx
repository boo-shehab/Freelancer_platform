import React from "react";

const DonutChart = ({
  data,
  total,
  size = 150,
  emptyColor = "#d3d3d3", // Default color for empty space
  strokeWidth,
  children,
}) => {
  const circleRadius = size / 3; // Adjust radius based on size
  const circleCircumference = 2 * Math.PI * circleRadius;

  // Calculate total of provided data
  const usedTotal = data.reduce((sum, item) => sum + item.value, 0);

  // Add remaining space if the total is not fully used
  const chartData =
    usedTotal < total
      ? [...data, { value: total - usedTotal, color: emptyColor }]
      : data;

  // Accumulated offset for segments
  let accumulatedOffset = 0;

  return (
    <div style={{ position: "relative", width: `${size}px`, height: `${size}px`, margin: "auto" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {chartData.map((item, index) => {
          const dashArray = (item.value / total) * circleCircumference;
          const dashOffset = circleCircumference - accumulatedOffset;

          // Update accumulated offset
          accumulatedOffset += dashArray;

          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={circleRadius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth? strokeWidth : size / 6} // Adjust stroke width based on size
              strokeDasharray={`${dashArray} ${circleCircumference}`}
              strokeDashoffset={-accumulatedOffset + dashArray}
              style={{
                transform: `rotate(-90deg)`,
                transformOrigin: "center",
              }}
            />
          );
        })}
      </svg>

      {/* Center Text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          fontSize: size / 12, // Adjust font size based on size
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DonutChart;
