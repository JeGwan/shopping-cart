import React, { createContext, ReactNode, useEffect, useState } from "react";
import { CartItem, ProductItem } from "./types";

interface AppContextType {
  cart: CartItem[];
  addProductToCart: (product: ProductItem) => void;
  removeProductFromCart: (product: ProductItem) => void;
}

interface AppContextProviderProps {
  children?: ReactNode;
}

export const AppContext = createContext<AppContextType>({
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
});

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addProductToCart = (product: ProductItem) => {
    if (!cart.find((cartItem) => cartItem.product.id === product.id)) {
      setCart(cart.concat({ product, count: 1 }));
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
      value={{ cart, addProductToCart, removeProductFromCart }}
    >
      {children}
    </AppContext.Provider>
  );
};
