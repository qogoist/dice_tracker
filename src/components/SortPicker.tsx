import React from "react";
import { SortMethodMap, SortMethods } from "../helper/globals";

type Props = {
  active: DiceSortMethods;
  handleChange: (e: React.FormEvent<HTMLSelectElement>) => void;
};

const SortPicker: React.FC<Props> = ({ active, handleChange }) => {
  return (
    <select
      name="sort-select"
      className="sort-select"
      onChange={handleChange}
      defaultValue={active}
    >
      {SortMethods.map(sort => (
        <option value={sort} key={sort}>
          {SortMethodMap[sort]}
        </option>
      ))}
    </select>
  );
};

export default SortPicker;
