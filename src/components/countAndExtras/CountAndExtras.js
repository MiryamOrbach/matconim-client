import React, { useState } from "react";
import { FormControl } from "@material-ui/core";
// import TextField from "@material-ui/core/TextField";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  RadioGroup,
  Radio,
  CardContent,
  Card,
  CardHeader,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  radioGroup: {
    flexDirection: "row",
    marginLeft: 10,
  },
  //   radio: {
  //     flexDirection: "row",
  //   },
  //   formControlLabel: {
  //     color: "black",
  //   },
  //   gridContainer: {
  //     margin: "2%",
  //     width: "98%",
  //   },
  //   typography: {
  //     marginBottom: 8,
  //   },
}));
export default function CountAndExtras(props) {
  const classes = useStyles();
  // const [order, setOrder] = useState({ ...props.order });
  const [extras, setExtras] = useState([
    {
      id: 1,
      name: "שתיה",
    },
    {
      id: 2,
      name: "לחמניות",
    },
    {
      id: 3,
      name: "מלצרים",
    },
  ]);
  const saveExtra = (extra) => {
    let e = [...props.order.extras];
    let o = { ...props.order };
    if (!e.includes(extra)) e.push(extra);
    else e = e.filter((ex) => ex !== extra);
    o.extras = [...e];
    props.setOrder(o);
  };
  const handleChange = (field, value) => {
    let helperOrder = { ...props.order };
    let o = { ...props.order.order };
    o[field] = value;
    helperOrder.order = { ...o };
    // setOrder(helperOrder);
    props.setOrder(helperOrder);
  };
  return (
    <FormControl>
      <h1>בחירת כמות ותוספות</h1>

      <TextField
        id="standard-basic"
        label="מס' מנות"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        onChange={(e) => handleChange("count", e.target.value)}
        value={props.order.order.count}
      />
      {/* <Card className={classes.check} variant="outlined">
        <CardContent className={classes.checkContent}> */}
      <FormControlLabel
        control={
          <FormControl variant="outlined">
            <RadioGroup
              className={classes.radioGroup}
              value={props.order.order.type}
              onChange={(e) => {
                handleChange("type", e.target.value);
              }}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="בסיס"
                // className={classes.formControlLabel}
              />

              <FormControlLabel
                value="2"
                control={<Radio />}
                label="משודרג"
                // className={classes.formControlLabel}
              />

              {/* })} */}
            </RadioGroup>
          </FormControl>
        }
      />
      {/* </CardContent>
      </Card> */}
      <FormControlLabel
        control={
          <Checkbox
            checked={props.order.extras.includes(6) ? true : false}
            onChange={() => saveExtra(6)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        }
        label="אוכל בלבד"
      />
      {/* <FormControlLabel
        control={
          <Checkbox
            checked={order.extras.includes(3) ? true : false}
            onChange={() => saveExtra(3)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        }
        label="מלצרים"
      /> */}
      <FormControlLabel
        control={
          <FormControl variant="outlined">
            <RadioGroup
              className={classes.radioGroup}
              value={props.order.extras.includes("4") ? "4" : "5"}
              onChange={(e) => {
                saveExtra(e.target.value);
              }}
            >
              <FormControlLabel
                value="5"
                control={<Radio />}
                label="חד פעמי"
                // className={classes.formControlLabel}
              />

              <FormControlLabel
                value="4"
                control={<Radio />}
                label="פורצלן"
                // className={classes.formControlLabel}
              />

              {/* })} */}
            </RadioGroup>
          </FormControl>
        }
      />
      {!props.order.extras.includes(6) &&
        extras.map((e, i) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.order.extras.includes(e.id) ? true : false}
                  onChange={() => saveExtra(e.id)}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              }
              label={e.name}
            />
          );
        })}
    </FormControl>
  );
}
