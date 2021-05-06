import React, { useEffect, useState } from "react";
import axios from "../../axios";
import Inquiry from "./Inquiry";
import { Dialog, DialogContent, Button, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  text: {
    color: "#214078",
    textDecoration: "underline",
  },
  content: {
    width: 500,
    height: 210,
  },
  txt: {
    textAlign: "center",
  },
  recommendations: {
    width: "80%",
    margin: "auto",
    maxHeight: "480px",
    height: "480px",
    overflowY: "auto",
  },
  btn: {
    width: "10%",
    marginLeft: "80%",
    marginTop: " 2%",
  },
  btnrecommendation: {
    margin: "0 1% 0 1%",
  },
  // buttons:{
  //   display
  // }
}));

export default function InquiryManagement() {
  const [inquiries, setInquiries] = useState([]);
  const [currentBtn, setCurrentBtn] = useState(1);
  const classes = useStyles();
  const getContacts = (isTreated) => {
    setCurrentBtn(isTreated === true ? 2 : 3);
    axios
      .get(`contactus/contactByIsTreated/${isTreated}`)
      .then((res) => {
        console.log(res);
        setInquiries([...res.data]);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getAllContacts = () => {
    setCurrentBtn(1);
    axios
      .get(`contactus/allContacts`)
      .then((res) => {
        console.log(res);
        setInquiries([...res.data]);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getAllContacts();
  }, []);
  return (
    <>
      <h1 className={classes.txt}>ניהול פניות</h1>
      <div>
        <Button
          className={classes.btnrecommendation}
          variant="contained"
          color="primary"
          onClick={getAllContacts}
        >
          כל הפניות
        </Button>
        <Button
          className={classes.btnrecommendation}
          variant="contained"
          color="primary"
          onClick={() => getContacts(true)}
        >
          פניות שטופלו
        </Button>
        <Button
          className={classes.btnrecommendation}
          variant="contained"
          color="primary"
          onClick={() => getContacts(false)}
        >
          פניות פתוחות
        </Button>
      </div>
      )
      <div className={classes.recommendations}>
        {inquiries.map((item, idx) => {
          return (
            <Inquiry
              item={item}
              key={idx}
              getContacts={() => {
                getContacts(false);
              }}
            />
          );
        })}
      </div>
      {/* {role == 2 && (
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={() => setShowAddRecommendation(true)}
        >
          הוספת המלצה
        </Button>
      )}
      {role == 1 && (
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={saveChanges}
        >
          שמור שינויים
        </Button>
      )}
      <Dialog
        onClose={() => {
          setShowAddRecommendation(false);
        }}
        open={showAddRecommendation}
      >
        <DialogContent className={classes.content}>
          <AddRecommendation ok={(r) => CloseDialog(r)} />
        </DialogContent>
      </Dialog> */}
    </>
  );
}
