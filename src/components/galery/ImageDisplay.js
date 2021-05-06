import React, { useEffect, useRef, useState } from "react";
export default function ImageDisplay(props) {
  const [spans, setSpans] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const myImg = useRef();

  const setSpan = () => {
    const sp = Math.ceil(myImg.current.clientHeight);
    setSpans(sp);
    setIsShow(true);
    // console.log("img" + props.img + "  spans  " + sp);
  };
  useEffect(() => {
    myImg.current.addEventListener("load", setSpan);
  }, []);
  return (
    <>
      {/* <img
          style={{ gridRowEnd: `span ${props.item.spans}` }}
          src={require("../../assets/אוכל/" + props.item.img)}
          ref={myImg}
        /> */}
      <img
        style={{
          visibility: isShow ? "visible" : "hidden",
          gridRowEnd: `span ${spans}`,
        }}
        src={require("../../assets/אוכל/" + props.item)}
        ref={myImg}
      />
    </>
  );
}
