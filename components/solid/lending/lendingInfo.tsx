"use client";

import React from "react";
import { timestampToDate, weiToEth } from "../utils";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export default function LendingInfo() {
  const { address: connectedAddress } = useAccount();

  const {
    data: lenderInfo,
    isLoading: isLoading,
    error: error,
  } = useScaffoldReadContract({
    contractName: "SolidLending",
    functionName: "lends",
    args: [connectedAddress],
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    console.error("Error fetching lender info:", error);
    return <div>Error fetching lender info</div>;
  }

  return (
    <div className="flex text-xl fond-bold gap-20">
      <div className="flex flex-col gap-3">
        <p className="text-3xl font-bold"> Rule for Lending </p>
        <ul className="flex flex-col gap-3">
          <li> 1 ~ 30 days : 1 % </li>
          <li> 1 ~ 3 months: 2 % </li>
          <li> 4 ~ 6 months: 3 % </li>
          <li> 7 ~ 12 months: 4 % </li>
          <li> 1 year ~ : 5 % </li>
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-3xl font-bold">Your Lending Info</p>
        <div className="flex gap-5">
          <p>Balance:</p>
          <p>{lenderInfo && weiToEth(lenderInfo?.[0])}</p>
        </div>
        <div className="flex gap-5">
          <p>WithDraw</p>
          <p>{lenderInfo && weiToEth(lenderInfo?.[1])}</p>
        </div>
        <div className="flex gap-5">
          <p>StartTime</p>
          <p>{lenderInfo && lenderInfo[5] ? timestampToDate(lenderInfo?.[2]) : new Date().toLocaleString()}</p>
        </div>
        <div className="flex gap-5">
          <p>EndTime</p>
          <p>{lenderInfo && lenderInfo[5] ? timestampToDate(lenderInfo?.[3]) : new Date().toLocaleString()}</p>
        </div>
        <div className="flex gap-5">
          <p>Payment per Day</p>
          <p>{lenderInfo && weiToEth(lenderInfo?.[4])}</p>
        </div>
        <div className="flex gap-5">
          <p>Status</p>
          <p>{lenderInfo?.[5] ? "true" : "false"}</p>
        </div>
      </div>
    </div>
  );
}
