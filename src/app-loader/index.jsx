import React, { useEffect } from "react";
import Lottie from "react-lottie-player";
import animationData from "../loadingAnimation.json";

const LoadingAnimation = () => {
  //   useEffect(() => {
  //     // Add overflow: hidden to the body when the component mounts
  //     document.body.style.overflow = "hidden";

  //     return () => {
  //       // Reset overflow to auto when the component unmounts
  //       document.body.style.overflow = "auto";
  //     };
  //   }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <Lottie
        loop
        animationData={animationData}
        play
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
};

export default LoadingAnimation;
