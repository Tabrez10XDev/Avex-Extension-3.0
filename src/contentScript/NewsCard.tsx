import React from "react";
import { CaretLeft, CaretRight, Share, ChatCircle, Eye, Heart, Plus, Scroll, Hash, User, Asterisk, Link, DotsThreeVertical, Dot } from "@phosphor-icons/react";

const NewsCard = ()=>{
    return(
        <div style={{ width: '95%', margin: 'auto', display: 'flex', flexDirection: 'row', marginTop:10 }}>
          <img style={{ width: 45, height: 45 }} src="https://Tabrez10XDev.github.io/cdn-public/aj_avatar.png" />
          <div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', padding: '0px 10px' }}>
              <p style={{ marginLeft: 0, marginTop:0, marginBottom:0 , color:'black', fontWeight:'700', fontSize:15}}>Ammar Ceker</p>
              <p style={{ color: 'grey', marginLeft: 6, marginTop:0, marginBottom:0 }}>@Ammarceker</p>
              <Dot style={{marginBottom: 0}} size={24} color='grey' />
              <p style={{ color: 'grey', marginLeft: 4, marginTop:0, marginBottom:0 }}>35d</p>

            </div>
            <p style={{ color: '#656565', marginLeft: 10, textAlign: 'left', marginTop:6, marginBottom:0, fontWeight:'600' }}>Exclusive NFT Whitelist Giveaway</p>
            <p style={{ color: '#656565', marginLeft: 10, textAlign: 'left', marginTop:0, fontWeight:'600', marginBottom:0 }}>In honor of the special collaboration between BlueMove and <span style={{ textDecoration: 'underline' }}>@AriesMarkets</span></p>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', padding: '10px 10px' }}>

              <div style={{ display: 'flex', flexDirection: 'row', alignItems:'center' }}>
                <ChatCircle size={20} color='#656565' />
                <p style={{ color: 'grey', marginLeft: 2, textAlign: 'left' }}>3</p>
              </div>


              <div style={{ display: 'flex', flexDirection: 'row', alignItems:'center', marginLeft:28}}>
                <ChatCircle size={20} color='#656565' />
                <p style={{ color: 'grey', marginLeft: 2, textAlign: 'left' }}>3</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', alignItems:'center', marginLeft:28 }}>
                <ChatCircle size={20} color='#656565' />
                <p style={{ color: 'grey', marginLeft: 2, textAlign: 'left' }}>3</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', alignItems:'center', marginLeft:28 }}>
                <ChatCircle size={20} color='#656565' />
                <p style={{ color: 'grey', marginLeft: 2, textAlign: 'left' }}>3</p>
              </div>
            </div>
          </div>

        </div>
    )
}

export default NewsCard