import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

function PupilBinding() {
  const [pupils, setPupils] = useState([]);
  const [addPupil, setAddPupil] = useState(false);

  const [pupilToBeAdded, setPupilToBeAdded] = useState({
    name: "",
    surname: "",
    tokenId: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/pupil/")
      .then((res) => res.json())
      .then((data) => {
        setPupils(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleTokenChange = (event, id) => {
    setPupils(
      pupils.map((pupil) => {
        if (pupil._id === id) {
          // send request to update the pupil
          return { ...pupil, tokenId: event.target.value };
        }
        return pupil;
      })
    );

    const targetPupil = pupils.filter((pupil) => pupil._id === id)[0];
    console.log(targetPupil);
    fetch(`http://localhost:3000/api/pupil/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokenId: targetPupil.tokenId }),
    }).then((r) => console.log(r));
  };

  const handleAddPupil = () => {
    const [surname, name] = pupilToBeAdded.name.split(" ");

    fetch(`http://localhost:3000/api/pupil/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        surname: surname,
        tokenId: pupilToBeAdded.tokenId,
      }),
    }).then((r) => {
      console.log("Post res", r);
      setPupils([
        ...pupils,
        { name: name, surname: surname, tokenId: pupilToBeAdded.tokenId },
      ]);
      setAddPupil(false);
    });
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: "80%" }}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Eleve</TableCell>
              <TableCell>Token ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pupils.map((pupil, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      marginRight: 1,
                    }}
                    src={pupil.avatar}
                    alt={pupil.surname + " " + pupil.name}
                  >
                    {pupil.surname[0] + pupil.name[0]}
                  </Avatar>
                  {pupil.surname + " " + pupil.name}
                </TableCell>
                <TableCell>
                  <TextField
                    value={pupil.tokenId || ""}
                    onChange={(event) => {
                      pupil.tokenId = event.target.value;
                      setPupils([...pupils]);
                    }}
                    onBlur={(event) => handleTokenChange(event, pupil._id)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}

            {addPupil && (
              <TableRow>
                <TableCell>
                  <TextField
                    value={pupilToBeAdded.name || ""}
                    onChange={(event) => {
                      pupilToBeAdded.name = event.target.value;
                      setPupilToBeAdded({ ...pupilToBeAdded });
                    }}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Grid container gap={2}>
                    <TextField
                      value={pupilToBeAdded.tokenId || ""}
                      onChange={(event) => {
                        pupilToBeAdded.tokenId = event.target.value;
                        setPupilToBeAdded({ ...pupilToBeAdded });
                      }}
                      size="small"
                    />
                    <Button variant={"contained"} onClick={handleAddPupil}>
                      Ajouter
                    </Button>
                  </Grid>
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>
                <IconButton onClick={() => setAddPupil(!addPupil)}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default PupilBinding;
