import React from "react";

import Wrapper from "./style";
import Icons from "../../icon";
import loadImage from "../../../public/output-onlinegiftools.gif";

const PageLoader = () => {
  return (
    <Wrapper
      style={{
        margin: "auto",
        position: "absolute",
        inset: 0,
        width: "fit-content",
        height: "fit-content",
        display: "grid",
        justifyItems: "center",
      }}
    >
      <Icons type="MainLoading" />{" "}
      <img
        src={loadImage}
        // src="/public/output-onlinegiftools.gif"
        onError={(e) => {
          e.target.src =
            "http://accordelectrotechnics.in/img/product/no-preview/no-preview.png";
        }}
        loading="lazy"
      />
    </Wrapper>
  );
};
export default PageLoader;
