"use client";

import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Intania888Logo } from "../../../../public/logos/Intania888-logo";
import { Selector } from "@/components/Selector";
import { groupList } from "@/constant/groupList";
import {
  handleRegisterProfile,
  handleUpdateProfile,
} from "@/api/user/profile";
import useAuth from "@/hooks/useAuth";

const groupPlaceholder = "--เลือกกรุ๊ป--";

const RegisterProfile = () => {
  const [nickName, setNickName] = useState<string | null>(null);
  const [group, setGroup] = useState(groupPlaceholder);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { profile, status, refreshSession } = useAuth();
  const currentNickName = nickName ?? profile?.nick_name ?? "";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/register");
      return;
    }

    if (status === "authenticated" && profile?.nick_name && profile.group_id) {
      router.replace("/");
    }
  }, [profile, router, status]);

  useEffect(() => {
    if (!profile?.group_id) {
      setGroup(groupPlaceholder);
    }
  }, [profile?.group_id]);

  const onClickUpdateProfile = async () => {
    if (status !== "authenticated" || !profile) {
      return;
    }

    setErrorMessage(null);

    const normalizedNickName = currentNickName.trim();
    if (!normalizedNickName) {
      setErrorMessage("กรุณากรอกชื่อเล่น");
      return;
    }

    const needsGroupRegistration = !profile.group_id;
    if (needsGroupRegistration && group === groupPlaceholder) {
      setErrorMessage("กรุณาเลือกกรุ๊ป");
      return;
    }

    setIsSubmitting(true);
    try {
      if (needsGroupRegistration) {
        await handleRegisterProfile({
          nickName: normalizedNickName,
          groupId: group,
        });
      } else {
        await handleUpdateProfile({ nickName: normalizedNickName });
      }

      setNickName(null);
      let session = await refreshSession();
      if (!session) {
        setErrorMessage("โหลดข้อมูลบัญชีไม่สำเร็จ กรุณาลองอีกครั้ง");
        return;
      }

      if (
        needsGroupRegistration &&
        session.profile.group_id &&
        session.profile.nick_name !== normalizedNickName
      ) {
        await handleUpdateProfile({ nickName: normalizedNickName });
        session = await refreshSession();
        if (!session) {
          setErrorMessage("โหลดข้อมูลบัญชีไม่สำเร็จ กรุณาลองอีกครั้ง");
          return;
        }
      }

      if (session.profile.nick_name && session.profile.group_id) {
        router.push("/");
      }
    } catch (requestError) {
      if (
        requestError instanceof AxiosError &&
        requestError.response?.status === 409
      ) {
        await refreshSession();
        setNickName(null);
        setErrorMessage("กรุ๊ปของคุณถูกกำหนดแล้ว ข้อมูลบัญชีถูกโหลดใหม่");
      } else {
        setErrorMessage("บันทึกข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-5 text-white">
      <div className="h-16 w-72">
        <Intania888Logo />
      </div>
      <div className="flex flex-col items-center justify-center space-y-5 font-semibold">
        <div className="w-full space-y-3">
          <p>ชื่อ</p>
          <input
            className="h-12 w-80 rounded-xl bg-white pl-3 font-light text-black"
            type="text"
            placeholder="ชื่อเล่น"
            value={currentNickName}
            onChange={(event) => setNickName(event.target.value)}
          />
        </div>
        {profile && !profile.group_id && (
          <div className="w-full space-y-3">
            <p>กรุ๊ป</p>
            <Selector
              choicesList={groupList}
              mainFilter={groupPlaceholder}
              filter={group}
              setFilter={setGroup}
            />
          </div>
        )}
      </div>
      {errorMessage && (
        <p className="max-w-80 text-center text-sm text-red-300" role="alert">
          {errorMessage}
        </p>
      )}
      <section className="flex flex-col items-center justify-center space-y-1.5 font-semibold">
        <button
          className="h-11 w-64 rounded-md bg-gradient-to-t from-[#4E0F15] to-[#68141C] disabled:opacity-50"
          disabled={isSubmitting || status !== "authenticated" || !profile}
          onClick={onClickUpdateProfile}
          type="button"
        >
          {isSubmitting
            ? "กำลังบันทึก..."
            : profile?.group_id
              ? "บันทึก"
              : "เริ่มต้นใช้งาน"}
        </button>
      </section>
    </div>
  );
};

export default RegisterProfile;
