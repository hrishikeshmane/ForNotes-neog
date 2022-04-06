import React, { createContext, useContext, useReducer } from "react";
import { filterReducer } from "./filter-reducer";

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

const FilterProvider = ({ children }) => {
  const initialValue = {
    sortByDate: "asc",
    colors: ["default", "red", "yellow"],
    tags: [],
  };

  const [filterState, filterDispatch] = useReducer(filterReducer, initialValue);

  return (
    <FilterContext.Provider value={{ filterState, filterDispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
