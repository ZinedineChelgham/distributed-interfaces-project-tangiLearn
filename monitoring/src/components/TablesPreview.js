import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";
import CardTable from "./CardTable";

function TablesPreview() {
  const table = {
    id: 1,
    name: "Table NORD",
    games: [
      {
        id: 1,
        name: "Jeu des tuyaux",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-4Q8pxv-FxMJlYYtCHWwHFMu8D7yoGMKSQ&usqp=CAU",
      },
      {
        id: 2,
        name: "Jeu des tours",
        image:
          "https://play-lh.googleusercontent.com/pIDsKZ2NrD0et6pSLqH7DibC4hzEW3C8Tweq1R-ar3hBgX9qA3QQbafK01A62jrXB9Q",
      },
    ],
  };

  return (
    <Grid2
      container
      direction="column"
      justifyContent="center"
      alignItems={"center"}
      gap={4}
    >
      <Typography variant="h4">Tables Preview</Typography>
      <Grid2
        container
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        height={"500px"}
        backgroundColor={"#f5f5f5"}
        borderRadius={2}
        gap={4}
      >
        <CardTable table={table} />
      </Grid2>
    </Grid2>
  );
}

export default TablesPreview;
