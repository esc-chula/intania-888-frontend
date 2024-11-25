"use client";
import React, { useState } from "react";
import { Intania888Logo } from "../../../../public/logos/Intania888-logo";
import { useRouter } from "next/navigation";
import { Selector } from "@/components/Selector";
import { groupList } from "@/constant/groupList";
import { handleUpdateProfile } from "@/api/user/profile";
import useAuth from "@/hooks/useAuth";

const RegisterProfile = () => {
  const [nickName, setNickName] = useState("");
  const [group, setGroup] = useState("--เลือกกรุ๊ป--");
  const router = useRouter();
  const { user } = useAuth();

  const onClickUpdateProfile = async () => {

    if (!user) {
      return;
    }
    
    const profile = user.profile;
    const success = await handleUpdateProfile(profile.id, {
      nickName,
      groupId: group,
      remainingCoin: 888.88
    });

    if (!success) {
      console.error("update profile not successful");
      return;
    }
    
    router.push('/')
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-5 text-white h-screen">
      <div className="w-72 h-16">
        <Intania888Logo />
      </div>
      <div className="flex items-center justify-center flex-col font-semibold space-y-5">
        <div className="w-full space-y-3">
          <p>ชื่อ</p>
          <input
            className="w-full h-12 w-80 bg-white rounded-md text-black pl-3 font-light rounded-xl"
            type="text"
            placeholder="ชื่อเล่น"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
        </div>
        <div className="w-full space-y-3">
          <p>กรุ๊ป</p>
          <Selector
            choicesList={groupList}
            mainFilter="--เลือกกรุ๊ป--"
            filter={group}
            setFilter={setGroup}
          />
        </div>
      </div>
      <section className="flex flex-col items-center justify-center space-y-1.5 font-semibold">
        <div
          className="flex justify-center items-center bg-gradient-to-t from-[#4E0F15] to-[#68141C] w-64 h-11 rounded-md"
          onClick={onClickUpdateProfile}
        >
          เริ่มต้นใช้งาน
        </div>
      </section>
    </div>
  );
};

export default RegisterProfile;
