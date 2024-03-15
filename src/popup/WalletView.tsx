import React, { useEffect, useState } from "react";
import {
  Divider,
  Tooltip,
  List,
  Avatar,
  Spin,
  Tabs,
  Input,
  Button,
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CHAINS_CONFIG } from "./CHAINS_CONFIG";
import { ethers } from "ethers";
import { CONST, COLORS } from "../static/assets"
import { http, createPublicClient } from 'viem'
import {
  sepolia
} from 'viem/chains'
import { publicActionCovalent } from '@covalenthq/client-viem-sdk'
import { Clock, Globe, ArrowUp, Plus, MagnifyingGlass, ArrowDown, CaretDoubleDown, ArrowsClockwise, PaperPlaneTilt, CaretDoubleUp, Copy, EyeSlash, DotsThreeVertical, CaretDown, TrendDown, TrendUp } from "@phosphor-icons/react";
import TokenItem from "./components/TokenItem";
import NftItem from "./components/NftItem";
import Moralis from "moralis";
import Modal from "@material-ui/core/Modal";
import SortModal from "./components/SortModal";
import BalanceModal from "./components/BalanceModal";

function WalletView({
  wallet,
  setWallet,
  seedPhrase,
  setSeedPhrase,
  selectedChain,
}) {

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  }).extend(publicActionCovalent("cqt_rQGVbrdcw3Q9pVJB9cjrqRqmGp8q"));

  const navigate = useNavigate();
  const [tokens, setTokens] = useState(null);
  const [nfts, setNfts] = useState(null);
  const [balance, setBalance] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [amountToSend, setAmountToSend] = useState(null);
  const [sendToAddress, setSendToAddress] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [hash, setHash] = useState(null);
  const [currentTab, setCurrentTab] = useState(0)

  const [sortType, setSortType] = useState(0)
  const [balanceType, setBalanceType] = useState(0)

  const [tokenBalance, setTokenBalance] = useState(0)
  const [nftbalance, setNftBalance] = useState(0)


  const [aptosTokens, setAptosTokens] = useState([])
  const [aptosNfts, setAptosNfts] = useState([])
  const [trend, setTrend] = useState(0)







  async function getAccountTokens() {
    setFetching(true);

    const _balance = await publicClient.getBalance({
      address: '0x15b105eb8460840831B302C1EbD256A9FbF2eFa1',
    })
    const walletActivity = await publicClient.BaseService.getAddressActivity("0x2998E3e6F484bbaA003d39Fd7712b1DE6751ED84");


    const nfts = await publicClient.NftService.getNftsForAddress("matic-mainnet", "0x2998E3e6F484bbaA003d39Fd7712b1DE6751ED84");


    const balance = ethers.formatEther(_balance)

    setBalance(parseFloat(balance))

    setFetching(false);
  }

  async function getNfts() {
    const query = `
    query fetchOwnedNfts($where: nfts_bool_exp!) {
      aptos {
        nfts(where: $where) {
          id
          token_id
          name
          media_url
          media_type
          ranking
          owner
          collection {
            title
            slug
            floor
            description
            contract_id
            id
          }
          attributes {
            type
            value
            score
            rarity
            nft_id
          }
          chain_state

        }
      }
    }
`

    const vars = {
      "where": {
        "owner": { "_eq": "0xc1f94e94c98487b940c4ca9090d9bdd1e71e380a99d792f13c994387c41101e4" },
      }
    }
    const res = await axios({
      url: "https://api.indexer.xyz/graphql",
      method: 'post',
      data: {
        query,
        variables: vars
      },
      headers: {
        "x-api-key": "gHkAjfL.90154a1e8ea2cbbcc7e1877c343349f5",
        "x-api-user": "0xAdityaaa"
      }
    })

    let balance = 0
  
    if (res.status == 200) {
      res.data.data.aptos.nfts.forEach((ele)=>{
        balance += ele.collection.floor / (10 ** 6)
      })

      setNftBalance(balance)
      // setBalance(balance)
      setAptosNfts(res.data.data.aptos.nfts)
    }



  }


  useEffect(()=>{
    if(balanceType == 0){
      setBalance(tokenBalance)
    }
    else if(balanceType == 1){
      setBalance(nftbalance)
    }else if(balanceType == 2){
      setBalance(tokenBalance + nftbalance)
    }

  },[balanceType])

  function logout() {
    setSeedPhrase(null);
    setWallet(null);
    setNfts(null);
    setTokens(null);
    setBalance(0);
    navigate("/");
  }

  async function getTokensMoralis() {
    try {


      



      axios.get('https://mainnet-aptos-api.moralis.io/wallets/coins', {
        params: {
          limit: 15,
          owner_addresses: ['0xc1f94e94c98487b940c4ca9090d9bdd1e71e380a99d792f13c994387c41101e4']
        },
        headers: {
          'accept': 'application/json',
          'X-API-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImM5Y2M5MGM5LWM5MTctNGRhNC04NjM1LTA1ZThhYmE4OGFkNiIsIm9yZ0lkIjoiMzc4OTM4IiwidXNlcklkIjoiMzg5Mzk0IiwidHlwZUlkIjoiMWE2YTAzZjMtMzVkMS00ZmVkLTk1ZTUtYTQzYWY0YjhiYzU1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDg2MDEwMzgsImV4cCI6NDg2NDM2MTAzOH0.uVrMCyUg84T9VSWl45tmpr7HumcDdHw1lQBnl_G30ko'
        }
      })
        .then(response => {

          // let addresses = []

          let tempObj = {}

          let promises = []



          response.data.result.map((ele, inx) => {
            // addresses.push(encodeURIComponent(ele.coin_type))
            tempObj[encodeURIComponent(ele.coin_type)] = {
              amount: ele.amount
            }
            promises.push(axios.get(`https://public-api.aptoscan.com/v1/coins/${encodeURIComponent(ele.coin_type)}`, {
              headers: {
                'accept': 'application/json'
              }
            }))
          })


          Promise.all(promises).then((values) => {
            values.forEach((value) => {
              tempObj[encodeURIComponent(value.data.data.coin_type)] = {
                ...tempObj[encodeURIComponent(value.data.data.coin_type)],
                ...value.data.data
              }
            })

            let tempArray = []

            let total = 0
            let trend = 0.0

            Object.keys(tempObj).forEach((ele, inx) => {
              const token = tempObj[ele]
              const _amount = parseFloat(token.amount) / (10 ** token.decimals)
              const _price = token.current_price ? _amount * token.current_price : 0
              total += _price
              trend += parseFloat(token.change24h_price ?? 0)
              setTrend(trend)
              tempArray.push(tempObj[ele])
            })

            setTokenBalance(total)
            setBalance(total)

            tempArray.sort((a, b) => parseFloat(a.current_price) - parseFloat(b.current_price));
            setAptosTokens(tempArray)
          });






          // axios.get(`https://api.geckoterminal.com/api/v2/networks/aptos/tokens/multi/${addresses}`, {
          //   headers: {
          //     'accept': 'application/json'
          //   }
          // })
          //   .then(response => {
          //     console.log(response.data);
          //     let temp = []
          //     response.data.data.forEach((item) => {
          //       temp.push(item.attributes)
          //     })
          //     setAptosTokens(temp)
          //   })
          //   .catch(error => {
          //     console.error(error);
          //   });


        })
        .catch(error => {
          console.error(error);
        });


    } catch (err) {
      console.log(err.response);
    }
  }

  useEffect(() => {
    let tokens = aptosTokens

    if (tokens.length == 0) return
    if (sortType == 0) {
      tokens.sort((a, b) => parseFloat(a.current_price) - parseFloat(b.current_price));
    }
    else if (sortType == 1) {
      tokens.sort((b, a) => parseFloat(a.current_price) - parseFloat(b.current_price));
    }
    else if (sortType == 2) {
      tokens.sort((b, a) => parseFloat(a.change24h_price) - parseFloat(b.change24h_price));
    }
    else if (sortType == 3) {
      tokens.sort((a, b) => parseFloat(a.change24h_price) - parseFloat(b.change24h_price));
    }
    setAptosTokens(tokens)
  }, [sortType])


  useEffect(() => {
    if (!wallet || !selectedChain) return;
    setNfts(null);
    setTokens(null);
    setBalance(0);
    // getAccountTokens();
    getTokensMoralis()
    getNfts()
  }, []);

  useEffect(() => {
    if (!wallet) return;
    setNfts(null);
    setTokens(null);
    setBalance(0);
    // getAccountTokens();
    getTokensMoralis()
    getNfts()

  }, [selectedChain]);


  const [popupIsOpen, setPopupIsOpen] = React.useState(false);
  const [sortOpen, setSortOpen] = React.useState(false);
  const [balanceOpen, setBalanceOpen] = React.useState(false);


  const togglePopup = () => {
    setPopupIsOpen(!popupIsOpen);
  };

  const togglePopupSort = () => {
    setSortOpen(!sortOpen);
  };

  const togglePopupBalance = () => {
    setBalanceOpen(!balanceOpen);
  };


  const sortTypes = [
    "Low Token Price",
    "High Token Price",
    "Gain in 24hr",
    "Loss in 24hr"
  ]

  const balanceTypes = [
    "Token Balance",
    "NFT Balance",
    "Total Balance",
  ]


  const sortTypesIcons = [
    <TrendDown size={20} color="#979DAA" />,
    <TrendUp size={20} color="#979DAA" />,
    <ArrowUp size={20} color="#979DAA" />,
    <ArrowDown size={20} color="#979DAA" />,
  ]




  return (
    <>
      <div style={{ paddingLeft: 10, paddingRight: 10, width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
            <img style={{ width: 30, height: 30 }} src="https://Tabrez10XDev.github.io/cdn-public/aj_avatar.png" />
            <p style={{ color: 'black', lineHeight: 1, fontWeight: '700', marginLeft: 6 }}>Aj_24</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
            <Clock size={24} color="#979DAA" style={{ marginRight: 10 }} />
            <Globe size={24} color="#979DAA" />
          </div>


        </div>

        <div
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            marginTop:40,
            flexDirection: 'column'
          }}
        >
          <div onClick={togglePopupBalance} style={{ display: 'flex', flexDirection: 'row', alignItems:'center', marginLeft:4 }}>
            <h3 style={{ color: '#979DAA', lineHeight: 1, fontWeight: '700' }}>{balanceTypes[balanceType]}</h3>
            <CaretDown weight="bold" style={{ marginLeft: 0 }} size={16} color="#979DAA" />
          </div>
          <h2 style={{ color: 'black', margin: 0, fontSize: 42, fontWeight: '700', marginTop:10 }}>${balance.toFixed(3).toString().split(".")[0]}<span style={{ fontSize: 28, color: '#979DAA' }}>.{balance.toFixed(3).toString().split(".")[1]}</span></h2>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "row", alignSelf: 'center', marginTop: 24 }}>
            <div style={{ padding: "6px 8px", backgroundColor: trend < 0 ? '#ff9999' : COLORS.lightGreen, borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
              {trend < 0 ?
                <ArrowDown weight="bold" color='red' size={16} />
                : <ArrowUp weight="bold" color={COLORS.green} size={16} />
              }
              <p style={{ color: trend < 0 ? 'red' : COLORS.green, fontSize: 14, fontWeight: 'bold', marginLeft: 0 }}>{trend.toFixed(2).toString()}%</p>

            </div>

            <Copy style={{ marginLeft: 8 }} size={18} color="#979DAA" />


          </div>

        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 50 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>

            <p onClick={() => setCurrentTab(0)} className={currentTab == 0 ? "selected-text" : "unselected-text"}>Token</p>
            <p onClick={() => setCurrentTab(1)} style={{ marginLeft: 10 }} className={currentTab == 1 ? "selected-text" : "unselected-text"}>NFT</p>
            <p onClick={() => setCurrentTab(2)} style={{ marginLeft: 10 }} className={currentTab == 2 ? "selected-text" : "unselected-text"}>DeFi</p>
          </div>


          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Plus weight="bold" size={16} style={{ marginRight: 16 }} color="#979DAA" />
            <MagnifyingGlass weight="bold" style={{ marginLeft: 12, marginRight: '8px' }} size={16} color="#979DAA" />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 8, marginBottom: 8 }}>
          <div onClick={togglePopupSort} style={{ display: 'flex', flexDirection: 'row' }}>
            {
              sortTypesIcons[sortType]
            }
            {/* <ArrowUp size={16} color="black" /> */}
            <p style={{ fontWeight: '700', margin: '0px 10px' }}>{sortTypes[sortType]}</p>
            <CaretDown style={{ marginLeft: 0 }} size={16} color="black" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'row' }}>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F4F6', padding: 8, borderRadius: 30 }}>
              <EyeSlash weight="bold" size={16} color="#979DAA" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F4F6', padding: 8, borderRadius: 30, marginLeft: 12 }}>
              <DotsThreeVertical weight="bold" style={{}} size={16} color="#979DAA" />
            </div>
          </div>
        </div>

        {currentTab == 0 ? <div>
          {
            aptosTokens.map((token) => {
              const _amount = parseFloat(token.amount) / (10 ** token.decimals)
              const _price = token.current_price ? _amount * token.current_price : null
              if (!token.name || !token.logo_url || !_price || !token.change24h_price) {
                return
              }
              return (
                <TokenItem amount={_amount} name={token.name ?? "NA"} logo_url={token.logo_url} price={_price} change24h_price={token.change24h_price ?? "NA"} />
              )
            })
          }
        </div> : <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          {
            aptosNfts.map((nft) => {
              return (
                <NftItem onclick={() => navigate("/nftdetails", { state: nft })
                } name={nft.name} url={nft.media_url} slug={nft.slug} />
              )
            })
          }
        </div>}



      </div>

      <div
        onClick={() => togglePopup()}
        style={{
          display: 'flex', justifyContent: "center", alignItems: 'center', borderRadius: 20, height: 40, width: 40, backgroundColor: 'black', bottom: 10, left: '50%', position: 'fixed',
          transform: 'translateX(-50%)'

        }}>
        {!popupIsOpen ? <CaretDoubleUp size={30} color="white" /> : <CaretDoubleDown size={30} color="white" />}
      </div>


      <SortModal selectedValue={sortType} setSelectedValue={setSortType} open={sortOpen} toggle={togglePopupSort} />
      <BalanceModal selectedValue={balanceType} setSelectedValue={setBalanceType} open={balanceOpen} toggle={togglePopupBalance} />

      <Modal
        onClose={togglePopup}
        open={popupIsOpen}
        style={{
          position: "fixed",
          backgroundColor: "white",
          boxShadow: "2px solid black",
          height: 300,
          width: 300,
          margin: "auto",
          borderRadius: 20
        }}
      >
        <div style={{ backgroundColor: 'white', borderRadius: 20, width: 300, height: 280, padding: 6 }} className="popup">
          <button onClick={togglePopup} style={{ position: "absolute", top: 16, right: 16, color: '#979DAA' }} className="popup-close-btn">
            X
          </button>
          <div style={{}} className="popup-content">
            <p style={{ textAlign: 'left', color: '#979DAA', margin: 0, marginTop: 10, }}>Basics</p>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "flex-start", marginTop: 10 }}>
              <div style={{ width: 45, height: 45, borderRadius: 30, backgroundColor: '#58BB47', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus color='white' size={24} />
              </div>
              <div style={{ marginLeft: 6 }}>
                <p style={{ textAlign: 'left', margin: 0 }}>Buy</p>
                <p style={{ color: '#979DAA', margin: 0, marginTop: 4, textAlign: 'left' }}>Seamlessly buy your tokens from the market</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "flex-start", marginTop: 10 }}>
              <div style={{ width: 55, height: 45, borderRadius: 30, backgroundColor: '#2071EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PaperPlaneTilt color='white' size={24} />
              </div>
              <div style={{ marginLeft: 6 }}>
                <p style={{ textAlign: 'left', margin: 0 }}>Lending & Borrowing</p>
                <p style={{ color: '#979DAA', margin: 0, marginTop: 4, textAlign: 'left' }}>Seamlessly auto-swap and send tokens in one step.</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "flex-start", marginTop: 10 }}>
              <div style={{ width: 60, height: 45, borderRadius: 30, backgroundColor: '#F0B90B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowsClockwise color='white' size={24} />
              </div>
              <div style={{ marginLeft: 6 }}>
                <p style={{ textAlign: 'left', margin: 0 }}>Staking</p>
                <p style={{ color: '#979DAA', margin: 0, marginTop: 4, textAlign: 'left' }}>Seamlessly trade and exchange tokens within your wallet.</p>
              </div>
            </div>


          </div>
        </div>

      </Modal>

    </>
  );
}

export default WalletView;