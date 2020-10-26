import { HeartFilled, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { HTMLAttributes, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../lib/context";
import { ProductItem } from "../lib/types";
import Row from "./Row";

interface ProductItemCompProps extends HTMLAttributes<HTMLUListElement> {
  productItems: ProductItem[];
}
const ProdcutListContainer = styled.ul`
  margin: 0;
  padding: 0;
`;
const ProductItemContainer = styled.li`
  display: inline-block;
  list-style: none;
  line-height: 1.6;
  border: 1px solid #eee;
  border-radius: 4px;
  margin: 0 0 6px 6px;
  width: 288px;
  &:nth-child(3n + 1) {
    margin-left: 0;
  }
  @media (max-width: 900px) {
    width: 100%;
    margin: 0 0 6px 0;
  }
  &:hover {
    box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.1);
    .thumbnail {
      img {
        transform: scale(1.1);
      }
    }
  }
  .thumbnail {
    height: 150px;
    overflow: hidden;
    border-radius: 4px 4px 0 0;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      transition: all 0.3s;
    }
    @media (max-width: 900px) {
      height: 200px;
    }
  }
  .content {
    padding: 8px;
    .title {
      height: 50px;
      margin: 0;
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .score {
      margin-left: auto;
      font-size: 11px;
      line-height: 16px;
      display: flex;
      align-items: center;
      color: rgb(133, 138, 141);
    }
    .price {
      font-weight: bold;
      margin-right: auto;
    }
  }
`;
const Coupon = styled.div<{ available: boolean }>`
  height: 20px;
  border-radius: 3px;
  padding-left: 6px;
  padding-right: 6px;
  background-color: rgb(248, 248, 249);
  flex: 0 0 auto;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 9px;
  line-height: 12px;
  color: ${({ available }) =>
    available ? "rgb(133, 138, 141)" : "rgb(243, 51, 64)"};
  font-weight: bold;
`;
const ProductList = ({ productItems, ...props }: ProductItemCompProps) => {
  const { cart, addProductToCart, removeProductFromCart } = useContext(
    AppContext
  );
  return (
    <ProdcutListContainer {...props}>
      {productItems.map((productItem, index) => {
        const isInCart = cart.find(
          (cartItem) => cartItem.product.id === productItem.id
        );
        const couponAvailable = productItem.availableCoupon !== false;
        return (
          <ProductItemContainer key={index}>
            <div className="thumbnail">
              <img src={productItem.coverImage} />
            </div>
            <div className="content">
              <Row>
                <Coupon available={couponAvailable}>
                  {couponAvailable ? "쿠폰 가능" : "쿠폰 불가"}
                </Coupon>
                <div className="score">
                  <HeartFilled translate="no" style={{ marginRight: 2 }} />
                  {productItem.score.toLocaleString("en-US")}
                </div>
              </Row>
              <h3 className="title">{productItem.title}</h3>
              <Row>
                <div className="price">
                  {productItem.price.toLocaleString("en-US")}원
                </div>
                {isInCart ? (
                  <Button
                    type="primary"
                    size="small"
                    icon={<MinusOutlined translate="no" />}
                    onClick={() => removeProductFromCart(productItem)}
                    danger
                  >
                    빼기
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    size="small"
                    icon={<PlusOutlined translate="no" />}
                    onClick={() => addProductToCart(productItem)}
                  >
                    담기
                  </Button>
                )}
              </Row>
            </div>
          </ProductItemContainer>
        );
      })}
    </ProdcutListContainer>
  );
};

export default ProductList;
