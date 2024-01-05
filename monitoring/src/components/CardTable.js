import React, { useEffect, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Typography from "@mui/material/Typography";
import CardGame from "./CardGame";
import CardVideoStream from "./CardVideoStream";
import Box from "@mui/material/Box";
import bip from "../assets/sounds/bip.mp3";
import useSound from "use-sound";

function CardTable({ table }) {
  const [isClicked, setIsClicked] = useState(false);

  function setCurrentGame(game) {
    fetch(`http://localhost:3000/api/monitoring/current-game`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game: game }),
    }).then((r) => console.log(r));
  }

  /**
   *
   * @param {String} game
   */
  const onClick = (game) => {
    setIsClicked(!isClicked);
    if (!isClicked) {
      if (game.includes("tuyaux")) {
        setCurrentGame("pipe");
      } else {
        setCurrentGame("tower");
      }
    } else {
      setCurrentGame("");
    }
  };

  const [needHelp, setNeedHelp] = useState(false);
  const [helpAcknowledged, setHelpAcknowledged] = useState(false);
  const [play, { stop }] = useSound(bip);
  const inputRef = React.useRef(null);

  useEffect(() => {
    // Function to fetch current players
    const fetchPlayers = () => {
      fetch("http://localhost:3000/api/monitoring/need-help")
        .then((response) => {
          inputRef.current.click();
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Assuming the response is JSON
        })
        .then((data) => {
          // Update state with the retrieved current players
          inputRef.current.click();
          setNeedHelp(data);
        })
        .catch((error) => {
          console.error("Error fetching current players:", error);
        });
    };
    // Call the function when the component mounts
    fetchPlayers();
    // Set an interval to call the function every 5 seconds
    const interval = setInterval(fetchPlayers, 2000);
    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleHelpBubbleClick = () => {
    setHelpAcknowledged(true);
    fetch(`http://localhost:3000/api/monitoring/need-help`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ needHelp: false }),
    }).then((r) => console.log(r));
  };

  return (
    <Grid2
      container
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"50%"}
      height={"90%"}
      spacing={4}
      backgroundColor={"#808080"}
      borderRadius={2}
      overflow={"scroll"}
      sx={{ "&::-webkit-scrollbar": { display: "none" } }}
      ref={inputRef}
      onClick={() => {
        if(needHelp && !helpAcknowledged) play();
        else stop();
      }}
    >
      <Grid2
        container
        alignItems={"center"}
        textAlign={"center"}
        justifyContent={"center"}
        width={"100%"}
        xs={12}
      >
        <Typography
          variant={"h4"}
          style={{
            position: "sticky",
            zIndex: 1,
          }}
        >
          {table.name}
        </Typography>
        {needHelp && !helpAcknowledged && (
          <Box
            onClick={handleHelpBubbleClick}
            alignSelf={"end"}
            sx={{
              cursor: "pointer",
              background: "red",
              color: "white",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              zIndex: 1,
              margin: "5px",
              textAlign: "center",
              animation: "blink 2s infinite",
              "@keyframes blink": {
                "0%": { opacity: 1 },
                "50%": { opacity: 0 },
                "100%": { opacity: 1 },
              },
              // Add more styling as needed to resemble a dialog bubble
            }}
          >
            Besoin d&apos;aide
          </Box>
        )}
      </Grid2>

      <Grid2
        container
        direction={"row"}
        xs={12}
        height={"80%"}
        gap={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {!isClicked ? (
          table.games.map((game) => (
            <Grid2 key={game.id}>
              <CardGame game={game} handleClick={onClick} />
            </Grid2>
          ))
        ) : (
          <Grid2 xs={12} sx={{ height: "100%" }}>
            <CardVideoStream handleClick={onClick} />
          </Grid2>
        )}
      </Grid2>
    </Grid2>
  );
}

export default CardTable;
