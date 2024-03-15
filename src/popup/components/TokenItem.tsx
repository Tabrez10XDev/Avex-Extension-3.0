import React from "react";
import { CONST } from "../../static/assets"
import { CaretDown } from "@phosphor-icons/react";
import "../popup.css"

const TokenItem = (props) => {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <img style={{ height: 36, width: 36, marginRight: 10 }} src={props.logo_url} />
                    <div>
                        <p style={{ fontWeight: 'bold', textAlign:'left' }}>{props.name}</p>
                        <p style={{ marginTop: 4,  textAlign:'left' }}>{props.amount}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <div>
                        <p style={{ fontWeight: 'bold'}}>{props.price ? `$${parseFloat(props.price).toFixed(4)}` : "NA"}</p>
                        <p style={{ marginTop: 4, textAlign:'right' }}>{props.change24h_price}%</p>
                    </div>
                    <CaretDown style={{ marginLeft: 4 }} size={16} />
                </div>

            </div>
            <div className="border" />
        </>

    )
}


export default TokenItem