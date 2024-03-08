import React, { useEffect, useState } from "react";
import { Clock, Globe, ArrowUp, Coins, CaretDown, TrendDown, TrendUp, StackSimple, Wallet } from "@phosphor-icons/react";
import Modal from "@material-ui/core/Modal";
import { Radio, Button } from "@mui/material";

const BalanceModal = (props) => {

    const [selectedValue, setSelectedValue] = useState(0)

    return (
        <Modal
            onClose={props.toggle}
            open={props.open}
            style={{
                position: "fixed",
                backgroundColor: "white",
                boxShadow: "2px solid black",
                height: 280,
                width: 300,
                margin: "auto",
                borderRadius: 20
            }}
        >
            <div style={{ backgroundColor: 'white', borderRadius: 20, width: 300, height: 280, padding: 10 }} className="popup">

                <div style={{}} className="popup-content">

                    <p style={{ textAlign: 'left', color: 'black', margin: 0, marginTop: 10, fontWeight: '700', fontSize: 14 }}>Balance</p>
                    {/* <button onClick={props.toggle} style={{ position: "absolute", top: 16, right: 10, color: 'grey' }} className="popup-close-btn">
                        <X size={20} color="black" />
                    </button> */}
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: 'flex-start', marginTop: 14 }}>
                        <Coins size={20} color="#979DAA" />
                        <p style={{ color: 'black', marginLeft: 6, fontWeight: 'bold' }}>Token Balance</p>
                        <Radio
                            checked={props.selectedValue === 0}
                            onChange={() => props.setSelectedValue(0)}
                            value={0}
                            sx={{
                                '&.Mui-checked': {
                                    color: 'black',
                                },
                                padding: 0,
                                position: 'absolute',
                                right: 8
                            }}
                            name="radio-buttons"
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: 'flex-start', marginTop: 14 }}>
                        <StackSimple size={20} color="#979DAA" />
                        <p style={{ color: 'black', marginLeft: 6, fontWeight: 'bold' }}>NFT Balance</p>
                        <Radio
                            checked={props.selectedValue === 1}
                            onChange={() => props.setSelectedValue(1)}
                            value={1}
                            sx={{
                                '&.Mui-checked': {
                                    color: 'black',
                                },
                                padding: 0,
                                position: 'absolute',
                                right: 8

                            }}
                            name="radio-buttons"
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: "flex-start", justifyContent: 'flex-start', marginTop: 14 }}>
                        <Wallet size={20} color="#979DAA" />
                        <p style={{ color: 'black', marginLeft: 6, fontWeight: 'bold' }}>Total Balance</p>
                        <Radio
                            checked={props.selectedValue === 2}
                            onChange={() => props.setSelectedValue(2)}
                            value={2}
                            sx={{
                                '&.Mui-checked': {
                                    color: 'black',
                                },
                                padding: 0,
                                position: 'absolute',
                                right: 8
                            }}
                            name="radio-buttons"
                        />
                    </div>



                    <Button variant="contained"
                    onClick={props.toggle}
                    style={{
                        backgroundColor: 'black', width: '80%', borderRadius: 50, position: 'absolute', bottom: 40, left: '50%',
                        transform: 'translateX(-50%)',
                    }}>Close</Button>



                </div>
            </div>

        </Modal>
    )
}
export default BalanceModal