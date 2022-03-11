import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ChartDataset, ScatterDataPoint } from "chart.js";

type Props = {
  die: Dice;
  labels: string[];
  datasets: ChartDataset<"line">[];
};

const LineGraph: React.FC<Props> = ({ die, labels, datasets }) => {
  const chart = useRef<Chart<"line", (number | ScatterDataPoint | null)[], string>>();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    chart.current = new Chart(canvas.current!.getContext("2d")!, {
      type: "line",
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        datasets: {
          line: {
            clip: { left: 2, top: 10, right: 2, bottom: 0 },
          },
        },
        layout: {
          padding: 0,
        },
        interaction: {
          mode: "x",
        },
        scales: {
          xAxis: {
            ticks: {
              stepSize: 1,
            },
            grid: {
              display: false,
            },
            title: {
              font: {
                family: "'Roboto', sans-serif",
              },
            },
          },
          yAxis: {
            min: 1,
            max: parseInt(die.slice(1)),
            ticks: {
              stepSize: 1,
            },
            grid: {
              display: false,
            },
            title: {
              font: {
                family: "'Roboto', sans-serif",
              },
            },
          },
        },
        elements: {
          line: {
            borderJoinStyle: "round",
            tension: 0.2,
            borderWidth: 1,
          },
          point: {
            radius: 2,
            hitRadius: 10,
            hoverRadius: 5,
          },
        },
        animation: {
          delay: 100,
        },
        plugins: {
          legend: {
            labels: {
              pointStyle: "rectRounded",
              usePointStyle: true,
              textAlign: "right",
              font: {
                family: "'Roboto', sans-serif",
                weight: "700",
                size: 14,
              },
            },
          },
          tooltip: {
            titleFont: {
              family: "'Roboto', sans-serif",
              weight: "500",
            },
            bodyFont: {
              family: "'Roboto', sans-serif",
              weight: "300",
            },
            bodyAlign: "right",
            usePointStyle: true,
            callbacks: {
              title: context => `Roll #${context[0].label}`,
              label: context => `${+context.parsed.y.toFixed(2)}`,
            },
          },
          zoom: {
            pan: {
              enabled: true,
              mode: "x",
            },
            zoom: {
              mode: "x",
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
            },
            limits: {
              x: { minRange: 10 },
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
      chart.current.resetZoom();
      chart.current.options.scales!.yAxis!.max = parseInt(die.slice(1));
      chart.current.update();
    }
  }, [die]);

  useEffect(() => {
    if (chart.current) {
      chart.current.data.labels = labels;
      chart.current.data.datasets = datasets;

      chart.current.resetZoom();
      // chart.current.pan({ x: -100 }, undefined, "show");
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

export default LineGraph;
