import React from "react";
import Head from "next/head";

import Header from "./Header";
import AppFooter from "./AppFooter";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Custom Pair</title>
      </Head>
      <header>
        <Header />
      </header>
      <main className="main-container ">{children}</main>
      <footer>
        <AppFooter />
      </footer>
    </div>
  );
};

export default Layout;
