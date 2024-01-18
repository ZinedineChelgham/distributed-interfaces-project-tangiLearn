import React, { useEffect, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Typography from "@mui/material/Typography";
import CardGame from "./CardGame";
import Box from "@mui/material/Box";
import bip from "../assets/sounds/bip.mp3";
import useSound from "use-sound";
import { BACKEND_URL } from "../util";
import GamePreview from "./GamePreview";

function CardTable({ table }) {
  const [isClicked, setIsClicked] = useState(false);
  const [currentGame, setCurrentGame] = useState("");

  useEffect(() => {
    if (currentGame === "pipe") {
      fetch(`${BACKEND_URL}/api/monitoring/current-game`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ game: "pipe" }),
      }).then((r) => console.log(r));
    } else if (currentGame === "tower") {
      fetch(`${BACKEND_URL}/api/monitoring/current-game`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ game: "tower" }),
      }).then((r) => console.log(r));
    } else {
      fetch(`${BACKEND_URL}/api/monitoring/current-game`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ game: "" }),
      }).then((r) => console.log(r));
    }
  }, [currentGame]);

  /**
   *
   * @param {String} game
   */
  const onClick = async (game) => {
    setIsClicked(!isClicked);
    if (!isClicked) {
      if (game.includes("tuyaux")) {
        setCurrentGame("pipe");
      } else {
        setCurrentGame("tower");

        try {
          const response = await fetch(
              `${BACKEND_URL}/api/tower-game/start-game`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
              },
          );

          if (response.ok) {
            const responseData = await response.json();
            console.log("Réponse du backend :", responseData);
          } else {
            console.error(
                "Erreur lors de la requête au backend :",
                response.statusText,
            );
          }
        } catch (error) {
          console.error("Erreur lors de l'envoi des données au backend :", error);
        }
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
      fetch(`${BACKEND_URL}/api/monitoring/need-help`)
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
    fetch(`${BACKEND_URL}/api/monitoring/need-help`, {
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
      height={"90%"}
      xs={8}
      spacing={4}
      backgroundColor={"#3c9cf7f7"}
      borderRadius={2}
      overflow={"scroll"}
      sx={{ "&::-webkit-scrollbar": { display: "none" } }}
      ref={inputRef}
      onClick={() => {
        if (needHelp && !helpAcknowledged) play();
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
          {currentGame ? `${table.name} en direct` : table.name}
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
            <GamePreview game={currentGame} />
          </Grid2>
        )}
      </Grid2>
    </Grid2>
  );
}

export default CardTable;
