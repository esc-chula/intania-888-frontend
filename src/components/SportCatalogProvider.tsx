"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiClient } from "@/api/axios";
import { sportTextMap } from "@/components/match/MatchMapAndList";

interface SportType {
  id: string;
  title: string;
}

interface SportCatalogContextValue {
  sportTypes: SportType[];
  getSportTitle: (id: string) => string;
}

const SportCatalogContext = createContext<SportCatalogContextValue>({
  sportTypes: [],
  getSportTitle: (id) => sportTextMap[id] ?? id,
});

export const SportCatalogProvider = ({ children }: { children: ReactNode }) => {
  const [sportTypes, setSportTypes] = useState<SportType[]>([]);

  useEffect(() => {
    let active = true;
    void apiClient
      .get<SportType[]>("/sport-types")
      .then((response) => {
        if (active) setSportTypes(response.data);
      })
      .catch(() => {
        // Legacy labels remain available when the public catalogue is offline.
      });
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => {
    const titleById = Object.fromEntries(
      sportTypes.map((sport) => [sport.id, sport.title]),
    );
    return {
      sportTypes,
      getSportTitle: (id: string) =>
        titleById[id] ?? sportTextMap[id] ?? id,
    };
  }, [sportTypes]);

  return (
    <SportCatalogContext.Provider value={value}>
      {children}
    </SportCatalogContext.Provider>
  );
};

export const useSportCatalog = () => useContext(SportCatalogContext);

