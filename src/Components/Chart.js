import React, { useEffect } from "react";
import Chart from "chart.js";

export default (props) => {
  const chartRef = React.useRef();
  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");
    const tasksData = [];
    const earningData = [];
    Object.keys(props.chartData).forEach((k, i) => {
      tasksData.push(props.chartData[k].tasks);
      earningData.push(props.chartData[k].earning);
    });
    const labels = Object.keys(props.chartData).sort();
    new Chart(myChartRef, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Tasks",
            data: tasksData,
            backgroundColor: "rgba(13, 126, 239, 0.25)",
          },
          {
            label: "Earning",
            data: earningData,
            backgroundColor: "rgba(5, 253, 24, 0.28)",
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }, [props]);

  return (
    <div>
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
};
