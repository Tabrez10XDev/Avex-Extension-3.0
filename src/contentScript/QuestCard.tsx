import React from "react";
import { CaretDoubleLeft, Clock, Globe, Square, PaperPlaneTilt, HandCoins, Trophy, Detective, DotsThreeVertical } from "@phosphor-icons/react";
import { useState } from "react";

const QuestCard = ()=>{
    return(
        <div style={{ backgroundColor: 'black', borderRadius: 12, width: '85%',  position: 'relative', margin: '15px auto', }}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', padding: '10px 20px',}}>
            <img style={{ width: 24, height: 24 }} src="https://Tabrez10XDev.github.io/cdn-public/aj_avatar.png" />
            <h4 style={{ color: 'white', marginLeft: 6, fontSize:16, fontWeight:'600' }}>Ammar Ceker</h4>
            <p style={{ color: '#8899A6', marginLeft: 4, fontSize:14 }}>@Ammarceker</p>
        </div>
        <div style={{ position: 'absolute', top: 16, right: 16 }}>
            <DotsThreeVertical color='#979DAA' size={24} />
        </div>

        <p style={{ color: '#656565', marginTop: 10, textAlign: 'left', marginBottom: 0, fontSize: 14, marginLeft: 20 }}>
            Exclusive <span style={{ fontWeight: '500', color:'#979DAA' }}>Quest White Giveaway </span><span style={{ textDecoration: 'underline' , color:'#979DAA' }}>: @AriesMarkets🐐</span>
        </p>
        <p style={{ color: '#656565',  textAlign: 'left', marginTop: 5, fontSize: 14, marginLeft: 20 }}>
            Complete the task to get shortlisted.
        </p>

        <div style={{ backgroundColor: '#363636', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, position: 'relative', padding: '10px 20px', marginTop:20 }}>
            <p style={{ color: 'white', textAlign: 'left', margin: 0, paddingTop: 6, fontSize:16, fontWeight:'600' }}>Nemesis Genesis Quest - Testnet quest</p>
            <p style={{ color: '#656565',textAlign: 'left', marginTop: 4 , fontSize:12, fontWeight:'300'}}>By Nemesis ✔</p>
        </div>

    </div>
    )
}

export default QuestCard