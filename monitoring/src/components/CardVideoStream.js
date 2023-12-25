import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import {useEffect, useState} from "react";

function CardVideoStream({ handleClick }) {
  const [streamLink, setStreamLink] = useState('');

  useEffect(() => {
    // Fetch stream link when the component mounts
    fetch('http://localhost:3000/api/monitoring/stream-link')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text(); // Assuming the response is text
        })
        .then((data) => {
          // Update state with the retrieved stream link
          setStreamLink(data);
        })
        .catch((error) => {
          console.error('Error fetching stream link:', error);
        });
  }, []); // Empty dependency array ensures the effect runs only once on mount


  return (
    <Box
      component="ul"
      sx={{ display: "flex", gap: 2, flexWrap: "wrap", p: 0, m: 0 }}
    >
      <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
        <iframe
          width="100%"
          height="75%"
          src={`${streamLink}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <CardContent sx={{ height: "fit-parent", padding: '4px'}}>
          <Box>
            <Tooltip title="Stop the game" placement={"right"}>
              <IconButton aria-label="stop" onClick={handleClick}>
                <StopCircleIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CardVideoStream;