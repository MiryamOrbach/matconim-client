import React from "react";
import ReactDom from "react-dom";
import "./App.css";
import "./index.css";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Main from "./components/main/main";
import Error from "./components/error/error";
import { useState } from "react";
import { Form } from "semantic-ui-react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./components/homepage/homepage";
import Header from "./components/header/header";
import Slider from "./components/slider/slider";
import Example from "./components/about/about";
// import About from "./components/about/about";
import SignUp from "./components/signUp/SignUp";
import PrivateRoute from "./PrivateRouter";
import ChooseOrder from "./components/chooseOrder/ChooseOrder";
import Menue from "./components/menue/Menue";
import { create } from "jss";

import rtl from "jss-rtl";
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Garlery from "./components/galery/Galery";
import OurRecommendations from "./components/recommendations/OurRecommendations";
import ContactUs from "./components/contactUs/ContactUs";
import { render } from "@testing-library/react";
import InquiryManagement from "./components/inquiryManagement/InquiryManagement";
function App() {
  const [dishes, setDishes] = useState(["בקר", "עוף", "פרגית", "שניצל", "כבד"]);
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  const rtlTheme = createMuiTheme({
    direction: "rtl",
    palette: {
      primary: {
        main: "#a333c8",
      },
      secondary: {
        main: "#bc3c7f",
      },
    },
  });
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={rtlTheme}>
        <div>
          {/* <h1 className="div1">logo</h1>
<h2 className="div2">sign in</h2>
 <h1 className="div3">sign up</h1> */}
          {/* <Register/> */}
          {/* <Main dishes={dishes}/> */}
          {/* <Login/> */}
          {/* <Login/> */}
          <Header
            name={name}
            setName={setName}
            role={role}
            setRole={setRole}
          ></Header>

          <Switch>
            <Route
              path="/login"
              render={() => <Login setName={setName} setRole={setRole} />}
            />
            <Route path="/sign" component={SignUp} />
            <Route path="/about" component={Example} />
            <Route path="/homepage" component={HomePage} />
            <Route path="/galery" component={Garlery} />
            <Route path="/contactUs" component={ContactUs} />
            <Route path="/inquiryManagement" component={InquiryManagement} />
            <Route path="/recommendations" component={OurRecommendations} />
            <PrivateRoute path="/menue" component={Menue} />
            {/* <PrivateRoute path="/" component={MySidebar}/> */}
            <PrivateRoute path="/chooseOrder" component={ChooseOrder} />
            {/* <PrivateRoute path="/chooseOrder" component={ChooseOrder} /> */}
            <Route path="/" component={HomePage} />
          </Switch>
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
