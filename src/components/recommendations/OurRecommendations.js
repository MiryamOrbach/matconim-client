import React, { useEffect, useState } from "react";
import AddRecommendation from "../addRecommendation/AddRecommendation";
import { Dialog, DialogContent, Button, makeStyles } from "@material-ui/core";
import Recommendation from "../recommendation/Recommendation";
import axios from "../../axios";
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

export default function OurRecommendations() {
  const [showAddRecommendation, setShowAddRecommendation] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [role, setRole] = useState("");
  const [recommendationsToUpdate, setRecommendationsToUpdate] = useState([]);
  const [currenBtn, setCurrentBtn] = useState(1);
  const classes = useStyles();

  const SaveRecommendation = (recommendation) => {
    let recommendationObject = {
      Customer: {
        idCustomer: localStorage.getItem("idCustomer"),
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
      },
      dateR: new Date().toDateString(),
      isDisplay: false,
      textR: recommendation,
    };
    axios
      .post("recommendation/add", { ...recommendationObject })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        alert("ההמלצה לא נשמרה!");
      });
    CloseDialog();
  };
  const CloseDialog = () => {
    setShowAddRecommendation(false);
  };
  const saveChanges = () => {
    let obj = { recommendations: JSON.stringify(recommendationsToUpdate) };
    axios
      .post("recommendation/updateIsDisplay", recommendationsToUpdate)
      .then((res) => {
        console.log("success", res);
        switch (currenBtn) {
          case 1:
            getAllRecommendation();
            break;
          case 2:
            getRecommendation(true);
            break;
          case 3:
            getRecommendation(false);
            break;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getRecommendation = (isDisplay) => {
    setCurrentBtn(isDisplay == true ? 2 : 3);
    axios
      .get(`recommendation/recommendationByIsDisplay/${isDisplay}`)
      .then((res) => {
        console.log("recommendations", res);
        setRecommendations([...res.data]);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const addToSave = (item) => {
    let arr = [...recommendationsToUpdate];
    let arrR = [...recommendations];
    item.isDisplay = !item.isDisplay;
    let index = arr.indexOf(item);
    let indexR = arrR.indexOf(item);
    if (index !== -1) {
      arr[index].isDisplay = item.isDisplay;
    } else {
      arr.push(item);
    }
    arrR[indexR].isDisplay = item.isDisplay;
    setRecommendations(arrR);
    setRecommendationsToUpdate(arr);
  };
  const getAllRecommendation = () => {
    setCurrentBtn(1);
    axios
      .get("recommendation/allRecommendations")
      .then((res) => {
        console.log("recommendations", res);
        setRecommendations([...res.data]);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    let r = localStorage.getItem("role");
    if (r === 1 || r === "1") getAllRecommendation();
    else getRecommendation(true);
    setRole(r);
  }, []);
  return (
    <>
      <h1 className={classes.txt}>המלצות</h1>
      {role == 1 && (
        <div>
          <Button
            className={classes.btnrecommendation}
            variant="contained"
            color="primary"
            onClick={getAllRecommendation}
          >
            כל ההמלצות
          </Button>
          <Button
            className={classes.btnrecommendation}
            variant="contained"
            color="primary"
            onClick={() => getRecommendation(true)}
          >
            המלצות מוצגות
          </Button>
          <Button
            className={classes.btnrecommendation}
            variant="contained"
            color="primary"
            onClick={() => getRecommendation(false)}
          >
            המלצות נסתרות
          </Button>
        </div>
      )}
      <div className={classes.recommendations}>
        {recommendations.map((item, idx) => {
          return (
            <Recommendation
              addToSave={addToSave}
              role={role}
              item={item}
              key={idx}
            />
          );
        })}
      </div>
      {localStorage.getItem("idCustomer") && role == 2 && (
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
          <AddRecommendation
            ok={CloseDialog}
            save={(r) => {
              SaveRecommendation(r);
            }}
            label="המלצה"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
