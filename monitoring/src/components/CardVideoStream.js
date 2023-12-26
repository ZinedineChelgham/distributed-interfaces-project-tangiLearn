import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";

function CardVideoStream({ handleClick }) {
  const [streamLink, setStreamLink] = useState("");
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    // Fetch stream link when the component mounts
    fetch("http://localhost:3000/api/monitoring/stream-link")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text(); // Assuming the response is text
      })
      .then((data) => {
        // Update state with the retrieved stream link
        setStreamLink(data);
      })
      .catch((error) => {
        console.error("Error fetching stream link:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    // Function to fetch current players
    const fetchPlayers = () => {
      fetch("http://localhost:3000/api/monitoring/current-players")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Assuming the response is JSON
        })
        .then((data) => {
          // Update state with the retrieved current players
          setPlayers(data);
        })
        .catch((error) => {
          console.error("Error fetching current players:", error);
        });
    };

    // Call the function when the component mounts
    fetchPlayers();

    // Set an interval to call the function every 5 seconds
    const interval = setInterval(fetchPlayers, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const [helpAcknowledged, setHelpAcknowledged] = useState(false);

  const handleHelpBubbleClick = () => {
    setHelpAcknowledged(true);
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        gap: 2,
        flexWrap: "wrap",
        p: 0,
        m: 0,
      }}
    >
      <Card sx={{ position: "relative", flexGrow: 1, width: "100%" }}>
        <iframe
          width="100%"
          height="80%"
          src="https://www.youtube.com/embed/nhUJnPprSqA?si=uS4B8-AdCCmQqt3S"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <CardContent sx={{ height: "fit-parent", padding: "4px" }}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Tooltip title="Stop the game" placement={"right"}>
              <IconButton aria-label="stop" onClick={handleClick}>
                <StopCircleIcon sx={{ width: 40, height: 40 }} />
              </IconButton>
            </Tooltip>
            <Box width={"100px"} display={"flex"} gap={1}>
              {players.map((player, index) => {
                // Display the players' avatars
                return (
                  <Tooltip
                    title={player.surname + " " + player.name}
                    placement={"top"}
                    key={index}
                  >
                    <Avatar
                      sx={{ width: 40, height: 40 }}
                      alt={player.surname + " " + player.name}
                      src={player.avatar}
                    />
                  </Tooltip>
                );
              })}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CardVideoStream;
