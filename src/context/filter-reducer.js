const filterReducer = (filterState, action) => {
  switch (action.type) {
    case "SORT_BY_DATE_ASC":
      return { ...filterState, sortByDate: "asc" };
    case "SORT_BY_DATE_DSC":
      return { ...filterState, sortByDate: "dsc" };
    case "FILTER_BY_COLORS":
      if (filterState.colors.includes(action.payload)) {
        return {
          ...filterState,
          colors: filterState.colors.filter(
            (color) => color !== action.payload
          ),
        };
      } else {
        return {
          ...filterState,
          colors: [...filterState.colors, action.payload],
        };
      }
    case "ADD_TAG":
      return {
        ...filterState,
        tags: [...filterState.tags, action.payload],
      };
    case "REMOVE_TAG":
      return {
        ...filterState,
        tags: filterState.tags.filter((tag) => tag !== action.payload),
      };
    default:
      console.error("Invalid action type");
      return filterState;
  }
};

export { filterReducer };
