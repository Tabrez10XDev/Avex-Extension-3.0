import React from "react";
import { Button, Card } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import { english, generateMnemonic, mnemonicToAccount } from 'viem/accounts'
import { Aptos, Network, AptosConfig } from "@aptos-labs/ts-sdk";
import { AptosAccount } from "aptos";
import * as bip39 from "@scure/bip39";
import { bytesToHex } from "viem";
import { derivePath } from "ed25519-hd-key";



function CreateAccount({ setWallet, setSeedPhrase }) {

  const aptosConfig = new AptosConfig({ network: Network.TESTNET }); // default to devnet
  const aptos = new Aptos(aptosConfig);




  const [newSeedPhrase, setNewSeedPhrase] = useState(null);
  const navigate = useNavigate();

  function generateWallet() {
    const mnemonic = generateMnemonic(english)
    setNewSeedPhrase(mnemonic)
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

   function setWalletAndMnemonic() {
    setSeedPhrase(newSeedPhrase);
    const add =  fromDerivePath(
      "m/44'/637'/0'/0'/0'",
      newSeedPhrase 
     ).address().hex()
    console.log(
     add
    );

    chrome.storage.local.set({ "avexAdd": add }, function(){
      setWallet(add)
  });
    
    // setWallet(mnemonicToAccount(newSeedPhrase).address)
  }


  return (
    <>
      <div className="content">
        <div className="mnemonic">
          <ExclamationCircleOutlined rev="" style={{ fontSize: "20px" }} />
          <div>
            Once you generate the seed phrase, save it securely in order to
            recover your wallet in the future.
          </div>
        </div>
        <Button
          className="frontPageButton"
          type="primary"
          onClick={() => generateWallet()}
        >
          Generate Seed Phrase
        </Button>
        <Card className="seedPhraseContainer">
          {newSeedPhrase && <pre style={{ whiteSpace: "pre-wrap" }}>{newSeedPhrase}</pre>}
        </Card>
        <Button
          className="frontPageButton"
          type="default"
          onClick={() => setWalletAndMnemonic()}
        >
          Open Your New Wallet
        </Button>
        <p className="frontPageBottom" onClick={() => navigate("/")}>
          Back Home
        </p>
      </div>
    </>
  );
}

export default CreateAccount;