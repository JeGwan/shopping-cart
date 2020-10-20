interface RateCoupon {
  type: "rate";
  title: string;
  discountRate: number;
}

interface AmountCoupon {
  type: "amount";
  title: string;
  discountAmount: number;
}

export type Coupon = RateCoupon | AmountCoupon;

export interface ProductItem {
  id: string;
  title: string;
  coverImage: string;
  price: number;
  score: number;
  availableCoupon?: boolean;
}
