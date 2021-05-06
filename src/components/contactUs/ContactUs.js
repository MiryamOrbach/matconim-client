import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import EmailIcon from "@material-ui/icons/Email";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Email from "./Email";
import axios from "../../axios";
import { renderToStaticMarkup, renderToString } from "react-dom/server";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ContactUs() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    textC: "",
    isTreated: false,
  });
  const [validation, setValidation] = useState({
    firstName: true,
    lastName: true,
    email: true,
    textC: true,
  });
  const [emailVlidate, setEmailValidate] = useState(true);

  const classes = useStyles();
  const inputChange = (e) => {
    let u = { ...user };
    let s = e.target.value;
    let id = e.target.id;
    u[id] = s;
    let v = { ...validation };
    if (!s || s === "") {
      v[id] = false;
    } else v[id] = true;
    setUser(u);
    setValidation(v);
  };
  const ValidateEmail = (e) => {
    let email = e.target.value;
    var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(mailformat)) {
      setEmailValidate(true);
    } else setEmailValidate(false);
    inputChange(e);
  };
  const saveUser = () => {
    let isValid = true;
    console.log(validation);
    let v = { ...validation };
    Object.keys(validation).forEach((item) => {
      if (!validation[item]) {
        isValid = false;
      } else if (user[item] === "") {
        v[item] = false;
        isValid = false;
      }
    });
    if (isValid && emailVlidate) {
      alert("save");
      axios
        .post("contactus/add", { ...user })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => console.log(e));
     
    } else alert("faild");
    setValidation(v);
    //   validation.keys.forEach(v=>{
    //       if()
    //   })
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EmailIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          צור קשר
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="שם פרטי"
                autoFocus
                onChange={inputChange}
                error={!validation.firstName}
                helperText={!validation.firstName ? "שם פרטי חובה" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="שם משפחה"
                name="lastName"
                onChange={inputChange}
                error={!validation.lastName}
                helperText={!validation.lastName ? "שם משפחה חובה" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="מייל"
                name="email"
                // onChange={(e) => setEmail(e.target.value)}
                onChange={ValidateEmail}
                error={!validation.email || !emailVlidate}
                helperText={
                  !validation.email
                    ? "מייל חובה"
                    : !emailVlidate
                    ? "מייל לא תקין"
                    : ""
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="textC"
                label="הערה"
                name="textC"
                multiline="true"
                onChange={inputChange}
                error={!validation.textC}
                helperText={!validation.textC ? "הערה חובה" : ""}
              ></TextField>
            </Grid>
          </Grid>
          <Button
            fullWidth
            onClick={saveUser}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            אישור
          </Button>
        </form>
      </div>
    </Container>
  );
}
