import React, { useEffect, useState } from "react";
import axios from "../../axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import "./Menue.css";
export default function Menue(props) {
  const [statusDose, setStatusDose] = useState([]);
  useEffect(() => {
    console.log(props.location.state);
    axios
      .get(`statusDose/allStatusWithDishes/${props.location.state}`)
      .then((res) => {
        console.log(res.data);
        setStatusDose(res.data);
      })
      .catch((e) => console.log(e));
  }, [props.location.state]);
  return (
    // <div className="wrapper">
    //   <div className="ul">
    //     <h3>מנה ראשונה</h3>
    //     <ul>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //     </ul>
    //   </div>
    //   <div className="ul">
    //     <h3>מנה שניה</h3>
    //     <ul>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //     </ul>
    //   </div>{" "}
    //   <div className="ul">
    //     <h3>מנה שלישית</h3>
    //     <ul>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //     </ul>
    //   </div>{" "}
    //   <div className="ul">
    //     <h3>מנה רביעית</h3>
    //     <ul>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //     </ul>
    //   </div>{" "}
    //   <div className="ul">
    //     <h3>מנה שישית</h3>
    //     <ul>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //     </ul>
    //   </div>{" "}
    //   <div className="ul">
    //     <h3>מנה שביעית</h3>
    //     <ul>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //       <li>item</li>
    //     </ul>
    //   </div>
    // </div>

    <div
      className="wrapper"
      // style={{
      //   display: "grid",
      //   gridTemplateColumns: "50% 50%",
      //   gridTemplateRows: "auto",
      //   margin: "0 20%",
      // }}
    >
      {statusDose.map((item, idx) => {
        return (
          <div>
            {/* <div className="ul"> */}
            <h3>{item.statusDoseName}</h3>
            <ul>
              {/* {item.statusDoseName} */}
              {item.Dishes.map((dish, idx) => {
                return (
                  <li key={idx}>{`${dish.doseName}-${
                    dish.doseDescription != null ? dish.doseDescription : ""
                  }`}</li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
