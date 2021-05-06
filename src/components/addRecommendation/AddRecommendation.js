import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: 3,
  },
  txt: {
    width: "100%",
    direction: "ltr",
  },
  icon: {
    marginTop: 2,
  },
}));

export default function AddRecommendation(props) {
  const classes = useStyles();
  // const [recommendations, setRecommendations] = useState([]);
  const [txt, setTxt] = useState("");
  const save = () => {
    props.save(txt);
  };
  return (
    <Grid container xs={12} spacing={3} justify="center" alignItems="center">
      <Grid
        container
        direction="row-reverse"
        spacing={3}
        justify="center"
        item
        xs={12}
      >
        <Grid item>
          <Typography color="primary" variant="h5">
            {props.label == "המלצה" ? "הוספת המלצה" : "תשובה"}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField
          className={classes.txt}
          onChange={(e) => {
            setTxt(e.target.value);
          }}
          variant="outlined"
          value={txt}
          multiline
          label={props.label}
        ></TextField>
      </Grid>
      <Grid
        spacing={1}
        item
        container
        alignItems="flex-start"
        justify="flex-start"
        direction="row"
        xs={12}
      >
        <Grid item>
          <Button variant="contained" color="primary" onClick={save}>
            אישור
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              props.ok();
            }}
          >
            ביטול
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
