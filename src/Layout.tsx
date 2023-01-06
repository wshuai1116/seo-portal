import { Helmet } from "react-helmet";
import { FC, useEffect, useState } from "react";

const Layout: FC = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>Seogo</title>
      </Helmet>

      {children}
    </>
  );
};

export default Layout;
