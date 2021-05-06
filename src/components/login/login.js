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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "semantic-ui-css/semantic.min.css";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const history = useHistory();
  const signIn = () => {
    debugger;
    axios
      .get(`user/login/${email}/${password}`)
      .then((res) => {
        if (res.data === false) {
          alert("מייל או סיסמא לא תקינים");
        } else {
          alert("success" + res.data.firstName + " " + res.data.lastName);
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("role", res.data.permissionCode);
          localStorage.setItem("idCustomer", res.data.idCustomer);
          localStorage.setItem("firstName", res.data.firstName);
          localStorage.setItem("lastName", res.data.lastName);
          localStorage.setItem(
            "name",
            `${res.data.firstName} ${res.data.lastName}`
          );
          props.setName(`${res.data.firstName} ${res.data.lastName}`);
          props.setRole(res.data.permissionCode);
          history.push("/homepage");
        }
      })
      .catch((e) => console.log(e));
  };
  const saveEmail = (event) => {
    setEmail(event.target.value);
  };
  const savePassword = (event) => {
    setPassword(event.target.value);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          התחבר
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="כתובת מייל"
            name="email"
            autoComplete="email"
            autoFocus
            onBlur={saveEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמה"
            type="password"
            id="password"
            autoComplete="current-password"
            onBlur={savePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="זכור אותי"
          />
          <Button
            // type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signIn}
            value="התחבר"
          >
            התחבר
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                שכחת סיסמא?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sign" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
export default Login;
