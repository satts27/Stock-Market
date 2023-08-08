import React from "react";
import axios from "axios";

import Stocks from "../Layouts/Stocks";

import NewsTable from "../components/charts/NewsTable";
import BarChart from "../components/charts/barchart";
import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
import PageVisits from "../components/charts/PageVisits";

export default function AAPL({
  linechart,
  barchart,
  piechart,
  news,
  indicators,
}) {
  return (
    <>
      <Stocks>
        <div className="flex flex-wrap mt-4 justify-center">
          <div className="w-full mb-12 xl:mb-0 px-4">
            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <BarChart data={barchart} />
              </div>
              <div className="w-full mb-12 xl:mb-0 px-4">
                <LineChart data={linechart} />
              </div>
              <div className="w-full xl:w-12/12 mt-20 mb-12 xl:mb-0 px-4">
                <PieChart piechart={piechart} />
              </div>
            </div>
            <div className="flex flex-wrap mt-4">
              <div className="w-full mb-12 xl:mb-0 px-4">
                <PageVisits indicators={indicators} />
              </div>
              <div className="w-full px-4">
                <NewsTable news={news} />
              </div>
            </div>
          </div>
        </div>
      </Stocks>
    </>
  );
}

export const getStaticProps = async () => {
  const linechart = await axios.get("http://127.0.0.1:5000/AAPLlinechart");
  const barchart = await axios.get("http://127.0.0.1:5000/AAPLbarchart");
  const piechart = await axios.get("http://127.0.0.1:5000/AAPLpiechart");
  const news = await axios.get("http://127.0.0.1:5000/AAPLnews");
  const indicators = await axios.get("http://127.0.0.1:5000/AAPLindicators");
  // console.log(res);
  return {
    props: {
      linechart: linechart.data,
      barchart: barchart.data,
      piechart: piechart.data,
      news: news.data,
      indicators: indicators.data,
      //   piechart: piechart.data,
    },
  };
};

AAPL.layout = Stocks;
