import React from "react";
import { CalendarBlank, DotsThree, ArrowCircleRight } from "@phosphor-icons/react";

const EventCard = ()=>{
    return(
        <div style={{ width: '90%', height: 180, borderRadius: 20, backgroundColor: 'black', position: 'relative',margin:'20px auto' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', padding:16  }}>
            <CalendarBlank size={20} color='#979DAA' />
            <p style={{ color: 'white', fontWeight: '600', marginLeft:10 }}>
              Tomorrow at 5.30 AM
            </p>
            <div style={{ position: 'absolute', right: 16, top: 14 }}>
              <DotsThree size={30} color='white' />
            </div>
          </div>
          <p style={{ color: 'white', fontWeight: '700', marginTop:16, fontSize:24, textAlign:'left', marginLeft:16 }}>
              State of the Aptos:<br/>Friday with Friends
            </p>
            <div style={{marginTop:20, backgroundColor:'#373737', borderBottomLeftRadius:20, borderBottomRightRadius:20, padding:'10px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', flexDirection:'row'}}>
               <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
               <img style={{ width: 30, height: 30 }} src="https://Tabrez10XDev.github.io/cdn-public/aj_avatar.png" />

               <p style={{color:'white', fontSize:16, fontWeight:'600', marginLeft:8}}>Aj_22</p>
                <div style={{marginLeft:6, backgroundColor:'#878787', padding:6, borderRadius:5}}>
                    <p style={{color:'white', fontSize:12}}>Host</p>
                </div>
               </div>

               <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'row', padding:'6px 10px', borderRadius:16, backgroundColor:'white'}}>
               <p style={{color:'black', fontSize:12, fontWeight:'600'}}>Join Now</p>
                <ArrowCircleRight size={20}/>
               </div>
               
            </div>  
        </div>
    )
}

export default EventCard