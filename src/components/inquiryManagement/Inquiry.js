import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Typography,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { renderToString } from "react-dom/server";
import Email from "../../components/contactUs/Email";
import AddRecommendation from "../../components/addRecommendation/AddRecommendation";
import axios from "../../axios";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

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
    width: "85%",
  },
  recommendation: {
    width: "85%",
  },
  btnans: {
    margin: "2% 0",
  },
  container: {
    display: "flex",
  },
});

export default function Inquiry(props) {
  const classes = useStyles();
  const [showDialog, setShowDialog] = useState(false);
  const sendEmail = (txt) => {
    let html = renderToString(<Email {...props.item} txt={txt} />);
    axios
      .post("contactus/sendEmail/", {
        html: html,
        to: props.item.email,
        id: props.item.idContactUs,
      })
      .then((res) => {
        console.log(res);
        props.getContacts();
      })
      .catch((e) => {
        console.log(e);
      });
    setShowDialog(false);
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.recommendationContainer}>
          <div className={classes.info}>
            <Typography color="textSecondary" gutterBottom>
              {`${props.item.firstName} ${props.item.lastName}`}
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
                {props.item.textC}
              </Typography>
            </CardContent>
          </Card>
        </div>
        {!props.item.isTreated && (
          <Button
            className={classes.btnans}
            variant="contained"
            color="primary"
            onClick={() => setShowDialog(true)}
          >
            השב
          </Button>
        )}
      </div>
      <Dialog
        onClose={() => {
          setShowDialog(false);
        }}
        open={showDialog}
      >
        <DialogContent className={classes.content}>
          <AddRecommendation
            ok={() => setShowDialog(false)}
            label="תשובה"
            save={(txt) => {
              sendEmail(txt);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
