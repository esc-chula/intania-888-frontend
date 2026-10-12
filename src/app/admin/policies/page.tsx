"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import {
  Ban,
  CheckCircle2,
  Pencil,
  Plus,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { apiClient } from "@/api/axios";

type PolicyKind = "allowlist" | "blacklist";
type PrincipalType = "email" | "google_subject";

interface AccessPolicy {
  id: string;
  kind: PolicyKind;
  principal_type: PrincipalType;
  principal: string;
  reason: string;
  enabled: boolean;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

interface PolicyListResponse {
  items: AccessPolicy[] | null;
  next_cursor: string | null;
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

export default function AccessPoliciesPage() {
  const [policies, setPolicies] = useState<AccessPolicy[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [kind, setKind] = useState<PolicyKind>("allowlist");
  const [principalType, setPrincipalType] =
    useState<PrincipalType>("email");
  const [principal, setPrincipal] = useState("");
  const [reason, setReason] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const fetchPolicies = useCallback(async (cursor?: string) => {
    if (!cursor) setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<PolicyListResponse>(
        "/auth/policies",
        { params: { status: "all", limit: 100, cursor } },
      );
      const items = response.data.items ?? [];
      setPolicies((current) => (cursor ? [...current, ...items] : items));
      setNextCursor(response.data.next_cursor);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPolicies();
  }, [fetchPolicies]);

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    if (!principal.trim() || !reason.trim()) return;

    setSaving(true);
    setError(null);
    try {
      await apiClient.post("/auth/policies", {
        kind,
        principal_type: principalType,
        principal: principal.trim(),
        reason: reason.trim(),
        ...(expiresAt ? { expires_at: new Date(expiresAt).toISOString() } : {}),
      });
      setPrincipal("");
      setReason("");
      setExpiresAt("");
      await fetchPolicies();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (policy: AccessPolicy) => {
    setError(null);
    try {
      await apiClient.patch(`/auth/policies/${encodeURIComponent(policy.id)}`, {
        enabled: !policy.enabled,
      });
      await fetchPolicies();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  };

  const handleReasonEdit = async (policy: AccessPolicy) => {
    const nextReason = window.prompt("Policy reason", policy.reason)?.trim();
    if (!nextReason || nextReason === policy.reason) return;

    setError(null);
    try {
      await apiClient.patch(`/auth/policies/${encodeURIComponent(policy.id)}`, {
        reason: nextReason,
      });
      await fetchPolicies();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  };

  const handleDisable = async (policy: AccessPolicy) => {
    if (!window.confirm(`Disable policy for ${policy.principal}?`)) return;

    setError(null);
    try {
      await apiClient.delete(
        `/auth/policies/${encodeURIComponent(policy.id)}`,
      );
      await fetchPolicies();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Access Policies</h1>
          <p className="mt-1 text-gray-400">
            Manage account allowlist and blacklist rules.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void fetchPolicies()}
          className="rounded-lg bg-gray-800 p-3 text-gray-200 hover:bg-gray-700"
          aria-label="Refresh policies"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      <form
        onSubmit={handleCreate}
        className="grid gap-3 rounded-lg bg-gray-900 p-4 lg:grid-cols-2"
      >
        <select
          value={kind}
          onChange={(event) => setKind(event.target.value as PolicyKind)}
          className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
        >
          <option value="allowlist">Allowlist</option>
          <option value="blacklist">Blacklist</option>
        </select>
        <select
          value={principalType}
          onChange={(event) =>
            setPrincipalType(event.target.value as PrincipalType)
          }
          className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
        >
          <option value="email">Email</option>
          <option value="google_subject">Google subject</option>
        </select>
        <input
          value={principal}
          onChange={(event) => setPrincipal(event.target.value)}
          placeholder={principalType === "email" ? "user@example.com" : "Google subject ID"}
          className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
          required
        />
        <input
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          placeholder="Audit reason"
          className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
          required
        />
        <label className="flex flex-col gap-1 text-sm text-gray-300">
          Expiry (optional)
          <input
            type="datetime-local"
            value={expiresAt}
            onChange={(event) => setExpiresAt(event.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
          />
        </label>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 self-end rounded-lg bg-blue-600 px-4 py-2 text-white disabled:bg-gray-600"
        >
          <Plus className="h-4 w-4" />
          Add policy
        </button>
      </form>

      {error && (
        <div className="rounded-lg border border-red-700 bg-red-950/40 p-4 text-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-gray-300">Loading...</div>
      ) : policies.length === 0 ? (
        <div className="rounded-lg bg-gray-900 p-8 text-center text-gray-400">
          No access policies configured.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg bg-gray-900">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="px-4 py-3">Policy</th>
                <th className="px-4 py-3">Principal</th>
                <th className="px-4 py-3">Reason</th>
                <th className="px-4 py-3">Expiry</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {policies.map((policy) => (
                <tr key={policy.id} className="text-gray-200">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck
                        className={`h-5 w-5 ${
                          policy.kind === "allowlist"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      />
                      <div>
                        <p className="font-semibold">{policy.kind}</p>
                        <p className="text-xs text-gray-500">
                          {policy.enabled ? "active" : "disabled"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p>{policy.principal}</p>
                    <p className="text-xs text-gray-500">
                      {policy.principal_type}
                    </p>
                  </td>
                  <td className="max-w-xs px-4 py-3">{policy.reason}</td>
                  <td className="px-4 py-3 text-gray-400">
                    {policy.expires_at
                      ? new Date(policy.expires_at).toLocaleString()
                      : "Never"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => void handleReasonEdit(policy)}
                        className="rounded bg-gray-800 p-2 hover:bg-gray-700"
                        aria-label={`Edit ${policy.principal}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      {!policy.enabled && (
                        <button
                          type="button"
                          onClick={() => void handleToggle(policy)}
                          className="rounded bg-gray-800 p-2 hover:bg-gray-700"
                          aria-label={`Enable ${policy.principal}`}
                        >
                          <CheckCircle2 className="h-4 w-4 text-green-300" />
                        </button>
                      )}
                      {policy.enabled && (
                        <button
                          type="button"
                          onClick={() => void handleDisable(policy)}
                          className="rounded bg-red-950 p-2 text-red-300 hover:text-red-100"
                          aria-label={`Disable ${policy.principal}`}
                        >
                          <Ban className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {nextCursor && (
        <button
          type="button"
          onClick={() => void fetchPolicies(nextCursor)}
          className="rounded-lg bg-gray-800 px-5 py-2 text-gray-200 hover:bg-gray-700"
        >
          Load more
        </button>
      )}
    </div>
  );
}
