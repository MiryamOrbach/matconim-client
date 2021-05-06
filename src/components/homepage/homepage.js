import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../header/header.js";
import Home from "../../assets/shutterstock_73307464.jpg";
import { requirePropFactory } from "@material-ui/core";
import "./homepage.css";
const HomePage = () => {
  const [index, setIndex] = useState(0);
  const ref = useRef(index);
  const [images, setImages] = useState([
    "shutterstock_128153132.jpg",
    "shutterstock_194996210.jpg",
    "shutterstock_294930032.jpg",
  ]);
  // משתנים ופונקציות
  const next = () => {
    let i = ref.current;
    if (i === images.length - 1) setIndex(0);
    else {
      i = i + 1;
      setIndex(i);
    }
  };
  useEffect(() => {
    ref.current = index;
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [aa, setAa] = useState(images + "/shutterstock_71730.jpg");
  return (
    <div className="home">
      <img
        className="img"
        src={require("../../assets/אוכל/" + images[index])}
      />
      {/* <img src={Home} style={{ width: "100vw", height: "150vh" }}></img>‏ */}
      {/* <Link to='/login' className="login" >התחבר</Link>
        <Link to='/sign' className="sign in">הרשם</Link> */}
      {/* <button class="ui button">sign in</button> */}
    </div>
  );
};

export default HomePage;
