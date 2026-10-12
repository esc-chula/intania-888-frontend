"use client";
import React, { useState } from "react";
import { Intania888Logo } from "../../../../public/logos/Intania888-logo";
import { useRouter } from "next/navigation";
import { Selector } from "@/components/Selector";
import { groupList } from "@/constant/groupList";
import { registerProfile, handleUpdateProfile } from "@/api/user/profile";
import { AxiosError } from "axios";
import useAuth from "@/hooks/useAuth";

const RegisterProfile = () => {
  const [nickName, setNickName] = useState("");
  const [group, setGroup] = useState("--เลือกกรุ๊ป--");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { profile, status, refreshSession } = useAuth();

  const onClickUpdateProfile = async () => {

    if (saving || status !== "authenticated" || !profile) {
      return;
    }
    
    const nickname = nickName.trim();
    if (!nickname || (!profile.group_id && !groupList.includes(group))) {
      setError("กรุณากรอกชื่อเล่นและเลือกกรุ๊ป");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      if (profile.group_id) {
        const success = await handleUpdateProfile({ nickName: nickname });
        if (!success) throw new Error("ไม่สามารถบันทึกชื่อเล่นได้ กรุณาลองใหม่");
      } else {
        await registerProfile({ nickName: nickname, groupId: group });
      }
      const session = await refreshSession();
      if (!session) throw new Error("ไม่สามารถตรวจสอบข้อมูลบัญชีได้ กรุณาลองใหม่");
      router.replace("/");
    } catch (requestError) {
      if (requestError instanceof AxiosError && requestError.response?.status === 409) {
        const session = await refreshSession();
        if (session?.profile.group_id && session.profile.nick_name) {
          router.replace("/");
          return;
        }
      }
      const message = requestError instanceof AxiosError
        ? requestError.response?.data?.message
        : requestError instanceof Error ? requestError.message : null;
      setError(message ?? "ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setSaving(false);
    }
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
            maxLength={100}
            onChange={(e) => setNickName(e.target.value)}
          />
        </div>
        <div className="w-full space-y-3">
          <p>กรุ๊ป</p>
          <Selector
            choicesList={profile?.group_id ? [profile.group_id] : groupList}
            mainFilter="--เลือกกรุ๊ป--"
            filter={profile?.group_id ?? group}
            setFilter={setGroup}
          />
        </div>
      </div>
      <section className="flex flex-col items-center justify-center space-y-1.5 font-semibold">
        {error && <p role="alert" className="max-w-80 text-center text-sm text-red-400">{error}</p>}
        <button
          type="button"
          disabled={saving || status !== "authenticated"}
          className="flex justify-center items-center bg-gradient-to-t from-[#4E0F15] to-[#68141C] w-64 h-11 rounded-md disabled:opacity-50"
          onClick={onClickUpdateProfile}
        >
          {saving ? "กำลังบันทึก..." : "เริ่มต้นใช้งาน"}
        </button>
      </section>
    </div>
  );
};

export default RegisterProfile;
