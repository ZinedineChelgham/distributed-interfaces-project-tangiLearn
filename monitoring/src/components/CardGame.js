import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Tooltip from "@mui/material/Tooltip";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";

function CardGame({ game }) {
  return (
    <Card sx={{ maxWidth: 200, maxHeight: 230 }}>
      <CardHeader sx={{ textAlign: "center" }} title={game.name} />
      <CardActionArea sx={{ textAlign: "center", justifyContent: "center" }}>
        <CardMedia
          component="img"
          height="120"
          image={game.image}
          alt="green iguana"
        />
      </CardActionArea>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Play">
          <IconButton aria-label="play">
            <PlayArrowIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
}

export default CardGame;
