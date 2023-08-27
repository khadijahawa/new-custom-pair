import React from "react";
import Header from "../components/Header";
import AppFooter from "../components/AppFooter";
import { AppProps } from "next/app";
import { StateContext } from "../../context/StateContext";
import { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
// import "antd/dist/antd";
import "../styles/globals.css";
import "../styles/tabs.css";

import "../../public/fonts/fonts.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
};

export default MyApp;
