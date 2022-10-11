import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { Book } from "../types";

interface VolumesSearchResult {
  items: Book[];
  totalItems: number;
}

interface VolumesSearchParams {
  q: string;
  startIndex?: number;
}

export function volumes(
  builder: EndpointBuilder<
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      object,
      FetchBaseQueryMeta
    >,
    never,
    "bookApi"
  >
) {
  return builder.query<VolumesSearchResult, VolumesSearchParams>({
    query: ({ q, startIndex = 0 }) =>
      `volumes?q=${q}&maxResults=20&orderBy=relevance&startIndex=${startIndex}`,
  });
}
