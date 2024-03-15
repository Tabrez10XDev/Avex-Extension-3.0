import React from "react";
import { CaretDoubleLeft, Clock, SlidersHorizontal, CaretDoubleRight, Shield, Bell, MagnifyingGlass, SquaresFour, ChartBar, Package } from "@phosphor-icons/react";
import { useState } from "react";
import QuestCard from "./QuestCard";
import NewsCard from "./NewsCard";
import "./contentScript.css"
import EventCard from "./EventCard";
import { Accordion, AccordionActions, AccordionSummary, AccordionDetails } from "@mui/material";
import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import WebFont from 'webfontloader';
import { useEffect } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";

SwiperCore.use([EffectCoverflow, Autoplay, Pagination]);


function ContentScript() {

    // useEffect(() => {
    //     WebFont.load({
    //       google: {
    //         families: ['Droid Sans', 'Chilanka']
    //       }
    //     });
    //    }, []);

    const [open, setOpen] = useState(true)
    const [currentTab, setCurrentTab] = useState(0)




    return (
        <div style={{ position: 'fixed', right: 0, top: 0, color: 'black', display: 'flex', flexDirection: 'row' }}>

            <button onClick={() => setOpen(!open)} style={{ backgroundColor: 'rgba(255,255,255,0.6)', padding: 8, height: 40, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                {open ? <CaretDoubleRight size={24} /> : <CaretDoubleLeft size={24} />}
            </button>
            {open &&
                <div style={{ backgroundColor: 'white', width: 460, height: '100vh', }}>
                    <div style={{ width: '100%', margin: 'auto' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0px 20px', boxSizing: 'border-box' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                <img style={{ width: 48, height: 48 }} src="https://Tabrez10XDev.github.io/cdn-public/aj_avatar.png" />
                                <div>
                                    <p style={{ color: 'black', lineHeight: 1, fontWeight: '600', marginLeft: 8, marginBottom: 4, fontSize: 16 }}>Aj_24</p>
                                    <p style={{ color: 'grey', lineHeight: 1, fontWeight: '600', marginLeft: 8, marginTop: 6, fontSize: 12 }}>$152.61</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                                <Clock size={24} weight="bold" color="#656565" style={{ marginRight: 20 }} />
                                <Shield size={24} weight="bold" color="#656565" style={{ marginRight: 20 }} />
                                <Bell size={24} weight="bold" color="#656565" style={{ marginRight: 10 }} />

                            </div>


                        </div>

                        <div className="input-container">
                            <input type="text" placeholder="Search" />
                            <span className="icon">
                                <MagnifyingGlass size={16} weight="bold" color="#656565" style={{ marginRight: 0 }} />
                            </span>
                        </div>

                        <div style={{ margin: 'auto', width: '85%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 28 }}>

                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '75%', }}>
                                <div>
                                    <p onClick={() => setCurrentTab(0)} style={{ color: currentTab == 0 ? 'black' : '#979DAA', fontWeight: '600', fontSize: 19, }}>Quest</p>
                                </div>
                                <div>
                                    <p onClick={() => setCurrentTab(1)} style={{ color: currentTab == 1 ? 'black' : '#979DAA', fontWeight: '600', fontSize: 19 }}>Feed</p>
                                </div>
                                <div>
                                    <p onClick={() => setCurrentTab(2)} style={{ color: currentTab == 2 ? 'black' : '#979DAA', fontWeight: '600', fontSize: 19 }}>Events</p>
                                </div>
                                <div>
                                    <p onClick={() => setCurrentTab(3)} style={{ color: currentTab == 3 ? 'black' : '#979DAA', fontWeight: '600', fontSize: 19 }}>NFTs</p>
                                </div>
                            </div>
                            <SquaresFour weight="bold" size={22} color="#979DAA" />
                        </div>


                        {currentTab == 0 &&
                            <>
                                <QuestCard />



                                <div style={{ margin: 'auto', width: '85%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 28 }}>

                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div>
                                            <p onClick={() => { }} style={{ color: true ? 'black' : '#979DAA', fontWeight: '600', fontSize: 16, }}>Trending</p>
                                        </div>
                                        <div>
                                            <p onClick={() => { }} style={{ color: false ? 'black' : '#979DAA', fontWeight: '600', fontSize: 16, paddingLeft: 24 }}>NFTs</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', width: 28, height: 28, backgroundColor: '#f4f4f6', borderRadius: 25, marginRight: 14 }}>
                                            <ChartBar size={16} weight="bold" color="#656565" style={{ marginRight: 0 }} />

                                        </div>
                                        <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', width: 28, height: 28, backgroundColor: '#f4f4f6', borderRadius: 25 }}>
                                            <SlidersHorizontal size={16} weight="bold" color="#656565" style={{ marginRight: 0 }} />

                                        </div>
                                    </div>

                                </div>

                                <div style={{ margin: 'auto', width: '85%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Package size={24} color="#979DAA" weight="bold" />
                                        <p style={{ color: '#979DAA', fontWeight: '500', fontSize: 15, paddingLeft: 4 }}>Trending Collections</p>

                                    </div>
                                    <p style={{ color: '#979DAA', fontWeight: '500', fontSize: 15 }}>Vol</p>

                                </div >

                                <div style={{ margin: 'auto', width: '85%', height: 2, backgroundColor: '#F4F4F6', marginTop: 4 }} />

                                <div style={{ margin: 'auto', width: '85%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <p style={{ color: '#000', fontWeight: '600', fontSize: 19, width: 24 }}>1</p>
                                        <img src="https://images.unsplash.com/photo-1565690929985-864614259ea4?q=80&w=3006&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style={{ width: 52, height: 52, borderRadius: 40 }} />
                                        <div style={{ paddingLeft: 8 }}>
                                            <p style={{ color: '#000', fontWeight: '500', fontSize: 17, paddingBottom: 2 }}>Funky Monkey</p>
                                            <p style={{ color: '#979DAA', fontWeight: '500', fontSize: 15, paddingTop: 2 }}>1024 participants</p>

                                        </div>
                                    </div>
                                    <div style={{ paddingLeft: 8 }}>
                                        <p style={{ color: '#000', fontWeight: '500', fontSize: 17, paddingBottom: 2, textAlign: 'right' }}>$23k</p>
                                        <p style={{ color: '#58BB47', fontWeight: '500', fontSize: 15, paddingTop: 2, textAlign: 'right' }}>64 Points</p>

                                    </div>
                                </div>
                            </>
                        }

                        {
                            currentTab == 1 &&
                            <>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',  overflow: 'scroll' , width:'100%', marginTop:14}}>

                                    <div style={{
                                        marginLeft:20,
                                        background: 'linear-gradient(211deg, #BA61FF 7.7%, #6C34A1 81.21%)',
                                        height: 110, width: 160, borderRadius: 16, padding: '15px 10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between',
                                    }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <img style={{ width: 26, height: 26 }} src="https://Tabrez10XDev.github.io/cdn-public/USD Coin.png"/>
                                            <p style={{ color: 'white', fontWeight: '500', fontSize: 14, paddingLeft: 5 }}>USDC</p>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 160 }}>

                                            <div>
                                                <p style={{ color: '#CFD2D8', fontSize: 12 }}>Prize</p>
                                                <p style={{ color: '#CFD2D8', fontSize: 18 }}>$39,200</p>
                                            </div>
                                            <div style={{ width: 40, height: 20, borderRadius: 6, backgroundColor: '#FFE1E1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                                                <p style={{ color: '#FF6767', fontSize: 8, fontWeight: '600' }}>0.05%</p>

                                            </div>
                                        </div>




                                    </div>
                                    <div style={{
                                        marginLeft:20,
                                        background: 'linear-gradient(211deg, #BA61FF 7.7%, #6C34A1 81.21%)',
                                        height: 110, width: 160, borderRadius: 16, padding: '15px 10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between',
                                    }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <img style={{ width: 26, height: 26 }} src="https://Tabrez10XDev.github.io/cdn-public/USD Coin.png"/>
                                            <p style={{ color: 'white', fontWeight: '500', fontSize: 14, paddingLeft: 5 }}>USDC</p>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 160 }}>

                                            <div>
                                                <p style={{ color: '#CFD2D8', fontSize: 12 }}>Prize</p>
                                                <p style={{ color: '#CFD2D8', fontSize: 18 }}>$39,200</p>
                                            </div>
                                            <div style={{ width: 40, height: 20, borderRadius: 6, backgroundColor: '#FFE1E1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                                                <p style={{ color: '#FF6767', fontSize: 8, fontWeight: '600' }}>0.05%</p>

                                            </div>
                                        </div>




                                    </div>


                                    <div style={{
                                        marginLeft:20,
                                        background: 'linear-gradient(211deg, #BA61FF 7.7%, #6C34A1 81.21%)',
                                        height: 110, width: 160, borderRadius: 16, padding: '15px 10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between',
                                    }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <img style={{ width: 26, height: 26 }} src="https://Tabrez10XDev.github.io/cdn-public/USD Coin.png"/>
                                            <p style={{ color: 'white', fontWeight: '500', fontSize: 14, paddingLeft: 5 }}>USDC</p>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 160 }}>

                                            <div>
                                                <p style={{ color: '#CFD2D8', fontSize: 12 }}>Prize</p>
                                                <p style={{ color: '#CFD2D8', fontSize: 18 }}>$39,200</p>
                                            </div>
                                            <div style={{ width: 40, height: 20, borderRadius: 6, backgroundColor: '#FFE1E1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                                                <p style={{ color: '#FF6767', fontSize: 8, fontWeight: '600' }}>0.05%</p>

                                            </div>
                                        </div>




                                    </div>

                                </div>

                                <div style={{ margin: 'auto', width: '95%', marginTop: 18 }}>
                                    <p style={{color:'black', fontSize:14, fontWeight:'600', paddingLeft:10}}>Today</p>

                                    


                                </div>

                            </>
                        }

                    </div>

                </div>
            }
        </div>
    )
}

export default ContentScript