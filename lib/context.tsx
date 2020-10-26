import React, { createContext, ReactNode, useEffect, useState } from "react";
import { CartItem, ProductItem } from "./types";

interface AppContextType {
  cart: CartItem[];
  setCart: (cartItems: CartItem[]) => void;
  addProductToCart: (product: ProductItem) => void;
  removeProductFromCart: (product: ProductItem) => void;
}

interface AppContextProviderProps {
  children?: ReactNode;
}

export const AppContext = createContext<AppContextType>({
  cart: [],
  setCart: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
});

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addProductToCart = (product: ProductItem) => {
    if (!cart.find((cartItem) => cartItem.product.id === product.id)) {
      if (cart.length < 3) {
        setCart(cart.concat({ product, count: 1, buy: true }));
      } else {
        alert("장바구니엔 최대 3개까지만 담을 수 있습니다!");
      }
    }
  };

  const removeProductFromCart = (product: ProductItem) => {
    setCart(cart.filter((cartItem) => cartItem.product.id !== product.id));
  };

  useEffect(() => {
    const rawCart = localStorage.getItem("cart");
    if (rawCart) {
      try {
        const cart = JSON.parse(rawCart) as CartItem[];
        setCart(cart);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error(error);
    }
  }, [cart]);

  return (
    <AppContext.Provider
      value={{ cart, addProductToCart, removeProductFromCart, setCart }}
    >
      {children}
    </AppContext.Provider>
  );
};
