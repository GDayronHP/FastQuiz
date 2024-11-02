import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/header.jsx";

function MainLayout({ title, children }) {
  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <header>
        <Header />
      </header>
      {children}
    </React.Fragment>
  );
}

export default MainLayout;
