export const timestampToDate = (unix: bigint) => {
  const a = new Date(Number(unix) * 1000);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  const time = date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
};

export const dateToTimsstamp = (date: Date) => {
  return date.getTime() / 1000;
};

export const weiToEth = (value: bigint) => {
  return `${Number(value) / 1000000000000000000} Eth`;
};

export const weiToUSDT = (value: bigint, currentValue: number) => {
  return `${(Number(value) / 1000000000000000000) * currentValue} USDT`;
};

export const setApprove = (amount: number) => {
  localStorage.setItem("approve", amount.toString());
}

export const getApprove = () => {
  return localStorage.getItem("approve");
}