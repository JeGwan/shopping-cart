import { NextRouter, useRouter } from "next/router";

export const usePagination = () => {
  const router = useRouter();
  let sort = "score",
    order = "desc",
    search: string | undefined;
  let page = Number(router.query.page);
  let itemsPerPage = Number(router.query.itemsPerPage);
  if (!page || page < 1) page = 1;
  if (!itemsPerPage || itemsPerPage < 1) itemsPerPage = 6;
  if (router.query.sort) sort = router.query.sort.toString();
  if (router.query.search) search = router.query.search.toString();
  if (router.query.order) order = router.query.order.toString();
  return { page, search, sort, itemsPerPage, order };
};

export interface Queries {
  [key: string]: any;
}
export function mergeQueryString(router: NextRouter, queries: Queries) {
  const merged = { ...router.query };
  for (let key in queries) {
    if (queries[key] === undefined || queries[key] === "") {
      delete merged[key];
    } else {
      merged[key] = queries[key];
    }
  }
  return `${router.pathname}?${Object.keys(merged)
    .map((key) => `${key}=${merged[key]}`)
    .join("&")}`;
}
