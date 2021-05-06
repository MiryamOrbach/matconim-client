import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "../../axios";
import { useHistory } from "react-router";

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

export default function SignUp() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    tel: "",
    password: "",
    email: "",
  });
  const [validation, setValidation] = useState({
    firstName: true,
    lastName: true,
    tel: true,
    password: true,
    email: true,
  });
  const [emailVlidate, setEmailValidate] = useState(true);
  const [exsistEmail, setExsistEmail] = useState(false);

  const classes = useStyles();
  const history = useHistory();
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
    setExsistEmail(false);
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
    if (isValid && emailVlidate && !exsistEmail) {
      axios
        .post("user/register/", { ...user })
        .then((x) => {
          console.log(x);
          alert("success");
          history.push("/login");
        })
        .catch((e, m) => {
          console.log(e);
          if (e.response.data.Message.includes("UNIQUE KEY")) {
            alert("מייל כבר קיים");
            setExsistEmail(true);
          } else alert("failed");
        });
    } else {
      alert("not valid");
      setValidation(v);
    }

    //   validation.keys.forEach(v=>{
    //       if()
    //   })
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          הרשמה
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
                error={!validation.email || !emailVlidate || exsistEmail}
                helperText={
                  !validation.email
                    ? "מייל חובה"
                    : !emailVlidate
                    ? "מייל לא תקין"
                    : exsistEmail
                    ? "מייל כבר קיים"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="tel"
                label="טלפון"
                type="number"
                name="tel"
                onChange={inputChange}
                error={!validation.tel}
                helperText={!validation.tel ? "טלפון חובה" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="סיסמא"
                type="password"
                id="password"
                onChange={inputChange}
                error={
                  !validation.password ||
                  user.password.length < 4 ||
                  user.password.length > 8
                }
                helperText={
                  !validation.password
                    ? "סיסמא חובה"
                    : user.password.length < 4 || user.password.length > 8
                    ? "סיסמא צריכה להכיל בין 4-8 תווים"
                    : ""
                }
              />
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                קיים כבר חשבון?התחבר
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
