"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Coins, RefreshCw, Save, Trash2 } from "lucide-react";
import { apiClient } from "@/api/axios";

interface DailyRewardOverride {
  date: string;
  amount: string;
}

interface DailyRewardSchedule {
  default_amount: string;
  overrides: DailyRewardOverride[];
}

interface ApiErrorResponse {
  message?: string;
  request_id?: string;
}

const toApiDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

const requestErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    const response = error.response?.data as ApiErrorResponse | undefined;
    return response?.request_id
      ? `${response.message ?? "Request failed"} (${response.request_id})`
      : response?.message ?? "Request failed";
  }
  return "Request failed";
};

export default function SettingsPage() {
  const [schedule, setSchedule] = useState<DailyRewardSchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const fetchSchedule = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<DailyRewardSchedule>(
        "/events/daily-rewards",
      );
      setSchedule(response.data);
    } catch (requestError) {
      setError(requestErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchSchedule();
  }, [fetchSchedule]);

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();
    if (!date || !/^\d+(\.\d{1,2})?$/.test(amount)) return;

    setSaving(true);
    setError(null);
    try {
      await apiClient.put(`/events/daily-rewards/${toApiDate(date)}`, {
        amount,
      });
      setDate("");
      setAmount("");
      await fetchSchedule();
    } catch (requestError) {
      setError(requestErrorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (override: DailyRewardOverride) => {
    if (!window.confirm(`Delete reward override for ${override.date}?`)) return;

    setError(null);
    try {
      await apiClient.delete(
        `/events/daily-rewards/${encodeURIComponent(override.date)}`,
      );
      await fetchSchedule();
    } catch (requestError) {
      setError(requestErrorMessage(requestError));
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="mt-1 text-gray-400">
            Configure the daily reward schedule.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void fetchSchedule()}
          className="rounded-lg bg-gray-800 p-3 text-gray-200 hover:bg-gray-700"
          aria-label="Refresh reward schedule"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-700 bg-red-950/40 p-4 text-red-200">
          {error}
        </div>
      )}

      <section className="rounded-lg bg-gray-900 p-6">
        <div className="mb-5 flex items-center gap-3">
          <Coins className="h-6 w-6 text-yellow-500" />
          <h2 className="text-xl font-bold text-white">Daily Reward</h2>
        </div>

        <div className="mb-6 rounded-lg border border-yellow-700/50 bg-yellow-900/20 p-6 text-center">
          <p className="text-sm text-gray-300">Default amount</p>
          <p className="mt-1 text-4xl font-bold text-yellow-400">
            {loading ? "—" : `${schedule?.default_amount ?? "0.00"} ₿`}
          </p>
        </div>

        <form
          onSubmit={handleSave}
          className="grid gap-3 md:grid-cols-[1fr_1fr_auto]"
        >
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
            required
          />
          <input
            inputMode="decimal"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Amount, e.g. 300.00"
            pattern="\d+(\.\d{1,2})?"
            className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
            required
          />
          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white disabled:bg-gray-600"
          >
            <Save className="h-4 w-4" />
            Save override
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-lg bg-gray-900">
        <div className="border-b border-gray-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Date overrides</h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : schedule?.overrides.length ? (
          <div className="divide-y divide-gray-800">
            {schedule.overrides.map((override) => (
              <div
                key={override.date}
                className="flex items-center justify-between px-6 py-4"
              >
                <div>
                  <p className="font-medium text-white">{override.date}</p>
                  <p className="text-sm text-yellow-400">
                    {override.amount} ₿
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void handleDelete(override)}
                  className="rounded bg-red-950 p-2 text-red-300 hover:text-red-100"
                  aria-label={`Delete override for ${override.date}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-400">
            No date-specific overrides.
          </div>
        )}
      </section>
    </div>
  );
}
