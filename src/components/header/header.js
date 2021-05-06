import { render } from "@testing-library/react";
import React, { Component, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  Menu as MaterialMenue,
} from "@material-ui/core";

import MenuItem from "@material-ui/core/MenuItem";
import "../CSS/Header.css";

export default function Header(props) {
  const [showAlert, setShowAlert] = useState(true);
  const [name, setName] = useState(props.name);
  const [role, setRole] = useState(props.role);
  const history = useHistory();
  const navigate = () => {
    setShowAlert(false);
    history.push("/chooseOrder");
  };
  useEffect(() => {
    props.setName(localStorage.getItem("name"));
    props.setRole(localStorage.getItem("role"));
  }, []);
  const login = () => {
    if (props.name) {
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("idCustomer");
      localStorage.removeItem("lastName");
      localStorage.removeItem("firstName");
      localStorage.removeItem("name");
      props.setName(null);
      props.setRole(null);
    }
    history.push("/login");
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigateMenue = (menue) => {
    handleClose();
    history.push("/menue", menue);
  };
  return (
    <>
      <Menu style={{ display: "flex", justifyContent: "space-between" }}>
        {props.name && (
          <Menu.Item>
            {" "}
            <h3>{`שלום ${props.name}`}</h3>
          </Menu.Item>
        )}
        <Menu.Item>
          <Button onClick={login} style={{ marginLeft: "0vw" }}>
            {props.name ? "התנתקות" : "התחברות"}
          </Button>
        </Menu.Item>
        <Menu.Item>
          <NavLink to={"/sign"}>
            <Button color="teal">הרשמה</Button>
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to={"/homepage"}>דף הבית</NavLink>
        </Menu.Item>
        {props.role !== "1" && props.role !== 1 ? (
          <>
            {" "}
            <Menu.Item>
              <NavLink to={"/about"}>אודות</NavLink>
            </Menu.Item>
            <Menu.Item>
              {/* <NavLink to={"/menue"}>תפריט אונליין</NavLink> */}
              <p
                // aria-controls="simple-menu"
                // aria-haspopup="true"
                className="menueText"
                onClick={handleClick}
              >
                תפריט אונליין
              </p>
              <MaterialMenue
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigateMenue(1)}>בשרי</MenuItem>
                <MenuItem onClick={() => navigateMenue(3)}>חלבי</MenuItem>
              </MaterialMenue>
            </Menu.Item>
            <Menu.Item>
              <NavLink to={"/galery"}>גלריה</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to={"/recommendations"}>המלצות</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to={"/contactus"}>צור קשר</NavLink>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item>
              <NavLink to={"/recommendations"}>ניהול המלצות</NavLink>
            </Menu.Item>{" "}
            <Menu.Item>
              <NavLink to={"/inquiryManagement"}>ניהול פניות </NavLink>
            </Menu.Item>
          </>
        )}
        <NavLink to={"/homepage"}>
          <img
            src={logo}
            style={{ width: "202px", height: "94px", "margin-right": "11vw" }}
          ></img>
        </NavLink>
      </Menu>
      <Dialog
        onClose={() => {
          setShowAlert(false);
        }}
        open={showAlert}
      >
        <DialogContent onClick={navigate}>
          <h1>הזמנה בהתאמה אישית!!</h1>
          <h3>לחצו כדי לעבור להזמנה</h3>
        </DialogContent>
      </Dialog>
    </>
  );
}
