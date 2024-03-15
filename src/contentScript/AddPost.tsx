import React from "react";
import { CaretDoubleLeft, Clock, Globe, Square, PaperPlaneTilt, HandCoins, Trophy, Detective, ArrowCircleRight } from "@phosphor-icons/react";
import { useState } from "react";
import "./contentScript.css"
import Modal from "@material-ui/core/Modal";
import { Client, auth } from "twitter-api-sdk";

const AddPost = () => {

    const authClient = new auth.OAuth2User({
        client_id: "2CMt2cxEhPjHknh0PlwaCgVXa",
        client_secret: "NCgvlazaHiRDggXSf0c8ry6Wq5FPL1mu9eV0Odsua50aCHUQ5R",
        callback: "http://127.0.0.1:3000/callback",
        scopes: ["tweet.read", "users.read", "offline.access"],
      });

    const twitterClient = new Client(authClient);


    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div
            onClick={() => {
                // handleOpen()
               window.location.href = "https://twitter.com/intent/post?text=Tired%20of%20plaintext%20Download%20Social%20Dash%20Links%20for%20Your%20Content%20%20https%3A%2F%2Favextechnologies.webflow.io%20&original_referer=https%3A%2F%2Favextechnologies.webflow.io/"

            }}
            className="clickable" style={{ height: 45, width: '90%', backgroundColor: 'black', borderRadius: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid white', marginTop: 24 }}>
            <p style={{ color: 'white', lineHeight: 1, fontWeight: '600', fontSize: 14, }}>Dash Post</p>
            <Modal
                onClose={handleClose}
                open={open}
                style={{
                    position: "absolute",
                    border: "2px solid #000",
                    backgroundColor: "lightgray",
                    boxShadow: "2px solid black",
                    height: 150,
                    width: 240,
                    margin: "auto",
                    padding: "2%",
                    color: "white",
                }}
            >
                <>
                    <h2>GFG</h2>
                    <p>A computer science portal!</p>
                </>
            </Modal>


        </div>
    )
}

export default AddPost
