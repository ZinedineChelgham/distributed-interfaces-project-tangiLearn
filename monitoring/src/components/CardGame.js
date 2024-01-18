import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import {
    Button,
    CardActionArea,
    CardActions,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Modal,
    TextField,
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import {useState} from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {nanoid} from "nanoid";
import {BACKEND_URL} from "../util";

function CardGame({game, handleClick}) {
    // State for modal visibility
    // State for dialog visibility
    const [openDialog, setOpenDialog] = useState(false);
    const [isTowerParamClicked, setIsTowerParamClicked] = useState(false);
    const [towerParams, setTowerParams] = useState([1, 2, 1, 1, 2, 2, 3, 2, 1, 2, 2, 3]);

    // Function to handle opening and closing dialog
    const handleDialog = () => {
        setOpenDialog(!openDialog);
        setIsTowerParamClicked(!openDialog);
    };

    const sendGameDataToBackend = async (data) => {
        try {
            const response = await fetch(
                `${BACKEND_URL}/api/tower-game/update-default-values`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
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
    };
    return (
        <Card sx={{maxWidth: 200, maxHeight: 230}}>
            <CardHeader sx={{textAlign: "center"}} title={game.name}/>
            <CardActionArea
                sx={{textAlign: "center", justifyContent: "center"}}
                onClick={() => handleClick(game.name)}
            >
                <CardMedia
                    component="img"
                    height="120"
                    image={game.image}
                    alt="green iguana"
                />
            </CardActionArea>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Tooltip title="Play" placement={"right"}>
                    <IconButton aria-label="play" onClick={() => handleClick(game.name)}>
                        <PlayCircleIcon/>
                    </IconButton>
                </Tooltip>
                {game.name.includes("tours") && (
                    <Tooltip title="Paramètres" placement={"right"}>
                        <IconButton aria-label="settings" onClick={handleDialog}>
                            <SettingsIcon/>
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
            {/* Modal component */}
            <Dialog
                open={openDialog}
                onClose={handleDialog}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
            >
                <DialogTitle id="dialog-title" marginBottom={'1rem'}>
                    {"Configuration du jeu des tours"}
                </DialogTitle>
                <DialogContent>
                    {isTowerParamClicked ? (
                        <Grid container spacing={2}>
                            {[...Array(12)].map((_, index) => {
                                return (
                                    <Grid item xs={4} key={index}>
                                        <TextField
                                            fullWidth
                                            //label={`${index + 1}`}
                                            variant="outlined"
                                            required={true}
                                            type={"number"}
                                            value={towerParams[index]}
                                            onChange={(e) => {
                                                const newTowerParams = [...towerParams];
                                                newTowerParams[index] = e.target.value;
                                                setTowerParams(newTowerParams);
                                                console.log(towerParams);
                                            }}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    ) : undefined}
                </DialogContent>
                <DialogActions>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            padding: "0 1rem",
                        }}
                    >
                        <Button
                            variant={"contained"}
                            color={"success"}
                            onClick={() => {
                                handleDialog();
                                sendGameDataToBackend({
                                    selectedValues: towerParams,
                                });
                            }}
                        >
                            Sauvegarder
                        </Button>
                        <Button color={"primary"} variant={"contained"} onClick={handleDialog}>
                            Fermer
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default CardGame;
