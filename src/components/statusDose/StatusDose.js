import React, { useEffect, useState } from "react";
import {
  FormControlLabel,
  Checkbox,
  FormGroup,
  Card,
  ownerDocument,
} from "@material-ui/core";
import "./StatusDose.css";
export default function StatusDose(props) {
  // const [dishes, setDishes] = useState([
  //   ...props.order.dishes.find((d) => d.id === props.item.idStatusDose).dishes,
  // ]);
  // useEffect(() => {
  //   setDishes(
  //     ...props.order.dishes.find((d) => d.id === props.item.idStatusDose).dishes
  //   );
  // }, [props.order.dishes]);
  const chooseDish = (id) => {
    let d = [...props.dishes];
    let o = { ...props.order };
    let dishArr = [...props.order.dishes];
    let index = props.order.dishes.findIndex(
      (d) => d.id === props.item.idStatusDose
    );

    if (!d.includes(id)) {
      if (d.length < props.sum) {
        d.push(id);
      }
    } else {
      d = d.filter((f) => f != id);
    }
    dishArr[index].dishes = d;
    o.dishes = dishArr;
    // if (!o.dishes.includes(id)) o.dishes.push(id);
    // else o.dishes = o.dishes.filter((o) => o != id);

    // o.dishes = [...d];
    props.setOrder(o);
    // setDishes(d);
  };
  return (
    <div className="dishes">
      {/* <div className="ul"> */}
      <h3>{props.item.statusDoseName}</h3>
      <h4>{`${props.sum}מתוך ${props.item.Dishes.length}לבחירה `} </h4>
      <FormGroup>
        {props.item.Dishes.map((dish, idx) => {
          // let d = props.order.dishes.find(
          //   (d) => d.id === props.item.idStatusDose
          // ).dishes;
          return (
            <FormControlLabel
              key={idx}
              control={
                <Checkbox
                  checked={props.dishes.includes(dish.idDose) ? true : false}
                  onChange={() => chooseDish(dish.idDose)}
                />
              }
              label={`${dish.doseName}-${
                dish.doseDescription != null ? dish.doseDescription : ""
              }`}
            />
          );
        })}
      </FormGroup>
    </div>
  );
}
