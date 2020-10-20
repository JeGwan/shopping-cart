import { Coupon } from "../lib/types";

const coupons: Coupon[] = [
  {
    type: "rate",
    title: "10% 할인 쿠폰",
    discountRate: 10,
  },
  {
    type: "amount",
    title: "10,000원 할인 쿠폰",
    discountAmount: 10000,
  },
];

export default coupons;
