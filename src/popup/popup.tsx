import React from "react";
import "./popup.css";
import { useState, useEffect } from "react";
import { Routes, Route, HashRouter as Router } from "react-router-dom";
import Home from "./Home";
import { MemoryRouter  } from 'react-router-dom';

import CreateAccount from "./CreateAccount";
import RecoverAccount from "./RecoverAccount";
import WalletView from "./WalletView";
import { CONST } from "../static/assets"
import Moralis from 'moralis';
import NFTDetails from "./components/NFTDetails";


const Popup: React.FC = () => {



    const [wallet, setWallet] = useState<any>(null);
    const [seedPhrase, setSeedPhrase] = useState<string | null>(null);
    const [selectedChain, setSelectedChain] = useState<string>("0x1");

    chrome.storage.local.get(["avexAdd"], function(items){

        if(items['avexAdd']){
            setSeedPhrase("Auth")
            setWallet(items['avexAdd'])
        }
    });


    useEffect(() => {
        Moralis.start({
            apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImM5Y2M5MGM5LWM5MTctNGRhNC04NjM1LTA1ZThhYmE4OGFkNiIsIm9yZ0lkIjoiMzc4OTM4IiwidXNlcklkIjoiMzg5Mzk0IiwidHlwZUlkIjoiMWE2YTAzZjMtMzVkMS00ZmVkLTk1ZTUtYTQzYWY0YjhiYzU1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDg2MDEwMzgsImV4cCI6NDg2NDM2MTAzOH0.uVrMCyUg84T9VSWl45tmpr7HumcDdHw1lQBnl_G30ko",
        });
    }, [])

    return (
        <div className="App">
           
            {wallet && seedPhrase ? 
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <WalletView
                                    wallet={wallet}
                                    setWallet={setWallet}
                                    seedPhrase={seedPhrase}
                                    setSeedPhrase={setSeedPhrase}
                                    selectedChain={selectedChain}
                                />
                            }
                        />
                        <Route
                            path="/yourwallet"
                            element={
                                <WalletView
                                    wallet={wallet}
                                    setWallet={setWallet}
                                    seedPhrase={seedPhrase}
                                    setSeedPhrase={setSeedPhrase}
                                    selectedChain={selectedChain}
                                />
                            }
                        />
                        <Route
                            path="/nftdetails"
                            element={
                                <NFTDetails />
                            }
                        />
                    </Routes> 
                     : 
                     
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/recover"
                            element={
                                <RecoverAccount
                                    setSeedPhrase={setSeedPhrase}
                                    setWallet={setWallet}
                                />
                            }
                        />
                        <Route
                            path="/yourwallet"
                            element={
                                <CreateAccount
                                    setSeedPhrase={setSeedPhrase}
                                    setWallet={setWallet}
                                />
                            }
                        />
                    </Routes>
                    
}
            
        </div>
    );
}

export default Popup;