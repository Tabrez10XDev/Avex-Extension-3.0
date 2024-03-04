interface ChainConfig {
    hex: string;
    name: string;
    rpcUrl: string;
    ticker: string;
  }
  
  const Ethereum: ChainConfig = {
    hex: "0x1",
    name: "Ethereum",
    rpcUrl: "",
    ticker: "ETH",
  };
  
  const MumbaiTestnet: ChainConfig = {
    hex: "0x13881",
    name: "Mumbai Testnet",
    rpcUrl: "", // process.env.REACT_APP_MUMBAI_RPC_URL || ""
    ticker: "MATIC",
  };
  
  const SepoliaTestnet: ChainConfig = {
    hex: "0xaa36a7",
    name: "Sepolia Testnet",
    rpcUrl: "", // process.env.REACT_APP_SEPOLIA_RPC_URL || ""
    ticker: "ETH",
  };
  
  export const CHAINS_CONFIG: Record<string, ChainConfig> = {
    "0x1": Ethereum,
    "0x13881": MumbaiTestnet,
    "0xaa36a7": SepoliaTestnet,
  };
  