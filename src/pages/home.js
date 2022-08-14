import React from "react";
import Comanda from "../components/Comanda/Comanda";

const Home = ({ setIsLogged }) => {

  return (
    <Comanda setIsLogged={setIsLogged} />
  );
};

export default Home;
