import { CardContent, Card, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Document, Page, Text, View, StyleSheet , ReactPDF} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

export default function OrderSummary(props) {
  const [summary, setSummary] = useState({});
  const [name, setName] = useState("");
  useEffect(() => {
    axios
      .get(`saveOrder/getOrder/${localStorage.getItem("idCustomer")}`)
      .then((res) => {
        console.log(res);
        setSummary(res.data);
        setName(props.events.find((n) => n.id == res.data.nameEvent).name);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    ReactPDF.renderToStream()
    <Document>

      {summary.Customer && (
        <div id="summary">
          <h1>סיכום הזמנה</h1>
          <h3>פרטים ליצירת קשר</h3>
          <div>
            <Typography color="textSecondary" gutterBottom>
              {` שם פרטי:${summary.Customer.firstName}`}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {` שם משפחה:${summary.Customer.lastName}`}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {` טלפון:${summary.Customer.tel}`}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {` מייל:${summary.Customer.email}`}
            </Typography>
          </div>
          <h3>פרוט ההזמנה</h3>
          <div>
            <Typography color="textSecondary" gutterBottom>
              {` שם הארוע:${name}`}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {` תאריך הארוע:${new Date(
                summary.dateOrder
              ).toLocaleDateString()}`}
            </Typography>
            <div>
              <h4>תפריט שנבחר:</h4>
              <div>
                {summary.dishes.map((d, idx) => {
                  return (
                    <div>
                      <h5>{d.statusDoseName}</h5>
                      <ul>
                        {d.Dishes.map((dish, i) => {
                          return (
                            <li>{`${dish.doseName} ${
                              dish.doseDescription !== null
                                ? dish.doseDescription
                                : ""
                            }`}</li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
            <h3>הארוע כולל</h3>
            <ul>
              {summary.extras.map((e, i) => {
                return <li>{e.extra.nameExtra}</li>;
              })}
            </ul>
            <Typography color="textSecondary" gutterBottom>
              {`סה"כ לתשלום: ${summary.TotalPrice}`}
            </Typography>
          </div>
        </div>
      )}
    </Document>
  );
}
