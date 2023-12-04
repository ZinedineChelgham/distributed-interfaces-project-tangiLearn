import "./App.css";
import TablesPreview from "./components/TablesPreview";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";

function App() {
  return (
    <Grid2
      container
      direction={"column"}
      width={"100%"}
      height={"100%"}
      padding={5}
      gap={2}
      wrap="nowrap"
    >
      <Typography variant="h2" textAlign={"center"}>
        Monitoring
      </Typography>
      <Grid2
        container
        xs={4}
        direction={"row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        spacing={3}
      >
        <Grid2>
          <Avatar
            alt="bob"
            src="https://api.dicebear.com/avatar.svg"
            style={{
              width: "4rem", // Set the desired width
              height: "4rem", // Set the desired height
            }}
          />
        </Grid2>
        <Grid2>
          <Typography variant={"body1"}>Mr Bob Delanois</Typography>
        </Grid2>
      </Grid2>
      <Grid2 xs={12}>
        <TablesPreview />
      </Grid2>
    </Grid2>
  );
}

export default App;
