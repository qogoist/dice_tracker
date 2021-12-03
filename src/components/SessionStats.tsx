import { ChartDataset } from "chart.js";
import React, { useEffect, useState } from "react";
import { useColor } from "../contexts/ColorContext";
import DonutGraph from "./DonutGraph";
import DynDicePicker from "./DynDicePicker";
import LineGraph from "./LineGraph";
import StatSelector from "./StatSelector";

type Props = {
  stats: IStats;
};

const SessionStats: React.FC<Props> = ({ stats }) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<ChartDataset<"line">[]>([]);
  const [overviewSets, setOverviewSets] = useState<ChartDataset<"doughnut">[]>([]);
  const [activeChart, setActiveChart] = useState<Dice | "Overview">("Overview");
  const colors = useColor();

  useEffect(() => {
    if (activeChart === "Overview") {
      let data: number[] = [];
      let borderColor: string[] = [];
      let backgroundColor: string[] = [];

      stats.usedDice.forEach((die, i) => {
        data.push(stats[die].rolls);
        borderColor.push(colors.getHSL!(`primary-${8 - i}00`, 0.8));
        backgroundColor.push(colors.getHSL!(`primary-${8 - i}00`, 0.4));
      });

      const dataset: ChartDataset<"doughnut">[] = [
        {
          label: "Total Rolls",
          data,
          borderColor,
          backgroundColor,
        },
      ];

      setOverviewSets(dataset);
    } else {
      const graphStats: IDieStats = stats[activeChart] as IDieStats;
      let graphLabels: string[] = [];

      for (let i = 0; i < graphStats.rolls; i++) {
        graphLabels.push(`${i + 1}`);
      }

      const graphSets: ChartDataset<"line">[] = [
        {
          label: "Average",
          data: graphStats.avg,
          fill: 1,
          borderColor: colors.getHSL!("accent-500", 0.8),
          backgroundColor: colors.getHSL!("accent-500", 0.4),
        },
        {
          label: activeChart,
          data: graphStats.history.map(roll => roll.result),
          fill: true,
          borderColor: colors.getHSL!("primary-500", 0.8),
          backgroundColor: colors.getHSL!("primary-500", 0.4),
        },
      ];

      setDatasets(graphSets);
      setLabels(graphLabels);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats, activeChart]);

  const handleClick = (e: React.FormEvent<HTMLButtonElement | HTMLSelectElement>) => {
    const button: Dice | "Overview" = e.currentTarget.value as Dice | "Overview";

    setActiveChart(button);
  };

  //TODO: Implement Active States on Graph selector.

  return (
    <>
      <StatSelector
        dice={["Overview", ...stats.usedDice]}
        handleChange={handleClick}
        active={activeChart}
      />
      {activeChart === "Overview" ? (
        <DonutGraph labels={stats.usedDice} datasets={overviewSets} />
      ) : (
        <LineGraph die={activeChart} labels={labels} datasets={datasets} />
      )}
      <DynDicePicker dice={["Overview", ...stats.usedDice]} handleChange={handleClick} />
    </>
  );
};

export default SessionStats;
