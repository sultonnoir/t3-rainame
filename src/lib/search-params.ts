// src/lib/search-params.ts
import { parseAsFloat, createLoader } from "nuqs/server";

export const coordinatesSearchParams = {
  page: parseAsFloat.withDefault(1),
};

export const loadSearchParams = createLoader(coordinatesSearchParams);
