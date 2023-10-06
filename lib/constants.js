import ABI from "./abi.json";
import {
  OpenseaSVG,
  EtherscanSVG,
  TwitterSVG,
  DiscordSVG,
} from "./HeaderIcons";


/**
 * ?? replace it with your collection address
 * !! paste your abi in abi.json
 */

export const ContractAddress = {
  address: "0x480f98ad98AA56D24Cf7e4019473e1927E847cB1",
  abi: ABI,
};


/**
 * ?? 1 for Eth Mainnet, 5 for eth GOERLI
 */
export const contractChainId = 324; 

/**
 * ?? replace it with your collection name since it will show on wallets when connecting
 */
export const CollectionName = "Airdrops Hunter!";




/**
 * ?? Please replace it with your Wallet connect project id or IT WILL SHOW MY WEBSITE INFO
 * ?? https://cloud.walletconnect.com/sign-in
 */
export const projectId = "ea12f987ea5f2430cacb522ebb6a369a";

/**
 * ?? Please replace it with your infura api key or IT WILL OVERLOAD AND WALLET CONNECTION WONT WORK
 * ?? https://app.infura.io/dashboard
 */

export const infuraApiKey = "f49bf19dbf4446a5b13b89c2928f978f";


export const HeaderItems = [
  // { name: "Opensea", target: "https://twitter.com", img: <OpenseaSVG /> },
  {
    name: "Explorer",
    target: `https://explorer.zksync.io/address/${ContractAddress.address}}`,
    img: <EtherscanSVG />,
  },
  { name: "Twitter", target: "https://twitter.com/AridropsP61924", img: <TwitterSVG /> },
  { name: "Discord", target: "https://twitter.com/AridropsP61924", img: <DiscordSVG /> },
];
