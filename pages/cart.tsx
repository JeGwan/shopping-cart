import { Divider, Typography, Radio } from "antd";
import { useContext, useState } from "react";
import styled from "styled-components";
import CartItem from "../components/CartItem";
import Layout from "../components/Layout";
import Row from "../components/Row";
import Api from "../lib/api";
import { AppContext } from "../lib/context";
import { Coupon } from "../lib/types";
import { calculatePrice, displayPrice } from "../lib/utils";
const { Title } = Typography;
const Price = styled.p`
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  margin-left: auto;
`;
export default function Cart() {
  const { cart } = useContext(AppContext);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | undefined>();
  const response = Api.getCoupons();
  if (!response.success) {
    console.error(`💩 error from server : `, response.message);
    return (
      <Layout title="장바구니">
        오류가 발생했어요. 잠시 후 다시 시도해주세요!
      </Layout>
    );
  }
  const buyList = cart.filter((cartItem) => cartItem.buy);
  const {
    couponablePrice,
    notCouponablePrice,
    discountPrice,
    totalPrice,
  } = calculatePrice(buyList, selectedCoupon);
  return (
    <Layout title="장바구니">
      <Title level={4}>장바구니 리스트</Title>
      {cart.length
        ? cart.map((cartItem) => (
            <CartItem key={cartItem.product.id} cartItem={cartItem} />
          ))
        : "장바구니에 담긴 상품이 없습니다."}
      {buyList.length > 0 && (
        <>
          <Divider />
          <Title level={4}>쿠폰 선택</Title>
          <Radio.Group
            onChange={(e) => setSelectedCoupon(e.target.value)}
            value={selectedCoupon}
          >
            {response.data.coupons.map((coupon, key) => {
              return (
                <Radio style={{ display: "block" }} value={coupon} key={key}>
                  {coupon.title}
                </Radio>
              );
            })}
            <Radio style={{ display: "block" }} value={undefined}>
              미선택
            </Radio>
          </Radio.Group>
          <Divider />
          <Title level={4}>결제 금액</Title>
          <Row>
            <Title level={5} style={{ margin: 0 }}>
              쿠폰 적용 가능 금액(A)
            </Title>
            <Price>{displayPrice(couponablePrice)}원</Price>
          </Row>
          <Row>
            <Title level={5} style={{ margin: 0 }}>
              쿠폰 적용 불가 금액(B)
            </Title>
            <Price>{displayPrice(notCouponablePrice)}원</Price>
          </Row>
          <Row>
            <Title level={5} style={{ margin: 0 }}>
              할인 금액(C)
            </Title>
            <Price>{displayPrice(discountPrice)}원</Price>
          </Row>
          <Divider />
          <Row>
            <Title level={5} style={{ margin: 0 }}>
              최종 결제 금액(A+B-C)
            </Title>
            <Price>{displayPrice(totalPrice)}원</Price>
          </Row>
        </>
      )}
    </Layout>
  );
}
