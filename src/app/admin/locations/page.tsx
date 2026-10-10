"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { MapPin, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import { apiClient } from "@/api/axios";

interface Location {
  id: string;
  title: string;
}

interface ApiErrorResponse {
  message?: string;
  request_id?: string;
}

const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    const response = error.response?.data as ApiErrorResponse | undefined;
    return response?.request_id
      ? `${response.message ?? "Request failed"} (${response.request_id})`
      : response?.message ?? "Request failed";
  }
  return "Request failed";
};

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");

  const fetchLocations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<Location[]>("/locations");
      setLocations(response.data);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchLocations();
  }, [fetchLocations]);

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    if (!id.trim() || !title.trim()) return;

    setSaving(true);
    setError(null);
    try {
      await apiClient.post("/locations/admin", {
        id: id.trim(),
        title: title.trim(),
      });
      setId("");
      setTitle("");
      await fetchLocations();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  const handleRename = async (location: Location) => {
    const nextTitle = window
      .prompt("New location title", location.title)
      ?.trim();
    if (!nextTitle || nextTitle === location.title) return;

    setError(null);
    try {
      await apiClient.patch(
        `/locations/admin/${encodeURIComponent(location.id)}`,
        { title: nextTitle },
      );
      await fetchLocations();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  };

  const handleDelete = async (location: Location) => {
    if (!window.confirm(`Delete ${location.title} (${location.id})?`)) return;

    setError(null);
    try {
      await apiClient.delete(
        `/locations/admin/${encodeURIComponent(location.id)}`,
      );
      await fetchLocations();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Locations</h1>
          <p className="mt-1 text-gray-400">
            Manage the venue catalogue used by match forms.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void fetchLocations()}
          className="rounded-lg bg-gray-800 p-3 text-gray-200 hover:bg-gray-700"
          aria-label="Refresh locations"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      <form
        onSubmit={handleCreate}
        className="grid gap-3 rounded-lg bg-gray-900 p-4 md:grid-cols-[1fr_2fr_auto]"
      >
        <input
          value={id}
          onChange={(event) => setId(event.target.value)}
          placeholder="LOCATION_ID"
          pattern="[A-Za-z0-9_-]{1,100}"
          maxLength={100}
          className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
          required
        />
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Display title"
          maxLength={100}
          className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
          required
        />
        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white disabled:bg-gray-600"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </form>

      {error && (
        <div className="rounded-lg border border-red-700 bg-red-950/40 p-4 text-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-gray-300">Loading...</div>
      ) : locations.length === 0 ? (
        <div className="rounded-lg bg-gray-900 p-8 text-center text-gray-400">
          No locations configured.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <article key={location.id} className="rounded-lg bg-gray-900 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-blue-400">
                    <MapPin className="h-5 w-5" />
                    <span className="font-mono text-xs">{location.id}</span>
                  </div>
                  <h2 className="text-lg font-semibold text-white">
                    {location.title}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => void handleRename(location)}
                    className="rounded bg-gray-800 p-2 text-gray-300 hover:text-white"
                    aria-label={`Rename ${location.title}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDelete(location)}
                    className="rounded bg-red-950 p-2 text-red-300 hover:text-red-100"
                    aria-label={`Delete ${location.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
