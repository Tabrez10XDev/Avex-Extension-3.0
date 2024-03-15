import React from "react";
import { BulbOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import { AptosAccount } from "aptos";
import * as bip39 from "@scure/bip39";
import { bytesToHex } from "viem";
import { derivePath } from "ed25519-hd-key";

const { TextArea } = Input;

function RecoverAccount({ setWallet, setSeedPhrase }) {
  const navigate = useNavigate();
  const [typedSeed, setTypedSeed] = useState("");
  const [nonValid, setNonValid] = useState(false);


  function seedAdjust(e) {
    setNonValid(false);
    setTypedSeed(e.target.value);
  }

  function fromDerivePath(path: string, mnemonics: string) {
    if (!AptosAccount.isValidPath(path)) {
      throw new Error("Invalid derivation path");
    }

    const normalizeMnemonics = mnemonics
      .trim()
      .split(/\s+/)
      .map((part) => part.toLowerCase())
      .join(" ");

    const { key } = derivePath(path, bytesToHex(bip39.mnemonicToSeedSync(normalizeMnemonics)));

    return new AptosAccount(new Uint8Array(key));
  }

  function recoverWallet(){
    // let recoveredWallet;
    // try {
    //   recoveredWallet = ethers.Wallet.fromPhrase(typedSeed);
    // }catch(err){
    //   setNonValid(true);
    //   return;
    // }

    // console.log(recoveredWallet.address);

    const add =  fromDerivePath(
      "m/44'/637'/0'/0'/0'",
      typedSeed 
     ).address().hex()
    console.log(
     add
    );
    

    setSeedPhrase(typedSeed);
    setWallet(add);
    navigate("/yourwallet");
    return;
  }

  return (
    <>
      <div className="content">
        <div className="mnemonic">
          <BulbOutlined rev="" style={{ fontSize: "20px" }} />
          <div>
            Type your seed phrase in the field below to recover your wallet (it
            should include 12 words seperated with spaces)
          </div>
        </div>
        <TextArea
          value={typedSeed}
          onChange={seedAdjust}
          rows={4}
          className="seedPhraseContainer"
          placeholder="Type your seed phrase here..."
        />
        <Button
        disabled={
          typedSeed.split(" ").length !== 12 || typedSeed.slice(-1) === " "
        }
          className="frontPageButton"
          type="primary"
          onClick={() => recoverWallet()}
        >
          Recover Wallet
        </Button>
        {nonValid && <p style={{color: "red"}}> Invalid Seed Phrase</p>}
        <p className="frontPageBottom" onClick={() => navigate("/")}>
          <span>Back Home</span>
        </p>
      </div>
    </>
  );
}

export default RecoverAccount;