import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import DateFnsUtils from "@date-io/date-fns";

import FormLabel from "@material-ui/core/FormLabel";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function EventType(props) {
  const [value, setValue] = React.useState(props.order.eventName);
  // const events = [
  //   {
  //     id: "1",
  //     name: "בר מצווה",
  //   },
  //   {
  //     id: "2",
  //     name: "חתונה",
  //   },
  //   {
  //     id: "3",
  //     name: "שבע ברכות",
  //   },
  //   {
  //     id: "4",
  //     name: "ארוסין",
  //   },
  //   {
  //     id: "5",
  //     name: "ברית",
  //   },
  //   {
  //     id: "6",
  //     name: "שבת",
  //   },
  // ];
  const handleChange = (event) => {
    let o = { ...props.order };
    let id = event.target.value;
    if (id === "6" || o.eventName === "6") {
      let menues = [...o.menueType];
      menues.forEach((m) => (m.checked = false));
    }
    o.eventName = id;
    setValue(event.target.value);
    props.setOrder(o);
  };
  // const [selectedDate, setSelectedDate] = React.useState(
  //   new Date("2014-08-18T21:11:54")
  // );

  const handleDateChange = (date) => {
    let o = { ...props.order };
    let order = { ...o.order };
    order.orderDate = date;
    o.order = order;
    props.setOrder(o);
  };
  return (
    <>
      <FormControl component="fieldset">
        <h1 component="legend">סוג ארוע</h1>
        <RadioGroup
          aria-label="סוג ארוע"
          name="event"
          value={value}
          onChange={handleChange}
        >
          {props.events.map((item, idx) => {
            return (
              <FormControlLabel
                value={item.id}
                control={<Radio />}
                label={item.name}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="תאריך הארוע"
            format="MM/dd/yyyy"
            value={
              props.order.order.orderDate ? props.order.order.orderDate : null
            }
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
    </>
  );
}
