import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Typography from "@mui/material/Typography";
import React from "react";
import CardGame from "./CardGame";

function CardTable({ table }) {
  console.log(table, "sasa");

  return (
    <Grid2
      container
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={3}
      backgroundColor={"#808080"}
      borderRadius={2}
    >
      <Grid2>
        <Typography variant={"h4"}>{table.name}</Typography>
      </Grid2>

      <Grid2
        container
        direction={"row"}
        width={"500px"}
        height={"300px"}
        gap={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {table.games.map((game) => (
          <Grid2 key={game.id}>
            <CardGame game={game} />
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
}

export default CardTable;
