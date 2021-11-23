import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ChartDataset, ScatterDataPoint } from "chart.js";

type Props = {
  labels: string[];
  datasets: ChartDataset<"doughnut">[];
};

const DonutGraph: React.FC<Props> = ({ labels, datasets }) => {
  const chart = useRef<Chart<"doughnut", (number | ScatterDataPoint | null)[], string>>();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    chart.current = new Chart(canvas.current!.getContext("2d")!, {
      type: "doughnut",
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          arc: {
            borderWidth: 1,
            hoverOffset: 20,
          },
        },
        animation: {
          duration: 2000,
        },
        plugins: {
          tooltip: {
            titleFont: {
              family: "'Roboto', sans-serif",
              weight: "500",
            },
            callbacks: {
              title: context => `${context[0].parsed}${context[0].label.toLowerCase()} rolled`,
              label: context => "",
            },
          },
        },
      },
    });

    return () => {
      chart.current?.destroy();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chart.current) {
      chart.current.data.labels = labels;
      chart.current.data.datasets = datasets;

      chart.current.update();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels, datasets]);

  return (
    <div className="chart">
      <canvas ref={canvas}></canvas>
    </div>
  );
};

export default DonutGraph;
