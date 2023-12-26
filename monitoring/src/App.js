import React, { useState } from "react";
import "./App.css";
import TablesPreview from "./components/TablesPreview";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Typography, Tabs, Tab } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PupilBinding from "./components/PupilBinding";

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Grid2
      container
      direction={"column"}
      width={"100%"}
      height={"100%"}
      padding={4}
      gap={2}
      wrap="nowrap"
    >
      <Typography variant="h2" textAlign={"center"}>
        TangiLearn Monitoring
      </Typography>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        left
        sx={{ "& .MuiTab-root": { textTransform: "none" } }} // Apply custom styles to Tab components
      >
        <Tab label="Gestion des tables" />
        <Tab label="Couplage élève/tangible" />
      </Tabs>

      <Grid2 xs={12}>
        {activeTab === 0 && <TablesPreview />}
        {activeTab === 1 && <PupilBinding />}
      </Grid2>
    </Grid2>
  );
}

export default App;
