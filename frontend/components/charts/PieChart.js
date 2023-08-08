import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function PieChart({ piechart }) {
  const pieKey = Object.keys(piechart);
  const pieVal = Object.values(piechart);

  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const config = {
      type: "pie",
      data: {
        labels: pieKey,
        datasets: [
          {
            label: "# of Votes",
            data: pieVal,
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(0, 0, 0, 0.2)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 0, 255, 0.2)",
              "rgba(0, 255, 255, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(0, 0, 0, 0.2)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 0, 255, 0.2)",
              "rgba(0, 255, 255, 0.2)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    };

    const ctx = chartRef.current.getContext("2d");

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, config);

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [pieKey, pieVal]);

  return (
    <div className="flex items-stretch relative flex flex-col w-12/12 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t px-6 mb-10 py-4 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className=" relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
              {/* Performance */}
            </h6>
            <h2 className="text-blueGray-600 text-xl font-semibold">
              Share Holdings
            </h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        {/* Chart */}
        <div className="relative h-350-px">
          <canvas id="pie-chart" ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
}
