import { Chip, Divider, Drawer, Stack, Switch } from "@mui/material";
import { Box } from "@mui/system";
import { useFilter } from "./context/FilterProvider";

const Filter = ({ openFilter, setOpenFilter }) => {
  const { filterState, filterDispatch } = useFilter();

  const toggleColor = (color) => {
    filterDispatch({ type: "FILTER_BY_COLORS", payload: color });
  };

  const removeTag = (tag) => {
    filterDispatch({ type: "REMOVE_TAG", payload: tag });
  };

  const hadleTagSubmit = (e) => {
    e.preventDefault();
    let tag = e.target[0].value;
    if (!filterState.tags.includes(tag)) {
      filterDispatch({ type: "ADD_TAG", payload: tag });
    }
    e.target[0].value = "";
  };

  const handleSort = () => {
    if (filterState.sortByDate === "asc") {
      filterDispatch({ type: "SORT_BY_DATE_DSC" });
    } else {
      filterDispatch({ type: "SORT_BY_DATE_ASC" });
    }
  };

  return (
    <Drawer
      anchor="right"
      open={openFilter}
      onClose={() => setOpenFilter((prevState) => !prevState)}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: "#262729",
          height: "100%",
          width: 250,
          color: "white",
        }}
      >
        <h1>Filter</h1>
        <Divider sx={{ my: 1 }} />

        <Box sx={{ my: 2 }}>
          <h4>Sort by Date -</h4>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <p>DSC</p>
            <Switch
              checked={filterState.sortByDate === "asc" ? true : false}
              onChange={handleSort}
            />
            <p>ASC</p>
          </Stack>
        </Box>

        <Box sx={{ my: 2 }}>
          <h4>Colors -</h4>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <button
              className={`color-select red ${
                filterState.colors.includes("red") && "color-selected"
              }`}
              onClick={() => toggleColor("red")}
            ></button>
            <button
              className={`color-select yellow ${
                filterState.colors.includes("yellow") && "color-selected"
              }`}
              onClick={() => toggleColor("yellow")}
            ></button>
            <button
              className={`color-select ${
                filterState.colors.includes("default") && "color-selected"
              }`}
              onClick={() => toggleColor("default")}
            ></button>
          </Stack>
        </Box>

        <Box sx={{ my: 2 }}>
          <h4>Tags -</h4>
          <Box sx={{ my: 1, display: "flex", justifyContent: "center" }}>
            <form className="form-tags" onSubmit={hadleTagSubmit}>
              <input type="text" placeholder="Enter tags"></input>
            </form>
          </Box>
          <Box>
            {filterState.tags.map((tag) => (
              <Chip
                variant="outlined"
                sx={{ m: 0.3, color: "whitesmoke" }}
                key={tag}
                label={tag}
                onDelete={() => removeTag(tag)}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Filter;
