import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function MenueType(props) {
  const [menue, setMenue] = useState([...props.order.menueType]);
  const handleChange = (item) => {
    let o = { ...props.order };
    let menues = [...menue];
    let index = menues.findIndex((m) => m.id === item.id);
    if (props.order.eventType === "6")
      menues[index].checked = !menues[index].checked;
    else {
      let checked = menue.find((m) => m.checked);
      if ((checked && checked.id == item.id) || !checked)
        menues[index].checked = !menues[index].checked;
    }
    o.menueType = [...menues];
    props.setOrder(o);
    setMenue(menues);
  };

  return (
    <FormControl component="fieldset">
      <h1 component="legend">סוג תפריט</h1>
      {menue.map((item) => {
        let isDisplay =
          props.order.eventType === "6" ? item.isForShabat : !item.isForShabat;
        return (
          isDisplay && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.checked}
                  onChange={() => handleChange(item)}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              }
              label={item.name}
            />
          )
        );
      })}
    </FormControl>
  );
}
