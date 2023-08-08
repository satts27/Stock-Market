import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

export default function LineChart({ data }) {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const config = {
      type: "line",
      data: {
        labels: data.DATES,
        datasets: [
          {
            label: "Stock",
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: data.STOCK,
            fill: false,
          },
          {
            label: "SMA50",
            fill: false,
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: data.SMA50,
          },
          {
            label: "SMA200",
            fill: false,
            backgroundColor: "#2ecc71",
            borderColor: "#2ecc71",
            data: data.SMA200,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        // Your other options here
      },
    };

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (chartInstance) {
        // If the chart instance already exists, destroy it before creating a new one
        chartInstance.destroy();
      }
      chartInstance = new Chart(ctx, config); // Create the chart instance
    }

    return () => {
      // Clean up the chart instance when the component unmounts
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
      {/* Rest of the JSX for the component */}
      <div className="p-4 flex-auto">
        {/* Chart */}
        <div className="relative h-350-px">
          <canvas id="line-chart" ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
}
