import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Home: React.FC = () => {
    const navigate = useNavigate();

  return (
    <>
      <div className="content">
        <h2> Best Crypto Wallet</h2>
        <h4 className="h4">Secure, Self Custodial, Decentralized</h4>
        <Button
          onClick={() => {
            console.log("heyyy");
            navigate("/yourwallet")}}
            className="frontPageButton"
        >
          Create A Wallet
        </Button>
        <Button
          onClick={() => navigate("/recover")}
          className="frontPageButton"
        >
          Sign In With Seed Phrase
        </Button>
      </div>
    </>
  );
}

export default Home;