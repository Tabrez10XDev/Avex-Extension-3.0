import React from "react";
import "./popup.css";
import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import { MemoryRouter as Router } from 'react-router-dom';

// import CreateAccount from "./CreateAccount";
// import RecoverAccount from "./RecoverAccount";
// import WalletView from "./WalletView";
import { CONST } from "../static/assets"
import Moralis from 'moralis';
// import NFTDetails from "./components/NFTDetails";


const Popup: React.FC = () => {



    const [wallet, setWallet] = useState<any>(null);
    const [seedPhrase, setSeedPhrase] = useState<string | null>(null);
    const [selectedChain, setSelectedChain] = useState<string>("0x1");


    //   useEffect(() => {
    //     Moralis.start({
    //       apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImM5Y2M5MGM5LWM5MTctNGRhNC04NjM1LTA1ZThhYmE4OGFkNiIsIm9yZ0lkIjoiMzc4OTM4IiwidXNlcklkIjoiMzg5Mzk0IiwidHlwZUlkIjoiMWE2YTAzZjMtMzVkMS00ZmVkLTk1ZTUtYTQzYWY0YjhiYzU1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDg2MDEwMzgsImV4cCI6NDg2NDM2MTAzOH0.uVrMCyUg84T9VSWl45tmpr7HumcDdHw1lQBnl_G30ko",
    //     });
    //   }, [])

    return (
        <div className="App">
            {/* <header>
      <img src={CONST.LOGO} className="headerLogo" alt="logo" />
      <Select
        onChange={(val) => setSelectedChain(val)}
        value={selectedChain}
        options={[
          {
            label: "Ethereum",
            value: "0x1",
          },
          {
            label: "Mumbai Testnet",
            value: "0x13881",
          },
          {
            label: "Sepolia Testnet",
            value: "0xaa36a7",
          },
        ]}
        className="dropdown"
      ></Select>
    </header> */}
            {wallet && seedPhrase ? (
                	<Router>

                <Routes>
                    <Route
                        path="/yourwallet"
                        element={
                            <Home />
                        }
                    />
                    <Route
                        path="/nftdetails"
                        element={

                            <Home />}
                    />
                </Routes>
                </Router>
            ) : (
                <Router>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/recover"
                        element={
                            <Home />
                        }
                    />
                    <Route
                        path="/yourwallet"
                        element={
                            <Home />
                        }
                    />
                </Routes>
                </Router>
            )}
        </div>
    );
}

export default Popup;