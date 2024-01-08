import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CardTable from "./CardTable";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../util";

function TablesPreview() {
  const [table, setTable] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/monitoring/table`)
      .then((res) => res.json())
      .then((data) => setTable(data))
      .catch((err) => console.log(err));
  }, []);

  console.log(table, "from preview");

  return (
    <Grid2
      container
      direction="column"
      justifyContent="center"
      alignItems={"center"}
      xs={12}
    >
      <Grid2
        container
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        height={"70vh"}
        backgroundColor={"#f5f5f5"}
        borderRadius={2}
        gap={4}
      >
        {table && <CardTable table={table} />}
      </Grid2>
    </Grid2>
  );
}

export default TablesPreview;
