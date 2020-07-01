import React, { useState, useCallback, useEffect } from "react";
import Chart from "chart.js";

// const myChart = new Chart(ctx, {
//   type: "bar",
//   data: {
//     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//     datasets: [
//       {
//         label: "# of Votes",
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//           "rgba(255, 206, 86, 0.2)",
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(153, 102, 255, 0.2)",
//           "rgba(255, 159, 64, 0.2)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//           "rgba(75, 192, 192, 1)",
//           "rgba(153, 102, 255, 1)",
//           "rgba(255, 159, 64, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   },
// });

export default (props) => {
  const chartRef = React.useRef();
  useEffect(() => {
    console.log(
      "Object.values(props.chartData)",
      Object.values(props.chartData)
    );
    const myChartRef = chartRef.current.getContext("2d");
    const tasksData = [];
    const earningData = [];
    // const tasksData = props.chartData.tasks.ma
    // const earningData = props.chartData.earning.ma
    Object.keys(props.chartData).forEach((k, i) => {
      tasksData.push(props.chartData[k].tasks);
      earningData.push(props.chartData[k].earning);
    });
    const labels = Object.keys(props.chartData).sort();

    new Chart(myChartRef, {
      type: "line",
      data: {
        labels: labels,
        // labels: data1.length === data.length ? data1 : new Array(data.length).fill("Data"),
        datasets: [
          {
            label: "Tasks",
            showLine: true, // overrides the `line` dataset default
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
