import BorrowInfo from "~~/components/solid/borrow/borrowInfo";
import Borrowing from "~~/components/solid/borrow/borrowing";

export default function Solid() {
  return (
    <div className="top-0 fixed flex h-lvh w-screen">
      <div className="w-1/2 h-full flex flex-col justify-center items-center bg-gradient-to-br from-blue-700 to-blue-100">
        <Borrowing />
      </div>
      <div className="w-1/2 h-full flex bg-yellow-50 justify-center items-center bg-gradient-to-tr from-blue-100 to-blue-700 text-slate-200">
        <BorrowInfo />
      </div>
    </div>
  );
}
