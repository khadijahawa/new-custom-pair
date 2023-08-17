import React from "react";
import Header from "../components/Header";
import AppFooter from "../components/AppFooter";
import { AppProps } from "next/app";
// import "antd/dist/antd";
import "../styles/globals.css";
import "../styles/tabs.css";

import "../../public/fonts/fonts.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <AppFooter />
    </div>
  );
};

export default MyApp;
