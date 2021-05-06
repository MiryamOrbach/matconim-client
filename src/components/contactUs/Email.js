import React from "react";

export default function Email(props) {
  return (
    <div>
      <h1>{` שלום ${props.firstName} ${props.lastName}`}</h1>
      <p style={{ fontWeight: "bold", color: "black" }}>בהקשר להודעתך:</p>
      <p>{props.textC}</p>
      <p style={{ fontWeight: "bold", color: "black" }}>תשובתנו:</p>
      {props.txt.split("\n").map((i, key) => {
        return <div key={key}>{i}</div>;
      })}{" "}
      {/* <Link>miri.orbach23@gmail.com</Link> */}
    </div>
  );
}
