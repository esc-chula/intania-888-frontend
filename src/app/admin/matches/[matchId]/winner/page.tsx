"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiClient } from "@/api/axios";

const UpdateWinner = () => {
  const [winner, setWinner] = useState<string>("");
  const { matchId } = useParams();
  const router = useRouter();

  const handleUpdateWinner = async () => {
    try {
      await apiClient.patch(`/matches/${matchId}/winner/${winner}`);
      alert("Winner updated successfully!");
      router.push("/admin");
    } catch (error) {
      console.error("Error updating winner:", error);
    }
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-xl font-bold mb-4">Update Match Winner</h1>
      <div className="space-y-2">
        <label>Choose the Winner</label>
        <select
          value={winner}
          onChange={(e) => setWinner(e.target.value)}
          className="border p-2 text-black"
        >
          <option value="">Select Winner</option>
          <option value="BLUE">Team Blue</option>
          <option value="RED">Team Red</option>
        </select>
        <button
          className="px-4 py-2 bg-green-500 text-white"
          onClick={handleUpdateWinner}
        >
          Update Winner
        </button>
      </div>
    </div>
  );
};

export default UpdateWinner;
