"use client";

import React, { useState } from "react";
import { EtherInput } from "../../scaffold-eth";
import { InputBase } from "../../scaffold-eth";
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";
import { setApprove, getApprove } from "../utils";

const Borrowing: React.FC = () => {
  const [method, setMethod] = useState<boolean>(false);
  const [assets, setAssets] = useState("");
  const [borrowAmount, setBorrowAmount] = useState("");
  const [duration, setDuration] = useState(0);  

  const { writeContractAsync: Usdc } = useScaffoldWriteContract("TestnetERC20");
  const { data: SolidLending } = useScaffoldContract({ contractName: "SolidLending" });

  const usdcApproveAssets = async () => {
    try {
      await Usdc({
        functionName: "approve",
        args: [SolidLending?.address, BigInt(10000000000000000)],
      }).then((res) => setApprove(10000000000000000));
    } catch (err) {
      console.error("Approve error:", err);
    }
  };

  const approve = getApprove();

  const { writeContractAsync: writeContractAsync } = useScaffoldWriteContract("SolidLending");

  const sendLendTransaction = async () => {
    try {
      !method && approve
        ? await writeContractAsync({
            functionName: "borrowAsset",
            args: [parseEther(borrowAmount), BigInt(assets), BigInt(duration)],
          })
        : await writeContractAsync({
            functionName: "repay",
            value: parseEther(borrowAmount),
          });
    } catch (e) {
      console.error("Error setting greeting:", e);
    }
  };

  return (
    <div className="w-4/5 flex flex-col gap-3 px-5 py-8 border-2 rounded-xl bg-indigo-400 text-white">
      <div className="flex justify-between">
        <form className="flex gap-4 text-white">
          <div
            onClick={() => setMethod(false)}
            className={`flex gap-2 ${
              !method ? "bg-purple-500" : " bg-purple-300"
            } px-10 py-2 rounded-lg cursor-pointer`}
          >
            Borrow
          </div>
          <div
            onClick={() => setMethod(true)}
            className={`flex gap-2 ${method ? "bg-purple-500" : "bg-purple-300 "} px-10 py-2 rounded-lg cursor-pointer`}
          >
            Repay
          </div>
        </form>
      </div>
      {approve && (
        <div className="flex flex-col gap-3">
          <div>
            <span className="font-semibold">{!method ? "Borrow" : "Repay"} Amount</span>
          </div>
          <EtherInput
            value={borrowAmount}
            onChange={amount => setBorrowAmount(amount)}
            placeholder="write deposite amount"
          />
        </div>
      )}
      {!method && approve && (
        <div className="flex flex-col gap-3">
          <div>
            <span className="font-semibold">Period(days)</span>
          </div>
          <InputBase value={duration} onChange={value => setDuration(value)} />
        </div>
      )}
      {!method && approve && (
        <div className="flex flex-col gap-3">
          <div>
            <span className="font-semibold">Assets Amount</span>
          </div>
          <EtherInput value={assets} onChange={amount => setAssets(amount)} placeholder="write deposite amount" />
        </div>
      )}
      {approve && (
        <button
          className="w-full font-bold rounded-2xl bg-indigo-700 hover:bg-indigo-600 px-6 py-3 text-l uppercase text-white shadow-md  transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
          onClick={() => {
            sendLendTransaction();
          }}
        >
          send transaction
        </button>
      )}
      {!approve && (
        <div className="flex flex-col">
          <button
            className="w-full font-bold rounded-2xl bg-indigo-700 hover:bg-indigo-600 px-6 py-3 text-l uppercase text-white shadow-md  transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
            onClick={async () => {
              !method && (await usdcApproveAssets());
            }}
          >
            approve transaction
          </button>
          <div>
            <p className="rounded-full animate-pulse text-white bg-red-500 px-5 py-2">
              Warn!! You have to approve your usdc token can be sent to contract before transaction
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Borrowing;
