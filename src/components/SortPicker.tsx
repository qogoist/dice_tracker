import React from "react";
import {
  DiceSortMethodMap,
  DiceSortMethods,
  SessionSortMethods,
  SessionSortMethodsMap,
} from "../helper/globals";

type Props = {
  type: "dice" | "sessions";
  active: DiceSortMethods | SessionSortMethods;
  handleChange: (e: React.FormEvent<HTMLSelectElement>) => void;
};

const SortPicker: React.FC<Props> = ({ type, active, handleChange }) => {
  return (
    <select
      name="sort-select"
      className="sort-select"
      onChange={handleChange}
      defaultValue={active}
    >
      {type === "dice"
        ? DiceSortMethods.map(sort => (
            <option value={sort} key={sort}>
              {DiceSortMethodMap[sort]}
            </option>
          ))
        : SessionSortMethods.map(sort => (
            <option value={sort} key={sort}>
              {SessionSortMethodsMap[sort]}
            </option>
          ))}
    </select>
  );
};

export default SortPicker;
