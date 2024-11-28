import React from "react";

const DonutChart = () => {
  const circleRadius = 50;
  const circleCircumference = 2 * Math.PI * circleRadius;

  // Example progress data
  const progress1 = 50; // Yellow portion
  const progress2 = 50; // Green portion
  const progress3 = 50 ; // Gray portion

  // Calculate stroke-dasharray for the progress
  const dashArray1 = (progress1 / 150) * circleCircumference;
  const dashArray2 = (progress2 / 150) * circleCircumference;
  const dashArray3 = (progress3 / 150) * circleCircumference;

  return (
    <div style={{ position: "relative", width: "150px", height: "150px", margin: 'auto' }}>
      <svg
        width="150"
        height="150"
        viewBox="0 0 120 120"
      >
        <circle
          cx="60"
          cy="60"
          r={circleRadius}
          fill="none"
          stroke="#FFD700"
          strokeWidth="20"
        />

        <circle
          cx="60"
          cy="60"
          r={circleRadius}
          fill="none"
          stroke="#d3d3d3"
          strokeWidth="20"
          strokeDasharray={`${dashArray1} ${circleCircumference}`}
          strokeDashoffset="0"
        />

        <circle
          cx="60"
          cy="60"
          r={circleRadius}
          fill="none"
          stroke="#32CD32"
          strokeWidth="20"
          strokeDasharray={`${dashArray2} ${circleCircumference}`}
          strokeDashoffset={`-${dashArray1}`}
        />
      </svg>

      {/* Center Text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          fontSize: "12px",
        }}
      >
        <div>projects</div>
        <div>progress</div>
      </div>
    </div>
  );
};

export default DonutChart;
