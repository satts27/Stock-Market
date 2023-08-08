import React from "react";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Stocks({ children }) {
  return (
    <>
      <Layout>
        <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100">
          <div className="px-4 md:px-10 mx-auto w-full -m-24">{children}</div>
        </div>
      </Layout>
    </>
  );
}
