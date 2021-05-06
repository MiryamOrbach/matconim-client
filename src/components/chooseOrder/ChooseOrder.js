import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid, Card, CardContent } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import EventType from "../../components/eventType/EventType";
import MenueType from "../menueType/MenueType";
import CountAndExtras from "../countAndExtras/CountAndExtras";
import DoseCategory from "../doseCategory/DoseCategory";
import axios from "../../axios";
import OrderSummary from "../orderSummary/OrderSummary";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "470px",
    maxHeight: "470px",
    overflowY: "auto",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "סוג ארוע",
    "סוג תפריט",
    "מס' מנות ובחירת תוספות",
    "בחירת תפריט והצעת מחיר",
    "סיכום הזמנה ופרטי מזמין",
  ];
}

function getStepContent(stepIndex, handleNext, order, setOrder) {
  const steps = getSteps();
  const events = [
    {
      id: "1",
      name: "בר מצווה",
    },
    {
      id: "2",
      name: "חתונה",
    },
    {
      id: "3",
      name: "שבע ברכות",
    },
    {
      id: "4",
      name: "ארוסין",
    },
    {
      id: "5",
      name: "ברית",
    },
    {
      id: "6",
      name: "שבת",
    },
  ];
  switch (stepIndex) {
    case 0:
      return <EventType order={order} events={events} setOrder={setOrder} />;
    case 1:
      return <MenueType order={order} setOrder={setOrder} />;
    case 2:
      return <CountAndExtras order={order} setOrder={setOrder} />;
    case 3:
      return <DoseCategory order={order} setOrder={setOrder} />;
    case 4:
      return <OrderSummary events={events} />;
    default:
      return "Unknown stepIndex";
  }
}

export default function ChooseOrder(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [finish, setFinish] = useState(false);
  const [order, setOrder] = useState({
    eventName: 0,
    menueType: [
      { id: "1", name: "בשרי", isForShabat: false, checked: false },
      { id: "3", name: "חלבי", isForShabat: false, checked: false },
      { id: "4", name: "ליל שבת", isForShabat: true, checked: false },
      { id: "5", name: "שבת בוקר", isForShabat: true, checked: false },
      { id: "6", name: "סעודה שלישית", isForShabat: true, checked: false },
    ],
    order: {
      count: "",
      type: "1",
      orderDate: null,
      // foodOnly: false,
      // waiters: false,
      // dishesType: 0,
    },
    dishes: [
      {
        id: 1,
        dishes: [],
      },
      {
        id: 2,
        dishes: [],
      },
      {
        id: 3,
        dishes: [],
      },
      {
        id: 4,
        dishes: [],
      },
      {
        id: 5,
        dishes: [],
      },
      {
        id: 6,
        dishes: [],
      },
    ],
    extras: [6],
    idEvent: 0,
  });
  const steps = getSteps();
  const history = useHistory();
  useEffect(() => {
    if (finish) handleNext();
  }, [finish]);
  // useEffect(() => {
  //   if (activeStep === steps.length - 1) {
  //     setFinish(true)
  //     // handleNext()
  //   }
  // }, [academiclServerData])
  function handleNext() {
    window.scrollTo(0, 0);
    if (activeStep === 3) {
      let checked = order.menueType.find((m) => m.checked);
      if (
        order.eventName !== 0 &&
        checked &&
        order.order.count > 0 &&
        order.order.orderDate
      ) {
        let d = [];
        order.dishes.forEach((o) => {
          o.dishes.forEach((oo) => d.push(oo));
        });
        let obj = {
          order: {
            idCustomer: localStorage.getItem("idCustomer"),
            idEvent: order.idEvent,
            dateInsert: new Date(),
            dateOrder: order.order.orderDate,
            nameEvent: order.eventName,
            amount: order.order.count,
          },
          dishes: [...d],
          extras: [...order.extras],
        };
        axios
          .post("saveOrder/add", { ...obj })
          .then((res) => {
            console.log(res);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          })
          .catch((e) => {
            console.log(e);
          });
      } else alert("חסרים פרטים!!");
    } else if (activeStep === 4) {
      printDocument();
    } else setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }
  const printDocument = () => {
    debugger;
    const input = document.getElementById("summary");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    });
  };
  const handleBack = () => {
    window.scrollTo(0, 0);
    if (props.scroll) props.scroll();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Grid container xs={12}>
      {!props.isEdit ? (
        <Grid
          spacing={3}
          item
          xs={12}
          container
          direction="row-reverse"
          justify="center"
        >
          {/* <Grid item>
            <div>
              <img
                style={{ height: 50, width: 50, float: "right" }}
                src={Logo}
              />
            </div>
          </Grid> */}
          <Grid item>
            <Typography variant="h4" color="primary">
              טופס הזמנה
            </Typography>
          </Grid>
        </Grid>
      ) : null}
      <Grid
        item
        xs={12}
        style={{
          marginTop: "3%",
          marginBottom: "3%",
          marginLeft: "13%",
          marginRight: "13%",
        }}
      >
        <Card variant="outlined">
          <CardContent>
            <div className={classes.root}>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                style={{ direction: "rtl" }}
              >
                {steps.map((label, index) => (
                  <Step id={label} key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div>
                {activeStep === steps.length ? (
                  <div>
                    <Typography className={classes.instructions}>
                      ההזמנה נקלטה בהצלחה!! הסיכום נשלח לכתובת המייל שלך{" "}
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <Typography className={classes.instructions}>
                      {getStepContent(activeStep, handleNext, order, setOrder)}
                    </Typography>
                    <Grid
                      item
                      spacing={2}
                      container
                      direction="row"
                      xs={12}
                      justify="center"
                    >
                      <Grid item>
                        <Button
                          disabled={activeStep === 0}
                          variant="outlined"
                          onClick={handleBack}
                          className={classes.backButton}
                        >
                          הקודם
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                        >
                          {activeStep === steps.length - 1 ? "סיום" : "הבא"}
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
