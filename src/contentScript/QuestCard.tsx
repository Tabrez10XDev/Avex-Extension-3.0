import React from "react";
import { CaretDoubleLeft, Clock, Globe, Square, PaperPlaneTilt, HandCoins, Trophy, Detective, ArrowCircleRight } from "@phosphor-icons/react";
import { useState } from "react";

const QuestCard = ()=>{
    return(
        <div style={{width:460, height:220, position:'relative', marginTop:24, overflow:'hidden'}}>
            <img
            src="https://Tabrez10XDev.github.io/cdn-public/QuestCardBg.png"
                style={{
                    width: '100%', height: 220,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    position: 'absolute',
                    filter: 'blur(20px)',
                    zIndex: 0,
                    top: 0,
                    left: 0,
                    transform: 'scale(1)',

                }}>
            </img>
            {/* <img src="https://Tabrez10XDev.github.io/cdn-public/QuestCardBg.png"/> */}

            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 460,
                    height: 220,
                    zIndex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Adjust the alpha value (0.5 is 50% opacity)
                }}
            ></div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', zIndex: 2, position: 'relative', width:'90%', height:'85%', border:'2px solid white', borderRadius:10, margin:'12px auto', }}>

            <img
            src="https://Tabrez10XDev.github.io/cdn-public/QuestCardBg.png" style={{position:'absolute', top:0, left:0, borderRadius:10, width:"100%", height:'100%', objectFit:'cover'}}/>

                <div style={{display:'flex', flexDirection:'column-reverse', zIndex:100, width:'100%', height:'100%', backgroundColor:'rgba(0,0,0,0.1)'}}>
                        <div style={{display:'flex', flexDirection:'row', width:'90%', margin:'10px auto', backgroundColor:'rgba(255,255,255,0.4)', borderRadius:50, alignItems:'center', justifyContent:'space-between', padding:'6px 10px'}}>
                            <div style={{display:'flex', flexDirection:'row'}}>
                                <div style={{padding:'6px 22px', borderRadius:50, border:'1px solid white', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                        <p style={{color:'white', fontSize:12, fontWeight:'600', lineHeight:1, textAlign:'center'}}>$ 1200<br/>
                                        <span style={{fontSize:8, color:'#DAD8DD', textAlign:'center'}}>Pool</span></p>
                                </div>
                                <div style={{padding:'6px 22px', borderRadius:50, border:'1px solid white', display:'flex', alignItems:'center', justifyContent:'center', marginLeft:6}}>
                                        <p style={{color:'white', fontSize:12, fontWeight:'600', lineHeight:1, textAlign:'center'}}>100<br/>
                                        <span style={{fontSize:8, color:'#DAD8DD', textAlign:'center'}}>Points</span></p>
                                </div>
                            </div>
                            <div style={{backgroundColor:'#4A87F2', borderRadius:60, width:140, height:40, display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <p style={{fontWeight:'600', fontSize:12, color:'white'}}>Start Quest</p>
                                <ArrowCircleRight size={28} weight="bold" color="white" style={{marginLeft:4}} />
                            </div>
                        </div>
                        <p style={{fontWeight:'600', fontSize:16, color:'white', paddingLeft:16}}>Quest: Confirmation of <br/>testnet tasks for public</p>

                </div>

            </div>


        </div>
    )
}

export default QuestCard
