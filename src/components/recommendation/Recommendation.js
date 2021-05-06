import { Card, CardContent, Checkbox, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Item } from "semantic-ui-react";

const useStyles = makeStyles({
  card: {
    textAlign: "left",
    maxHeight: "110px",
    height: "110px",
    overflowY: "auto",
    overflowX: "hidden",
  },
  typhography: {
    fontWeight: "bold",
  },
  recommendationContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "2%",
  },
  recommendation: {
    width: "85%",
  },
});

export default function Recommendation(props) {
  const classes = useStyles();
  const [date, setDate] = useState(new Date());

  return (
    <div className={classes.recommendationContainer}>
      {props.role == 1 && (
        <Checkbox
          checked={props.item.isDisplay}
          onChange={() => props.addToSave(props.item)}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      )}
      <div className={classes.info}>
        <Typography color="textSecondary" gutterBottom>
          {`${props.item.Customer.firstName} ${props.item.Customer.lastName}`}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {new Date(props.item.dateR).toLocaleDateString()}
        </Typography>
      </div>
      <Card variant="outlined" className={classes.recommendation}>
        <CardContent className={classes.card}>
          {/* <Typography color="textSecondary" gutterBottom>
          {date}
        </Typography> */}
          <Typography
            className={classes.typhography}
            color="textSecondary"
            gutterBottom
          >
            {props.item.textR}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
