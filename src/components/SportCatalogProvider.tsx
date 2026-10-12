"use client";

import {
  createContext,
  ReactNode,
  useCallback,
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
  refreshSportTypes: () => Promise<void>;
}

const SportCatalogContext = createContext<SportCatalogContextValue>({
  sportTypes: [],
  getSportTitle: (id) => sportTextMap[id] ?? id,
  refreshSportTypes: async () => undefined,
});

export const SportCatalogProvider = ({ children }: { children: ReactNode }) => {
  const [sportTypes, setSportTypes] = useState<SportType[]>([]);

  const refreshSportTypes = useCallback(async () => {
    const response = await apiClient.get<SportType[]>("/sport-types");
    setSportTypes(response.data);
  }, []);

  useEffect(() => {
    void refreshSportTypes()
      .catch(() => {
        // Legacy labels remain available when the public catalogue is offline.
      });
  }, [refreshSportTypes]);

  const value = useMemo(() => {
    const titleById = Object.fromEntries(
      sportTypes.map((sport) => [sport.id, sport.title]),
    );
    return {
      sportTypes,
      getSportTitle: (id: string) =>
        titleById[id] ?? sportTextMap[id] ?? id,
      refreshSportTypes,
    };
  }, [refreshSportTypes, sportTypes]);

  return (
    <SportCatalogContext.Provider value={value}>
      {children}
    </SportCatalogContext.Provider>
  );
};

export const useSportCatalog = () => useContext(SportCatalogContext);

