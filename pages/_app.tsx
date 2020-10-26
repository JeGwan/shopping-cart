import "../lib/custom.less";
import App from "next/app";
import { AppContextProvider } from "../lib/context";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    );
  }
}
