import { Checkbox } from "antd";
import { HTMLAttributes, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../lib/context";
import { CartItem as CartItemType } from "../lib/types";
import { displayPrice } from "../lib/utils";
import NumberInput from "./NumberInput";
import Row from "./Row";
const CartItemComp = styled.div`
  display: flex;
  margin-top: 6px;
  border-radius: 4px;
  border: 1px solid #eee;
  &:first-child {
    margin-top: 0;
  }
  .thumbnail {
    flex: 0 0 200px;
    height: 150px;
    border-radius: 4px 0 0 4px;
    overflow: hidden;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      transition: all 0.3s;
    }
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }
  .content {
    padding: 6px 12px;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    .title {
      font-size: 18px;
      margin-bottom: auto;
    }
    .price {
      font-weight: bold;
      font-size: 16px;
      text-align: right;
    }
  }
`;

interface CartItemProps extends HTMLAttributes<HTMLDivElement> {
  cartItem: CartItemType;
}
const CartItem = ({ cartItem, ...props }: CartItemProps) => {
  const { cart, setCart } = useContext(AppContext);
  const handleChangeCount = (productId: string, count: number) => {
    if (count === 0) {
      if (confirm("장바구니에서 삭제하시겠습니까?")) {
        setCart(cart.filter((cartItem) => cartItem.product.id !== productId));
      }
    } else {
      setCart(
        cart.map((cartItem) => {
          if (cartItem.product.id === productId) {
            cartItem.count = count;
          }
          return cartItem;
        })
      );
    }
  };
  const handleBuyCheck = (productId: string, buy: boolean) => {
    setCart(
      cart.map((cartItem) => {
        if (cartItem.product.id === productId) {
          cartItem.buy = buy;
        }
        return cartItem;
      })
    );
  };
  return (
    <CartItemComp {...props}>
      <div className="thumbnail">
        <img src={cartItem.product.coverImage} alt="썸네일" />
      </div>
      <div className="content">
        <Checkbox
          className="buy"
          style={{ marginLeft: "auto" }}
          checked={cartItem.buy}
          onChange={(e) =>
            handleBuyCheck(cartItem.product.id, e.target.checked)
          }
        >
          구매
        </Checkbox>
        <h3 className="title">{cartItem.product.title}</h3>
        <div className="price">{displayPrice(cartItem.product.price)}원</div>
        <Row>
          <NumberInput
            style={{ margin: "0 2px 0 auto" }}
            value={cartItem.count}
            onValueChange={(count) =>
              handleChangeCount(cartItem.product.id, count)
            }
          />
          <span>개</span>
        </Row>
      </div>
    </CartItemComp>
  );
};
export default CartItem;
