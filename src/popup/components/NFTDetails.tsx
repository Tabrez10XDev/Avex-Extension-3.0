import React, { useEffect, useState } from "react";

import { CaretLeft, CaretRight, Share, ChatCircle, Eye, Heart, Plus, ShareNetwork, Scroll, Hash, User, Asterisk, Link } from "@phosphor-icons/react";
import "../popup.css"
import { useLocation, useNavigate } from "react-router-dom";

interface LocationState {
    state: {
        media_url: string,
        name: string;
        collection: {
            title: String;
            description: String;
        };


    };
  }

const NFTDetails: React.FC = (props) => {


    const { state } = useLocation() as LocationState
    const [currentStack, setCurrentStack] = useState(0)
    const navigate = useNavigate();

    return (
        <div style={{}}>
            <div
                style={{
                    height: '100%', width: '100%',
                    backgroundImage: "url(" + state.media_url + ")",
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
            </div>

            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Adjust the alpha value (0.5 is 50% opacity)
                }}
            ></div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', zIndex: 2, position: 'relative', }}>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', margin: '10px auto' }}>
                    <CaretLeft onClick={() => navigate(-1)} color='white' size={20} />
                    <h4 style={{ color: 'white', textDecorationLine: 'underline', fontWeight:'700' }}>{state.collection.title}</h4>
                    <CaretRight color='white' size={20} style={{opacity:0}} />
                </div>

                <img style={{ width: '70%', objectFit: 'contain', borderRadius: 24, height: '50%' }} src={state.media_url} />
               
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', padding: 8, width: '80%' }}>
                    <div>
                        <h3 style={{ color: 'white', margin: 0, textAlign: 'left', fontWeight: 'bold', fontSize: 14 }}>{state.name}</h3>
                        <p style={{ color: 'white', margin: 4, textAlign: 'left' }}>Created on 2nd Jan 2023</p>
                    </div>
                    <ShareNetwork color='white' size={20} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', width: '80%', margin: 'auto auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <ChatCircle color='white' size={20} />
                        <p style={{ color: 'white', marginLeft: 4 }}>23</p>
                        <Eye color='white' size={20} style={{ marginLeft: 8 }} />
                        <p style={{ color: 'white', marginLeft: 4 }}>4.3k</p>

                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 10, padding: '8px 12px' }}>
                        <Heart color='white' size={20} style={{ marginRight: 2 }} />
                        <p style={{ color: 'white' }}>2.3k</p>

                    </div>
                </div>

                <div style={{ backgroundColor: 'white', width: '92%', alignSelf: 'center', borderRadius: 10, padding: 8, flexDirection: 'column', display: 'flex', margin: 'auto auto', marginTop: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'grey', margin: '6px 0px' }}>Last Sale</p>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <img style={{ objectFit: 'cover', width: 24, height: 24 }} src='https://Tabrez10XDev.github.io/cdn-public/aptos.png' />
                                <h4 style={{ margin: '0px 8px' }}>0.03</h4>
                            </div>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'grey', margin: '6px 0px' }}>Floor Price</p>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <img style={{ objectFit: 'cover', width: 24, height: 24 }} src='https://Tabrez10XDev.github.io/cdn-public/aptos.png' />
                                <h4 style={{ margin: '0px 8px' }}>0.012</h4>
                            </div>
                        </div>

                    </div>


                    <div className="border"></div>

                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>

                        <div style={{ borderRadius: 40, padding: 16, backgroundColor: '#2071EE', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                            <Plus color='white' size={20} />
                        </div>

                        <button style={{ padding: "16px 80px", backgroundColor: 'black', borderRadius: 26, color: 'white' }}>
                            Buy Eth
                        </button>

                    </div>
                </div>


                <div style={{ width: '100%', backgroundColor: 'white', paddingTop: 16 }}>
                    <div style={{ width: '80%', margin: 'auto auto', borderRadius: 20, backgroundColor: '#E9E9E9', justifyContent: 'space-evenly', alignItems: 'center', display: 'flex', flexDirection: 'row', height: 30, marginTop: 20 }}>
                        <div onClick={() => setCurrentStack(0)} className={currentStack == 0 ? "nft-details-selected" : "nft-details-unselected"}>
                            About
                        </div>

                        <div onClick={() => setCurrentStack(1)} className={currentStack == 1 ? "nft-details-selected" : "nft-details-unselected"}>
                            History
                        </div>

                        <div onClick={() => setCurrentStack(2)} className={currentStack == 2 ? "nft-details-selected" : "nft-details-unselected"}>
                            Open
                        </div>

                    </div>


                </div>

                {
                    currentStack == 0 &&
                    <div style={{ backgroundColor: 'white', paddingTop: 10 }}>

                        <h3 style={{ textAlign: 'left', margin: 0, paddingLeft: 6, fontSize: 16, alignSelf: 'flex-start' }}>
                            Description
                        </h3>

                        <p style={{  color: 'grey', marginTop: 4, textAlign: 'left', paddingLeft: 6 }}>
                            {state.collection.description}
                        </p>

                        <h3 style={{ textAlign: 'left', margin: 0, marginTop: 10, alignSelf: 'flex-start', paddingLeft: 6, fontSize: 16 }}>
                            LINKS
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 8, overflowX: 'scroll' }}>
                            <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: '#F4F4F6', display: 'flex', flexDirection: 'row' }}>
                                <p>Twitter</p>
                            </div>

                            <div style={{ padding: '8px 10px', borderRadius: 10, backgroundColor: '#F4F4F6', display: 'flex', flexDirection: 'row', marginLeft: 8 }}>
                                <p>Facebook</p>
                            </div>
                        </div>

                        <h3 style={{ textAlign: 'left', margin: 0, marginTop: 10, alignSelf: 'flex-start', paddingLeft: 6, fontSize: 16 }}>
                            ATTRIBUTES
                        </h3>


                        <div style={{ whiteSpace: 'nowrap', overflowX: 'auto', width: 350 }}>

                            <div style={{ flexShrink: 0, width: 150, padding: '8px 10px', borderRadius: 10, backgroundColor: '#F4F4F6', display: 'inline-block', margin: '0px 8px' }}>
                                <p style={{ color: 'grey', margin: '10px 0px' }}>Body</p>
                                <p style={{ color: 'black', margin: '10px 0px' }}>56% Yellow Cat</p>
                            </div>
                            <div style={{ flexShrink: 0, width: 150, padding: '8px 10px', borderRadius: 10, backgroundColor: '#F4F4F6', display: 'inline-block', margin: '0px 8px' }}>
                                <p style={{ color: 'grey', margin: '10px 0px' }}>Eyes</p>
                                <p style={{ color: 'black', margin: '10px 0px' }}>23% Bloody</p>
                            </div>
                            <div style={{ flexShrink: 0, width: 150, padding: '8px 10px', borderRadius: 10, backgroundColor: '#F4F4F6', display: 'inline-block', margin: '0px 8px' }}>
                                <p style={{ color: 'grey', margin: '10px 0px' }}>Soul</p>
                                <p style={{ color: 'black', margin: '10px 0px' }}>33% Gaaju</p>
                            </div>
                            <div style={{ flexShrink: 0, width: 150, padding: '8px 10px', borderRadius: 10, backgroundColor: '#F4F4F6', display: 'inline-block', margin: '0px 8px' }}>
                                <p style={{ color: 'grey', margin: '10px 0px' }}>Soul</p>
                                <p style={{ color: 'black', margin: '10px 0px' }}>33% Gaaju</p>
                            </div>

                        </div>

                        <h3 style={{ margin: 0, marginTop: 6, textAlign: 'left', paddingLeft: 6, alignSelf: 'flex-start', fontSize: 16 }}>
                            ADDITIONAL INFO
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <Scroll color='grey' size={20} />
                                <p style={{ color: 'grey', marginLeft: 8, margin:'auto' }}>Contract</p>

                            </div>
                            <p style={{ color: 'black', margin: '10px 0px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>0x232288282828282123232</p>

                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <Hash color='grey' size={20} />
                                <p style={{ color: 'grey', marginLeft: 8,margin:'auto' }}>Token ID</p>

                            </div>
                            <p style={{ color: 'black', margin: '10px 0px' }}>7384</p>

                        </div>


                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <User color='grey' size={20} />
                                <p style={{ color: 'grey', marginLeft: 8,margin:'auto' }}>Previous Owners</p>

                            </div>
                            <p style={{ color: 'black', margin: '10px 0px' }}>4</p>

                        </div>


                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <Link color='grey' size={20} />
                                <p style={{ color: 'grey', marginLeft: 8, margin:'auto' }}>Chain</p>

                            </div>
                            <p style={{ color: 'black', margin: '10px 0px' }}>Aptos</p>

                        </div>


                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <Asterisk color='grey' size={20} />
                                <p style={{ color: 'grey',  marginLeft: 8, margin:'auto' }}>Token Standard</p>

                            </div>
                            <p style={{ color: 'black', margin: '10px 0px' }}>ERC-721</p>

                        </div>

                    </div>
                }

                {
                    currentStack == 1 &&
                    <div style={{ backgroundColor: 'white', paddingTop: 10 }}>
                        <h3 style={{ textAlign: 'left', margin: 0, paddingLeft: 6, fontSize: 16, alignSelf: 'flex-start' }}>
                            Today
                        </h3>


                    </div>

                }



            </div>


        </div>
    );
}

export default NFTDetails;