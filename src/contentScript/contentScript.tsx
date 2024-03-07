import React from "react";
import { CaretDoubleLeft, Clock, Globe, Square, PaperPlaneTilt, HandCoins, Trophy, Detective, DotsThreeVertical, CaretDown, CaretDoubleRight } from "@phosphor-icons/react";
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
               {open ? <CaretDoubleRight size={24}/> : <CaretDoubleLeft size={24} />}
            </button>
            {open &&
                <div style={{ backgroundColor: 'white', width: 480, height: '100vh', }}>
                    <div style={{ width: '100%', margin: 'auto' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0px 20px', boxSizing: 'border-box' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                                <img style={{ width: 48, height: 48 }} src="https://Tabrez10XDev.github.io/cdn-public/aj_avatar.png" />
                                <div>
                                    <p style={{ color: 'black', lineHeight: 1, fontWeight: '600', marginLeft: 6, marginBottom: 4, fontSize: 16}}>Aj_24</p>
                                    <p style={{ color: 'grey', lineHeight: 1, fontWeight: '600', marginLeft: 6, marginTop: 4, fontSize: 12 }}>$152.61</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                                <Clock size={24} color="grey" style={{ marginRight: 10 }} />
                                <Globe size={24} color="grey" />
                            </div>


                        </div>
                        <h3 style={{ fontSize: 18, fontWeight: '600', paddingLeft: 20, paddingTop: 20 }}>Toolkits</h3>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 10 }}>
                            <div style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: 64, width: 64, borderRadius: 12, boxShadow: '2px 2px 6px rgba(0,0,0,0.2)',
                            }}>
                                <Square size={32} color="grey" />
                            </div>
                            <div style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: 64, width: 64, borderRadius: 12, boxShadow: '2px 2px 6px rgba(0,0,0,0.2)',
                            }}>
                                <PaperPlaneTilt size={32} color="grey" />
                            </div>
                            <div style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: 64, width: 64, borderRadius: 12, boxShadow: '2px 2px 6px rgba(0,0,0,0.2)',
                            }}>
                                <HandCoins size={32} color="grey" />
                            </div>
                            <div style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: 64, width: 64, borderRadius: 12, boxShadow: '2px 2px 6px rgba(0,0,0,0.2)',
                            }}>
                                <Trophy size={32} color="grey" />
                            </div>
                            <div style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: 64, width: 64, borderRadius: 12, boxShadow: '2px 2px 6px rgba(0,0,0,0.2)',
                            }}>
                                <Detective size={32} color="grey" />
                            </div>


                        </div>
                        <Accordion style={{ marginTop: 16 }}>
                            <AccordionSummary
                                expandIcon={<CaretDown size={24} color="black" />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <div>
                                    <h3 style={{ marginTop: 6, fontSize: 18, fontWeight: '600', paddingLeft: 4 }}>Quest</h3>
                                    <p style={{ marginTop: 4, fontWeight: '500', color: '#656565', fontSize: 14, paddingLeft: 4 }}>Choose your following quest to continue</p>
                                </div>


                            </AccordionSummary>
                            <AccordionDetails sx={{ margin: 0 }}>
                                <div className="main-swiper">
                                    <Swiper
                                        effect={"coverflow"}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                        grabCursor={true}
                                        centeredSlides={true}
                                        slidesPerView={"auto"}
                                        coverflowEffect={{
                                            rotate: 50,
                                            stretch: 0,
                                            depth: 100,
                                            modifier: 1,
                                            slideShadows: false,
                                        }}
                                        
                                        pagination={{
                                            clickable: true,
                                            renderBullet: function (index, className) {
                                                return '<span class="' + className  + '"></span>';
                                            },
                                        }}                                        
                                        className="mySwiper"
                                    >
                                        <SwiperSlide key={0}>
                                            <QuestCard />

                                        </SwiperSlide>

                                        <SwiperSlide key={1}>
                                            <QuestCard />

                                        </SwiperSlide>

                                    </Swiper>
                                </div>

                            </AccordionDetails>
                        </Accordion>


                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 'auto', width: '85%', marginTop: 16 }}>
                            <div>
                                <h3 onClick={() => setCurrentTab(0)} style={{ color: currentTab == 0 ? 'black' : '#656565', marginBottom: 6 }}>News</h3>
                                <div style={{ backgroundColor: currentTab == 0 ? 'black' : 'white', height: 4, borderRadius: 10, width: 40, margin: 'auto' }} />
                            </div>
                            <div>
                                <h3 onClick={() => setCurrentTab(1)} style={{ color: currentTab == 1 ? 'black' : '#656565', marginBottom: 6 }}>Events</h3>
                                <div style={{ backgroundColor: currentTab == 1 ? 'black' : 'white', height: 4, borderRadius: 10, width: 40, margin: 'auto' }} />
                            </div>
                            <div>
                                <h3 onClick={() => setCurrentTab(2)} style={{ color: currentTab == 2 ? 'black' : '#656565', marginBottom: 6 }}>NFTs</h3>
                                <div style={{ backgroundColor: currentTab == 2 ? 'black' : 'white', height: 4, borderRadius: 10, width: 40, margin: 'auto' }} />
                            </div>
                        </div>

                        {
                            currentTab == 0 &&
                            <NewsCard />

                        }

                        {
                            currentTab == 1 &&
                            <EventCard />

                        }

                    </div>

                </div>
            }
        </div>
    )
}

export default ContentScript