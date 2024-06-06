"use client";

import React from "react";
import { timestampToDate, weiToEth } from "../utils";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export default function LendingInfo() {
  const { address: connectedAddress } = useAccount();
  const {
    data: borrowerInfo,
    isLoading: isLoading,
    error: error,
  } = useScaffoldReadContract({
    contractName: "SolidLending",
    functionName: "borrows",
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
        <p className="text-3xl font-bold"> Rule for Borrow </p>
        <ul className="flex flex-col gap-3">
          <li> 1 ~ 30 days : 2 % </li>
          <li> 1 ~ 3 months: 3 % </li>
          <li> 4 ~ 6 months: 5 % </li>
          <li> 7 ~ 12 months: 6 % </li>
          <li> 1 year ~ : 7 % </li>
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-3xl font-bold">Your Borrow Info</p>
        <div className="flex gap-5">
          <p>Balance:</p>
          <p>{borrowerInfo && weiToEth(borrowerInfo?.[0])}</p>
        </div>
        <div className="flex gap-5">
          <p>WithDraw</p>
          <p>{borrowerInfo && weiToEth(borrowerInfo?.[0])}</p>
        </div>
        <div className="flex gap-5">
          <p>StartTime</p>
          <p>{borrowerInfo && borrowerInfo[6] ? timestampToDate(borrowerInfo?.[2]) : new Date().toLocaleString()}</p>
        </div>
        <div className="flex gap-5">
          <p>EndTime</p>
          <p>{borrowerInfo && borrowerInfo[6] ? timestampToDate(borrowerInfo?.[3]) : new Date().toLocaleString()}</p>
        </div>
        <div className="flex gap-5">
          <p>Payment per Day</p>
          <p>{borrowerInfo && weiToEth(borrowerInfo?.[0])}</p>
        </div>
        <div className="flex gap-5">
          <p>Collateral Asset</p>
          <p>{borrowerInfo && (Number(borrowerInfo?.[5]) / 1000000).toString()} USDC</p>
        </div>
        <div className="flex gap-5">
          <p>Status</p>
          <p>{borrowerInfo?.[6] ? "true" : "false"}</p>
        </div>
      </div>
    </div>
  );
}
