import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function BarChart({ data }) {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    // const labels = [
    //   "January",
    //   "February",
    //   "March",
    //   "April",
    //   "May",
    //   "June",
    //   "July",
    // ];
    // const data1 = [30, 78, 56, 34, 100, 45, 13];
    // const data2 = [27, 68, 86, 74, 10, 4, 87];

    const config = {
      type: "bar",
      data: {
        labels: data.time,
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: data.data,
            fill: false,
            barThickness: 8,
          },
          //   {
          //     label: new Date().getFullYear() - 1,
          //     fill: false,
          //     backgroundColor: "#4c51bf",
          //     borderColor: "#4c51bf",
          //     data: data2,
          //     barThickness: 8,
          //   },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            display: false,
            text: "Orders Chart",
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        scales: {
          x: {
            display: false,
            title: {
              display: true,
              text: "Month",
            },
            grid: {
              borderColor: "rgba(33, 37, 41, 0.3)",
              borderDash: [2],
              borderDashOffset: [2],
            },
          },
          y: {
            display: true,
            title: {
              display: false,
              text: "Value",
            },
            grid: {
              borderColor: "rgba(33, 37, 41, 0.2)",
              borderDash: [2],
              borderDashOffset: [2],
              drawBorder: false,
            },
          },
        },
        legend: {
          labels: {
            color: "rgba(0, 0, 0, .4)",
          },
          align: "end",
          position: "bottom",
        },
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
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
              Performance
            </h6>
            <h2 className="text-blueGray-700 text-xl font-semibold">
              Total orders
            </h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        {/* Chart */}
        <div className="relative h-350-px">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
}
