import { Chip, Divider, Drawer, Stack, Switch } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const Filter = ({ openFilter, setOpenFilter }) => {
  const [selectedColors, setselectedColors] = useState([
    "default",
    "red",
    "yellow",
  ]);
  const [selectedTags, setselectedTags] = useState([]);

  const removeTag = (tag) => {
    setselectedTags(selectedTags.filter((item) => item !== tag));
  };

  const toggleColor = (color) => {
    selectedColors.includes(color)
      ? setselectedColors(selectedColors.filter((item) => item !== color))
      : setselectedColors([...selectedColors, color]);
  };

  const hadleTagSubmit = (e) => {
    e.preventDefault();
    let tag = e.target[0].value;
    if (!selectedTags.includes(tag)) {
      setselectedTags([...selectedTags, tag]);
    }
    e.target[0].value = "";
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
          <h4>Sort by Date-</h4>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <p>DSC</p>
            <Switch defaultChecked />
            <p>ASC</p>
          </Stack>
        </Box>

        <Box sx={{ my: 2 }}>
          <h4>Colors-</h4>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <button
              className={`color-select red ${
                selectedColors.includes("red") && "color-selected"
              }`}
              onClick={() => toggleColor("red")}
            ></button>
            <button
              className={`color-select yellow ${
                selectedColors.includes("yellow") && "color-selected"
              }`}
              onClick={() => toggleColor("yellow")}
            ></button>
            <button
              className={`color-select ${
                selectedColors.includes("default") && "color-selected"
              }`}
              onClick={() => toggleColor("default")}
            ></button>
          </Stack>
        </Box>

        <Box sx={{ my: 2 }}>
          <h4>Tags-</h4>
          <Box sx={{ my: 1, display: "flex", justifyContent: "center" }}>
            <form className="form-tags" onSubmit={hadleTagSubmit}>
              <input type="text" placeholder="Enter tags"></input>
            </form>
          </Box>
          <Box>
            {selectedTags.map((tag) => (
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
