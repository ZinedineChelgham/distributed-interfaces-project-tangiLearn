import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {Typography} from "@mui/material";
import CardTable from "./CardTable";
import {useEffect, useState} from "react";

function TablesPreview() {

    const [table, setTable] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/monitoring/table")
            .then((res) => res.json())
            .then((data) => setTable(data))
            .catch((err) => console.log(err));
    } ,[])


  console.log(table, "from preview")

    return (
        <Grid2
            container
            direction="column"
            justifyContent="center"
            alignItems={"center"}
            gap={4}
        >
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
                {table && <CardTable table={table} />}
            </Grid2>
        </Grid2>
    );
}

export default TablesPreview;
