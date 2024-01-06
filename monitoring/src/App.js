import React, { useEffect, useState } from "react";
import "./App.css";
import TablesPreview from "./components/TablesPreview";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Typography, Tabs, Tab, Avatar, Box } from "@mui/material";
import PupilBinding from "./components/PupilBinding";

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [teacher, setTeacher] = useState({});

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/teacher/")
      .then((response) => response.json())
      .then((data) => setTeacher(data[0]))
      .catch((error) => console.error("Error fetching teacher data:", error));
  }, []);

  return (
    <Grid2
      container
      direction={"column"}
      width={"100%"}
      height={"100%"}
      padding={4}
      gap={2}
      wrap="nowrap"
      sx={{ background: "linear-gradient(to top, #0a5cff, #ffffff)" }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">

        <Box display="flex" alignItems="center">
          <Avatar src={teacher.avatar} />
          <Box ml={1}>Professeur {teacher.surname} {teacher.name?.toLocaleUpperCase()} </Box>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h2" marginRight={'15vw'}>
            TangiLearn Monitoring
          </Typography>
        </Box>
      </Box>




      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        left
        sx={{ "& .MuiTab-root": { textTransform: "none", } }} // Apply custom styles to Tab components
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
