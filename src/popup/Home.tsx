import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="content">
      <img style={{ width: 55, height: 55, marginTop:18 }} src="https://Tabrez10XDev.github.io/cdn-public/avex_logo.png" />
      <p style={{fontWeight:'600', fontSize:24, marginTop:30}}>Let's get started</p>
      <p style={{fontWeight:'500', fontSize:16, marginTop:10, color:'#979DAA', textAlign:'left'}}>Sign up or recover your wallet by entering your email below</p>
      <Button variant="contained" sx={{
        '&:hover': {
          backgroundColor: '#000',
          color: '#fff',
        },
        width:'90%', height:45, backgroundColor:'black', borderRadius:45, position:'absolute', bottom:80, margin:'auto', textTransform: 'none'}}>
        <p style={{color:'white', fontStyle:'italic'}}>Create you a new wallet</p>
      </Button>
      <Button variant="contained" sx={{
            '&:hover': {
              backgroundColor: '#f4f4f6',
              color: 'black',
            },
        width:'90%', height:45, backgroundColor:'#f4f4f6', borderRadius:45, alignSelf:'flex-end', position:'absolute', bottom: 20, margin:'auto', textTransform: 'none'}}>
        <p style={{color:'black', fontStyle:'italic'}}>I already have a wallet</p>
      </Button>
    </div>  
  );
}


{/* <h2> Best Crypto Wallet</h2>
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
        </Button> */}

export default Home;