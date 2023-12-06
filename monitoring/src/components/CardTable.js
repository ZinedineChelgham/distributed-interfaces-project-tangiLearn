import React, { useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Typography from "@mui/material/Typography";
import CardGame from "./CardGame";
import CardVideoStream from "./CardVideoStream";

function CardTable({ table }) {
    console.log(table, "sasa");

    const [isClicked, setIsClicked] = useState(false);


    const onClick = () => {
        setIsClicked(!isClicked);
    }

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
                width={"600px"}
                height={"300px"}
                gap={2}
                justifyContent={"center"}
                alignItems={"center"}
            >
                {isClicked ? (
                    table.games.map((game) => (
                        <Grid2 key={game.id}>
                            <CardGame game={game} handleClick={onClick} />
                        </Grid2>
                    ))
                ) : (
                    <Grid2>
                        <CardVideoStream handleClick={onClick} />
                    </Grid2>
                )}
            </Grid2>
        </Grid2>
    );
}

export default CardTable;
