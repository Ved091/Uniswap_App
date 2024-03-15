import {
  ConnectWallet,
  Web3Button,
  useContract,
  useContractWrite,
} from "@thirdweb-dev/react";
import { useState } from "react";
import { utils } from "ethers";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  const [token, setToken] = useState(0);
  const [eth, setEth] = useState(0);
  const [ethToSwap, setEthToSwap] = useState(0);
  const [tokenToSwap, setTokenToSwap] = useState(0);
  const [removeLiq, setRemoveLiq]= useState(0);
  const contractAddress = "0x121e15def566f34384358f548CF7f0b4b3924eec";
  const { contract } = useContract(contractAddress);
  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    "addLiquidity"
  );
  const contact = useContractWrite(contract, "ethToTokenSwap");
  const connect = useContractWrite(contract, "tokenToEthSwap");
  const contacts = contact.mutateAsync;
  const connects = connect.mutateAsync;
  return (
    <div className="flex justify-center flex-col items-center gap-12 p-3">
      <div className="flex flex-row gap-4">
        <div>Amount of Token</div>
        <input
          className="px-2 bg-slate-300"
          onChange={(e) => setToken(e.target.value)}
        />
        <div>Amount in Eth</div>
        <input
          className="px-2 bg-slate-300"
          onChange={(e) => setEth(e.target.value)}
        />
        <Web3Button
          contractAddress="0x121e15def566f34384358f548CF7f0b4b3924eec"
          action={() =>
            mutateAsync({
              args: [token],
              overrides: {
                value: utils.parseEther(eth), // send 0.1 native token with the contract call
              },
            })
          }
        >
          addLiquidity
        </Web3Button>
      </div>
      <div className="w-96 h-84 border-black border-2 p-3 flex flex-col gap-6">
        <div>Input Amount</div>
        <input
          className="px-2 bg-slate-300"
          onChange={(e) => setEthToSwap(e.target.value)}
        />
        <Web3Button
          contractAddress="0x121e15def566f34384358f548CF7f0b4b3924eec"
          action={() =>
            contacts({
              args: [0],
              overrides: {
                value: utils.parseEther(ethToSwap),
              },
            })
          }
        >
          Swap Eth
        </Web3Button>
        <div>Input Token</div>
        <input
          className="px-2 bg-slate-300"
          onChange={(e) => setTokenToSwap(e.target.value)}
        />
        <Web3Button
          contractAddress="0x121e15def566f34384358f548CF7f0b4b3924eec"
          action={(contract) => {
            contract.call("tokenToEthSwap", [tokenToSwap, 0]);
          }}
        >
          Swap Token
        </Web3Button>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div>Amount to token to remove</div>
        <input
          className="px-2 bg-slate-300"
          onChange={(e) => setRemoveLiq(e.target.value)}
        />
        <Web3Button
      contractAddress="0x121e15def566f34384358f548CF7f0b4b3924eec"
      action={(contract) => {
        contract.call("removeLiquidity", [removeLiq])
      }}
    >
      Remove Liquidity
    </Web3Button>
      </div>
    </div>
  );
}

