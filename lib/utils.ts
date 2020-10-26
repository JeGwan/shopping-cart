import { NextRouter, useRouter } from "next/router";
import { CartItem, Coupon } from "./types";

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
export const displayScore = (score: number) => score.toLocaleString("en-US");
export const displayPrice = (price: number) =>
  Math.floor(price).toLocaleString("en-US");
export const calculatePrice = (buyList: CartItem[], coupon?: Coupon) => {
  let couponablePrice = 0,
    notCouponablePrice = 0,
    totalPrice = 0,
    discountPrice = 0;
  buyList.forEach(({ count, product }) => {
    const couponable = product.availableCoupon !== false;
    if (couponable) couponablePrice += product.price * count;
    else notCouponablePrice += product.price * count;
  });
  if (coupon) {
    if (coupon.type === "amount") {
      discountPrice = coupon.discountAmount;
    } else {
      discountPrice = couponablePrice * (coupon.discountRate / 100);
    }
  }
  totalPrice = couponablePrice + notCouponablePrice - discountPrice;
  return {
    totalPrice,
    couponablePrice,
    notCouponablePrice,
    discountPrice,
  };
};
