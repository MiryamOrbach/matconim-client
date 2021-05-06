import React, { useEffect, useState } from "react";
import { FormControlLabel, Checkbox, FormGroup, Card } from "@material-ui/core";
import axios from "../../axios";
import StatusDose from "../statusDose/StatusDose";
import "./DoseCategory.css";
export default function DoseCategory(props) {
  const [eventType, setEventType] = useState({});
  const [statusDose, setStatusDose] = useState([]);
  useEffect(() => {
    let o = { ...props.order };
    let menueType = [...props.order.menueType];
    let statusMeal = menueType.find((m) => m.checked === true);
    if (statusMeal && statusMeal !== null) {
      axios
        .get(
          `eventType/getEventType/${
            props.order.order.type === "1" ? true : false
          }/${statusMeal.isForShabat ? statusMeal.id : 0}/${
            statusMeal.isForShabat ? 0 : statusMeal.id
          }`
        )
        .then((res) => {
          console.log(res);
          setStatusDose(res.data.statusDose);
          setEventType(res.data.eventType);
          let o = { ...props.order };
          o.idEvent = res.data.eventType.idEvent;
          props.setOrder(o);
        })
        .catch((e) => {
          console.log(e);
        });
    } else alert("יש לבחור סוג תפריט");
  }, []);
  return (
    <>
      <h1>{eventType.eventName}</h1>
      <div className="statusDose">
        {statusDose.map((s, i) => {
          let d = props.order.dishes.find((d) => d.id === s.idStatusDose)
            .dishes;
          return (
            <StatusDose
              key={i}
              order={props.order}
              setOrder={props.setOrder}
              item={s}
              dishes={d}
              sum={eventType.isBasic ? s.sumChooseBase : s.sumChooseUpgrade}
            />
          );
        })}
      </div>
      <span className="price">{`מחיר למנה ${eventType.priceAll}`}</span>
    </>
    // <div
    //   style={{
    //     display: "grid",
    //     gridTemplateColumns: "50% 50%",
    //     gridTemplateRows: "auto",
    //   }}
    // >
    //   <div>
    //     <h3>מנה ראשונה</h3>
    //     <h4>2 לבחירה</h4>
    //     <FormGroup>
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //     </FormGroup>
    //   </div>
    //   <div>
    //     <h3>מנה שניה</h3>
    //     <h4>2 לבחירה</h4>
    //     <FormGroup>
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //     </FormGroup>
    //   </div>
    //   <div>
    //     <h3>מנה שלישית</h3>
    //     <h4>2 לבחירה</h4>
    //     <FormGroup>
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //     </FormGroup>
    //   </div>
    //   <div>
    //     <h3>מנה רביעית</h3>
    //     <h4>2 לבחירה</h4>
    //     <FormGroup>
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //     </FormGroup>
    //   </div>
    //   <div>
    //     <h3>מנה חמישית</h3>
    //     <h4>2 לבחירה</h4>
    //     <FormGroup>
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //       <FormControlLabel control={<Checkbox />} label="דג סלומון" />
    //     </FormGroup>
    //   </div>
    // </div>
  );
}
