import React from "react";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar/Sidebar";
import StockNavbar from "../components/Navbar/StockNavbar";
import HeaderStats from "../components/Headers/HeaderStats";
import FooterStock from "../components/Footers/FooterStock";
// import AdminNavbar from "../Navbars/AdminNavbar.js";

export default function Stocks({ children, title, headerText }) {
  return (
    <Layout title={title}>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <StockNavbar title={title} />
        {/* Header */}
        <HeaderStats headerText={headerText} />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          {/* <FooterAdmin /> */}
          <FooterStock />
        </div>
        {/* <div className="px-4 md:px-10 mx-auto w-full -m-24">{children}</div> */}
      </div>
    </Layout>
  );
}
