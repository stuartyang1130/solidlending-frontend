import Lending from "~~/components/solid/lending/lending";
import LenderData from "~~/components/solid/lending/lendingInfo";

export default function Solid() {
  return (
    <div className="top-0 fixed flex h-lvh w-screen">
      <div className="w-1/2 h-full flex flex-col justify-center items-center bg-gradient-to-br from-blue-700 to-blue-100">
        <Lending />
      </div>
      <div className="w-1/2 h-full flex justify-center items-center bg-gradient-to-tr from-blue-100 to-blue-700 text-slate-200">
        <LenderData />
      </div>
    </div>
  );
}
