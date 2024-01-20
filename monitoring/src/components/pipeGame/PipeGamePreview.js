/**
 * Represents the board where pipes are placed.
 * Each cell is an element of the array. If the cell
 * is empty, the value is null. If there is a pipe in the
 * cell, the value is an object with the following properties:
 * - type: the type of the pipe (curved, straight, t-shape, long)
 * - rotation: the rotation of the pipe (0, 90, 180, 270)
 * @typedef PipeGameState {{type: PipeType, rotation: 0 | 90 | 180 | 270}[][]}
 */
import PipeGameBoard from "./PipeGameBoard";
import react, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../util";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

function PipeGamePreview({ gameId }) {
  const [state, setState] = useState(undefined);
  const [players, setPlayers] = react.useState([
    {
      name: "John",
      surname: "Doe",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ]);

  useEffect(() => {
    const id = setInterval(
      () =>
        fetch(`${BACKEND_URL}/api/pipe-game/${gameId}`)
          .then((response) => response.json())
          .then((game) => setState(game.state))
          .catch((error) =>
            console.error("Error checking game status:", error),
          ),
      1000,
    );

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Function to fetch current players
    const fetchPlayers = () => {
      fetch(`${BACKEND_URL}/api/monitoring/current-players`)
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

  return (
    <>
      {state && state.board && state.board[0] && (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <Box width={"100%"}>
            <PipeGameBoard
              pipeGameState={state}
              dimensions={{ rows: 8, columns: 14 }}
              cellSize={50}
            />
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            direction={"row"}
          >
            {players.map((player) => (
              <Tooltip
                key={player.name}
                title={`${player.name} ${player.surname}`}
                placement="top"
                arrow
              >
                <Avatar
                  alt={`${player.name} ${player.surname}`}
                  src={player.avatar}
                  sx={{ m: 1 }}
                />
              </Tooltip>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}

export default PipeGamePreview;
