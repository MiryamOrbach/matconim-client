import axios from "../../axios";
import React, { useState, useEffect } from "react";
//state global

function Main(props) {
  const { dishes } = props;
  const [dish, setdish] = useState([]);
  const [stateOptions, setStateValues] = useState([]);

  const id = 1;
  axios
    .get(`menu/GetAllDishesByStatusMeal/${id}`)
    .then((x) => {
      debugger;
      console.log(x["data"]);
      setdish(x["data"]);
    })
    .catch((e) => console.log(e));

  return (
    <div>
      <h1>jghgfgfdf</h1>
      <ul>
        {dish.map((post, index) => (
          <div key={index}>
            <p>{post.doseDescription}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Main;
