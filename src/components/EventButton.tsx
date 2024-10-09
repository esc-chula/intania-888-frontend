import { loginDaily } from "@/api/event/slot";
import { useState } from "react";
import toast from "react-hot-toast";

export const EventButton = ({
  Sstate,
  type,
}: {
  Sstate: number;
  type: string;
}) => {
  const [state, setState] = useState(Sstate);
  const handleAddState = () => {
    const newV = state + 1 > 2 ? 2 : state + 1;
    setState(newV);
  };
  const handleDaily = async () => {
    const res = await loginDaily();
    if (res?.success) {
      toast.success("รับเหรียญสำเร็จ");
    } else {
      toast.error("ไม่สามารถรับเหรียญได้");
    }
  };
  if (state === 0) {
    return (
      <div
        onClick={() => {
          handleAddState();
        }}
        className="flex items-center justify-center cursor-pointer text-sm sm:text-lg w-20 h-9 sm:h-12 sm:w-28 bg-[#4E0F15] text-white rounded-lg"
      >
        ติดตาม
      </div>
    );
  } else if (state === 1) {
    if (type === "daily") {
      return (
        <div
          onClick={() => {
            handleDaily();
            handleAddState();
          }}
          className="flex items-center justify-center cursor-pointer text-sm sm:text-lg w-20 h-9 sm:h-12 sm:w-28 bg-gradient-to-t from-base-gold hover:from-[#bc9636] to-white rounded-lg"
        >
          รับเหรียญ
        </div>
      );
    } else {
      return (
        <div
          onClick={() => {
            handleAddState();
          }}
          className="flex items-center justify-center cursor-pointer text-sm sm:text-lg w-20 h-9 sm:h-12 sm:w-28 bg-gradient-to-t from-base-gold hover:from-[#bc9636] to-white rounded-lg"
        >
          รับเหรียญ
        </div>
      );
    }
  } else {
    return (
      <div
        onClick={() => {
          handleAddState();
        }}
        className="flex items-center justify-center rounded-xl cursor-pointer text-sm sm:text-lg w-20 h-9 sm:h-12 sm:w-28 text-gray-600 bg-gray-200"
      >
        รับแล้ว
      </div>
    );
  }
};
