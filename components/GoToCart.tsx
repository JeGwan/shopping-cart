import { Button } from "antd";
import Link from "next/link";
import { HTMLAttributes, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../lib/context";

export const GoToCartContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 100;
  max-width: 900px;
  height: 50px;
  margin: 0 auto;
  padding: 0 12px;
  display: flex;
  align-items: center;
  background-color: black;
  color: white;
`;
interface GoToCartProps extends HTMLAttributes<HTMLDivElement> {}
const GoToCart = (props: GoToCartProps) => {
  const { cart } = useContext(AppContext);
  if (cart.length === 0) return null;
  return (
    <GoToCartContainer {...props}>
      <div>
        총 <b>{cart.length}개</b>의 상품이 담겼습니다.
      </div>
      <Link href="/cart">
        <Button type="primary" size="small" style={{ marginLeft: "auto" }}>
          장바구니로 이동
        </Button>
      </Link>
    </GoToCartContainer>
  );
};

export default GoToCart;
