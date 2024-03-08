import React from "react";
import { CONST } from "../../static/assets"
import { CaretDown, MagicWand } from "@phosphor-icons/react";
import "../popup.css"

const NFTHistoryItem = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: 10, justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>


                <div style={{ display: 'flex', position: 'relative', width: 50, height: 50, alignSelf: 'center', justifyContent: 'center' }}>
                    <img style={{ borderRadius: 8, height: 40, width: 40, backgroundColor: 'green' }} src='https://byzantion.mypinata.cloud/ipfs/bafybeifdgnv4bhla3m6zpp2cb5thpl4l2a7gqyrpxhr6lwtknipbbbucha/3098' />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#58BB47', height: 20, width: 20, borderRadius: 20, position: 'absolute', top: -5, left: 0 }}>
                        <MagicWand size={12} color='white' />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 30, marginTop: -5 }}>
                    <p style={{ alignSelf: "flex-start", display: "flex", margin: 0, color: '#646D80', fontSize: 14 }}><span style={{ color: 'black' }}>Minted</span> Death #98923</p>
                    <p style={{ alignSelf: "flex-start", display: "flex", margin: 0, color: '#646D80', fontSize: 14 }}>from <span style={{ color: 'black' }}>Opensea</span></p>
                </div>

            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 38, marginTop: -8, alignItems: 'end' }}>
                <p style={{ alignSelf: "flex-start", display: "flex", margin: 0, color: '#58BB47', fontSize: 14, textAlign: 'right' }}>+0.232002 APT</p>
                <p style={{ alignSelf: "flex-end", display: "flex", margin: 0, color: '#646D80', fontSize: 12, textAlign: 'right' }}>2mins ago</p>

            </div>

        </div>
    )
}

export default NFTHistoryItem