"use client";

import React, { useState } from "react";
import { EtherInput } from "../../scaffold-eth";
import { InputBase } from "../../scaffold-eth";
import { AddressInput } from "../../scaffold-eth";
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Lending: React.FC = () => {
  const [method, setMethod] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [depositAmount, setDepositAmount] = useState("");
  const [duration, setDuration] = useState(0);

  const { writeContractAsync: writeContractAsync } = useScaffoldWriteContract("SolidLending");

  const sendLendTransaction = async () => {
    try {
      !method
        ? await writeContractAsync({
            functionName: "deposit",
            args: [BigInt(duration)],
            value: parseEther(depositAmount),
          })
        : await writeContractAsync({
            functionName: "withdraw",
            args: [address, parseEther(depositAmount)],
          });
    } catch (e) {
      console.error("Error setting:", e);
    }
  };

  return (
    <div className="w-4/5 flex flex-col gap-3 px-5 py-8 border-2 shadow-2xl rounded-xl bg-indigo-400 text-white">
      <div className="flex justify-between">
        <form className="flex gap-4 text-white">
          <div
            onClick={() => setMethod(false)}
            className={`flex gap-2 ${
              !method ? "bg-purple-500" : " bg-purple-300"
            } px-10 py-2 rounded-lg cursor-pointer`}
          >
            Lend
          </div>
          <div
            onClick={() => setMethod(true)}
            className={`flex gap-2 ${method ? "bg-purple-500" : "bg-purple-300 "} px-10 py-2 rounded-lg cursor-pointer`}
          >
            Withdraw
          </div>
        </form>
      </div>
      {method && (
        <div className="flex flex-col gap-3">
          <span className="fond-semibold">Address</span>
          <AddressInput value={address} onChange={address => setAddress(address)} placeholder="Wirte your address" />
        </div>
      )}
      <div>
        <span className="font-semibold">{!method ? "Deposite Amount" : "Withdraw Amount"}</span>
      </div>
      <EtherInput
        value={depositAmount}
        onChange={amount => setDepositAmount(amount)}
        placeholder="write deposite amount"
      />
      {!method && (
        <div className="flex flex-col gap-3">
          <div>
            <span className="font-semibold">Period(days)</span>
          </div>
          <InputBase value={duration} onChange={value => setDuration(value)} />
        </div>
      )}

      <button
        className="w-full font-bold rounded-2xl bg-indigo-700 hover:bg-indigo-600 px-6 py-3 text-l uppercase text-white shadow-md  transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
        onClick={sendLendTransaction}
      >
        send transaction
      </button>
    </div>
  );
};

export default Lending;
