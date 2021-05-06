// import React from 'react'

// const about = () =>
//  // שם
// {

//     // משתנים ופונקציות

//     return (
//         <div>

//    <p>

//    ברוכים הבאים  לקייטרינג נפגש בשמחות
//      נפתח בשנת 2005 כחלק מהרצון שלנו לשתף קהל רחב ומגוון יותר-שלא נמנה על אורחי המלון-במנות המיוחדות והאיכותיות שלנו אשר שמם יצא למרחוק.

// כל המנות מגיעות היישר ממטבח המלון תחת פיקוחו של שף המלון ומוכנות ע"י צוות טבחים מוכשר ומיומן על מנת להבטיח רמות גימור גבוהות.

// הקייטרינג בעל תעודת כשרות מהודרת.

// אנו בקייטרינג מלון קיבוץ לביא יכולים לספק קשת רחבה של שירותי הסעדה, החל מסעודות שבת וחג דרך אירועים גדולים וכלה בארוחות למפעלים ומוסדות ומטיילים בשטח.

// כחלק מהשתייכותנו למלון קיבוץ לביא הידוע בשירות המסור,האדיב והלבבי גם אנו בקייטרינג מקפידים לשמור על אותה רמה של שירות ולתת מענה מותאם אישית לכל לקוח ולקוח.

//        </p>
//         {/* <Link to='/login' className="login" >התחבר</Link>
//         <Link to='/sign' className="sign in">הרשם</Link> */}

//         {/* <button class="ui button">sign in</button> */}
//         </div>
//     )
// }
// export default about;

import React from "react";
import Button from "@material-ui/core/Button";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const timeoutLength = 300;

export default class Example extends React.Component {
  state = {
    anchorEl: null,

    // Keep track of whether the mouse is over the button or menu
    mouseOverButton: false,
    mouseOverMenu: false,
  };

  handleClick = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ mouseOverButton: false, mouseOverMenu: false });
  };

  enterButton = () => {
    this.setState({ mouseOverButton: true });
  };

  leaveButton = () => {
    // Set a timeout so that the menu doesn't close before the user has time to
    // move their mouse over it
    setTimeout(() => {
      this.setState({ mouseOverButton: false });
    }, timeoutLength);
  };

  enterMenu = () => {
    this.setState({ mouseOverMenu: true });
  };

  leaveMenu = () => {
    setTimeout(() => {
      this.setState({ mouseOverMenu: false });
    }, timeoutLength);
  };

  render() {
    // Calculate open state based on mouse location
    const open = this.state.mouseOverButton || this.state.mouseOverMenu;

    return (
      <div>
        <Button
          aria-owns={this.state.open ? "simple-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          onMouseEnter={this.enterButton}
          onMouseLeave={this.leaveButton}
        >
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={open}
          onClose={this.handleClose}
          MenuListProps={{
            onMouseEnter: this.enterMenu,
            onMouseLeave: this.leaveMenu,
          }}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}
