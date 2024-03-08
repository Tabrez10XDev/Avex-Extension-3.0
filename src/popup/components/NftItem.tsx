import React from "react";
import { CONST } from "../../static/assets"
import { CaretDown } from "@phosphor-icons/react";
import "../popup.css"

const NftItem = (props) => {
    return (
        <div onClick={props.onclick} style={{width:"40vw"}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 8 }}>
                    <img style={{ height: "100%", width: '100%', borderRadius:8, objectFit:'cover'}} src={props.url} />
                    <div>
                        <p style={{ fontWeight: 'bold', textAlign:'left' }}>{props.name}</p>
                        <p style={{ marginTop: 4,  textAlign:'left' }}>{props.slug}</p>
                    </div>

            </div>
            
        </div>

    )
}


export default NftItem