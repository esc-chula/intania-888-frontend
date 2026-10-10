"use client";

import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Ban, RefreshCw } from "lucide-react";
import { apiClient } from "@/api/axios";
import { asMoneyString, formatMoneyString } from "@/utils/money";
import { asRateString, formatRateString } from "@/utils/rate";

interface BillLine {
  bill_id: string;
  match_id: string;
  betting_on: string;
  rate: string;
  match: { type: string };
}

interface Bill {
  id: string;
  user_id: string;
  total: string;
  payout: string | null;
  status: string;
  settled_at: string | null;
  voided_at: string | null;
  lines: BillLine[];
}

interface ApiErrorResponse {
  code?: string;
  message?: string;
  request_id?: string;
}

const getErrorMessage = (error: unknown) => {
  if (!(error instanceof AxiosError)) return "Request failed";
  const response = error.response?.data as ApiErrorResponse | undefined;
  return [response?.message ?? "Request failed", response?.code, response?.request_id]
    .filter(Boolean)
    .join(" · ");
};

export default function BillsPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [voidingId, setVoidingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchBills = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<Bill[]>("/bills/admin/all");
      setBills(response.data);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchBills();
  }, [fetchBills]);

  const handleVoid = async (bill: Bill) => {
    const reason = window.prompt("Required audit reason for voiding this bill")?.trim();
    if (!reason) return;

    setVoidingId(bill.id);
    setError(null);
    try {
      const response = await apiClient.put<Bill>(
        `/bills/admin/${encodeURIComponent(bill.id)}/void`,
        { reason },
      );
      setBills((current) =>
        current.map((item) => (item.id === bill.id ? response.data : item)),
      );
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setVoidingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Bills</h1>
          <p className="mt-1 text-gray-400">
            Review bets and void pending bills with an audit reason.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void fetchBills()}
          className="rounded-lg bg-gray-800 p-3 text-gray-200 hover:bg-gray-700"
          aria-label="Refresh bills"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-700 bg-red-950/40 p-4 text-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-gray-300">Loading...</div>
      ) : bills.length === 0 ? (
        <div className="rounded-lg bg-gray-900 p-8 text-center text-gray-400">
          No bills found.
        </div>
      ) : (
        <div className="space-y-4">
          {bills.map((bill) => (
            <article key={bill.id} className="rounded-lg bg-gray-900 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-gray-500">{bill.id}</p>
                  <p className="mt-1 text-sm text-gray-400">
                    User: {bill.user_id}
                  </p>
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-gray-800 px-3 py-1 text-xs font-semibold uppercase text-gray-200">
                    {bill.status}
                  </span>
                  <p className="mt-2 text-xl font-bold text-white">
                    {formatMoneyString(asMoneyString(bill.total))} ₿
                  </p>
                  {bill.payout && (
                    <p className="text-sm text-green-400">
                      Payout {formatMoneyString(asMoneyString(bill.payout))} ₿
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-gray-500">
                    <tr>
                      <th className="py-2 pr-4">Match</th>
                      <th className="py-2 pr-4">Sport</th>
                      <th className="py-2 pr-4">Pick</th>
                      <th className="py-2">Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800 text-gray-200">
                    {bill.lines.map((line) => (
                      <tr key={`${line.bill_id}-${line.match_id}`}>
                        <td className="py-2 pr-4 font-mono text-xs">
                          {line.match_id}
                        </td>
                        <td className="py-2 pr-4">{line.match.type}</td>
                        <td className="py-2 pr-4">{line.betting_on}</td>
                        <td className="py-2">
                          {formatRateString(asRateString(line.rate))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {bill.status.toLowerCase() === "pending" && (
                <button
                  type="button"
                  disabled={voidingId === bill.id}
                  onClick={() => void handleVoid(bill)}
                  className="mt-4 flex items-center gap-2 rounded bg-red-800 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-700"
                >
                  <Ban className="h-4 w-4" />
                  {voidingId === bill.id ? "Voiding..." : "Void and refund"}
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
