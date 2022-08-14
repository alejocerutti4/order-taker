import { styled } from "@mui/system";
import React from "react";
import { ClimbingBoxLoader } from "react-spinners";

const Overlay = styled('div')({
  position: "fixed",
  width: "100%",
  height: "100%",
  left: "0",
  top: "0",
  zIndex: "9999",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#510029",
  opacity: "1",
  backgroundImage: "radial-gradient(#444cf7 0.5px, #510029 0.5px)",
  backgroundSize: "10px 10px"

});

const Loader = () => (
  <Overlay>
    <ClimbingBoxLoader
      color="#FFE4C4"
      speedMultiplier={1.5}
      size={30}
    />
  </Overlay>
);
export default Loader;


