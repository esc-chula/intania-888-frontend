"use client";

import { apiClient } from "@/api/axios";
import { getAllUser } from "@/api/coin/getCoin";
import { Coins } from "lucide-react";
import { useEffect, useState } from "react";

export const CoinLeaderBoardTable = () => {
  const [Top10, setTop10] = useState<topInterface[] | undefined>(undefined);
  const [myNo, setMyNo] = useState<topInterface | undefined>(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const myData = (await apiClient.get("/auth/me")).data.profile;
      let allUser = (await getAllUser())?.data;

      allUser = allUser.sort((itemA: topInterface, itemB: topInterface) => {
        return itemB.remaining_coin - itemA.remaining_coin;
      });

      console.log(allUser);

      setMyNo({
        no: allUser.findIndex((item: { id: string }) => item.id === myData.id),
        nick_name: myData.nick_name,
        group_id: myData.group_id,
        remaining_coin: myData.remaining_coin,
      });
      setTop10(allUser.slice(0, 10));
    };

    fetchData();
  }, []);

  return (
    <table className="rounded-lg w-[90vw] sm:w-[600px] overflow-hidden text-[0.8rem] sm:text-[1rem] h-auto">
      <thead className="bg-[#4E0F15] font-semibold h-12 flex flex-row">
        <tr className="w-full flex flex-row">
          <td className="flex items-center justify-center w-[15%] h-full">
            ลำดับ
          </td>
          <td className="flex items-center justify-start w-[45%] sm:w-[55%] h-full ">
            ชื่อ
          </td>
          <td className="flex flex-row space-x-2 items-center justify-end pr-2 sm:pr-10 w-[40%] sm:w-[30%] h-full ">
            <p>จำนวนเหรียญ</p> <Coins color="yellow" />
          </td>
        </tr>
      </thead>
      <tbody>
        {Top10?.map((item, index) => {
          return (
            <tr
              key={index}
              className="text-black w-full bg-white font-semibold h-12 flex flex-row border-y-[0.5px]"
            >
              <td className="flex items-center justify-center w-[15%] h-full ">
                {index + 1}
              </td>
              <td className="flex items-center justify-start w-[55%] h-full ">
                <NameAndColor
                  name={item?.nick_name || ""}
                  color={
                    item?.group_id == undefined
                      ? "NONE"
                      : groupAndColorMap[item?.group_id]
                  }
                />
              </td>
              <td className="flex flex-row space-x-2 items-center justify-end pr-10 sm:pr-20 w-[30%] h-full ">
                <p>{item.remaining_coin.toFixed(2)}</p>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot className="font-semibold bg-neutral-200 text-black h-12 flex flex-row">
        <tr className="w-full flex flex-row">
          <td className="flex items-center justify-center w-[15%] h-full ">
            {(myNo?.no || 0) + 1}
          </td>
          <td className="flex items-center justify-start w-[55%] h-full ">
            <NameAndColor
              name={myNo?.nick_name || ""}
              color={
                myNo?.group_id == undefined
                  ? "NONE"
                  : groupAndColorMap[myNo?.group_id]
              }
            />
          </td>
          <td className="flex flex-row space-x-2 items-center justify-end pr-10 sm:pr-20 w-[30%] h-full ">
            {myNo?.remaining_coin.toFixed(2)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

interface topInterface {
  no: number;
  nick_name: string;
  group_id: string;
  remaining_coin: number;
}

const groupAndColorMap: { [key: string]: string } = {
  A: "VIOLET",
  B: "YELLOW",
  C: "VIOLET",
  Dog: "BLUE",
  E: "PINK",
  F: "VIOLET",
  G: "YELLOW",
  H: "GREEN",
  I: "VIOLET",
  J: "ORANGE",
  K: "ORANGE",
  L: "PINK",
  M: "ORANGE",
  N: "BLUE",
  P: "PINK",
  Q: "YELLOW",
  R: "BLUE",
  S: "GREEN",
  T: "GREEN",
};

const NameAndColor = (props: { name: string; color: string }) => {
  if (props.color == "VIOLET")
    return (
      <p>
        {props.name} <span className="text-team-violet">สีม่วง </span>
      </p>
    );
  if (props.color == "BLUE")
    return (
      <p>
        {props.name} <span className="text-team-blue">สีฟ้า</span>
      </p>
    );
  if (props.color == "YELLOW")
    return (
      <p>
        {props.name} <span className="text-team-yellow">สีเหลือง</span>
      </p>
    );
  if (props.color == "GREEN")
    return (
      <p>
        {props.name} <span className="text-team-green">สีเขียว</span>
      </p>
    );
  if (props.color == "PINK")
    return (
      <p>
        {props.name} <span className="text-team-pink">สีชมพู</span>
      </p>
    );
  if (props.color == "ORANGE")
    return (
      <p>
        {props.name} <span className="text-team-orange">สีส้ม</span>
      </p>
    );
  if (props.color == "NONE")
    return (
      <p>
        {props.name} <span className="text-gray-700">สี...</span>
      </p>
    );
};
