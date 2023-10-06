import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractReads,
  useContractRead
} from "wagmi";
import { useEffect, useState } from "react";
import { ContractAddress, contractChainId } from "../lib/constants";
import toast from "react-hot-toast";
// import useWhitelist from "./useWhitelist";

function useContract() {
  const { address } = useAccount();
  const [Token, setToken] = useState(1);
  // const { GetUserProof, getMerkleRoot } = useWhitelist();

 
  const {
    data: CollectionInfo,
    isError: CollectionInfoErr,
    isLoading: CollectionInfoLoading,
    isFetched: CinfoFetched,
    isSuccess: Cinfosucess,
  } = useContractReads({
    contracts: [
      {
        ...ContractAddress,
        functionName: "totalSupply",
        chainId: contractChainId,
      },
      {
        ...ContractAddress,
        functionName: "currentPrice",
        chainId: contractChainId,
      },
      {
        ...ContractAddress,
        functionName: "saleIsActive",
        chainId: contractChainId,
      }
    ],
    watch: false,
  });

  console.log("CollectionInfo: ",contractChainId, CollectionInfo)

  const {
    config: PublicMintConfig,
    isError: PublicMintisErr,
    error: PublicMintConfigCheckErr,
  } = usePrepareContractWrite({
    address: ContractAddress.address,
    abi: ContractAddress.abi,
    functionName: "mint",
    args: [0,],
    value: "100000000000000", // 0.0001

    // value: Cinfosucess ? CollectionInfo[2].result * BigInt(Token) : "0",
  });

  const {
    data: PublicMintData,
    isLoading: PublicMintTXLoading,
    write: PublicMint,
    error: PublicMintTXErr,
  } = useContractWrite(PublicMintConfig);

  // const { isSuccess: PublicMintSuccess } = useWaitForTransaction({
  //   chainId: contractChainId,
  //   hash: PublicMintData?.hash,
  // });

  const { isSuccess: PublicMintSuccess } = PublicMintData?.hash ? true : true;


  // const {
  //   config: PresaleMintConfig,
  //   isError: PresaleisErr,
  //   error: PresaleMintConfigCheckErr,
  // } = usePrepareContractWrite({
  //   address: ContractAddress.address,
  //   abi: ContractAddress.abi,
  //   functionName: "presalemint",
  //   args: Cinfosucess ? [Token, GetUserProof(address)] : [0, [""]],
  //   value: Cinfosucess ? CollectionInfo[5].result * BigInt(Token) : "0",
  // });

  // const {
  //   data: PresaleMintData,
  //   isLoading: PresaleMintTXLoading,
  //   write: PresaleMint,
  //   error: PresaleMintTXErr,
  // } = useContractWrite(PresaleMintConfig);

  // const { isSuccess: PresaleMintSuccess } = useWaitForTransaction({
  //   hash: PresaleMintData?.hash,
  // });

  const HandleMint = async () => {
    try {
 
        if (PublicMintConfigCheckErr) {
          throw new Error(PublicMintConfigCheckErr);
        }
        const publicMint = await PublicMint?.();

        console.log("publicMint: ", publicMint)
        PublicMintSuccess = true ;
        PublicMintTXLoading = false;
     
    } catch (err) {
      toast.dismiss();
      toast.error(err.message.split(":")[3].split("\n")[0]);
      console.log(err);
    }
  };

  const IncrementTokens = () => {
    let NewTokens = Token + 1;
    if (NewTokens > 10) {
      NewTokens = 10;
    }
    setToken(NewTokens);
  };

  const DecrementTokens = () => {
    let NewTokens = Token - 1;
    if (NewTokens < 1) {
      NewTokens = 1;
    }
    setToken(NewTokens);
  };

  useEffect(() => {
    // if (PublicMintTXLoading) {
    //   toast.dismiss();
    //   toast.loading("Minting...");
    // }
    if (PublicMintSuccess) {
      toast.dismiss();
      toast.success("Minted");
    }
    if (PublicMintTXErr) {
      toast.dismiss();
      toast.error(PublicMintTXErr.message.split("\n")[0]);
    }
    // if (PresaleMintTXErr) {
    //   toast.dismiss();
    //   toast.error(PresaleMintTXErr.message.split("\n")[0]);
    // }
  }, [
    PublicMintTXLoading,
    // PresaleMintTXLoading,
    PublicMintSuccess,
    // PresaleMintSuccess,
    PublicMintTXErr,
    // PresaleMintTXErr,
  ]);

  // console.log(getMerkleRoot())
  
  return {
    HandleMint,
    IncrementTokens,
    DecrementTokens,
    Token,
    CollectionInfo,
    PublicMintTXLoading,
    // PresaleMintTXLoading,
  };
}

export default useContract;
