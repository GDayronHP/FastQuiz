import React from 'react';
import { Helmet } from "react-helmet";


function SecondLayout({ title, children }) {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <main>{children}</main>
    </div>
  );
}

export default SecondLayout;
