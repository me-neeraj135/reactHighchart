import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { engagementHelper } from "../utils";

const Chart = ({ messageCountList, channels }) => {
  const options = engagementHelper.engagementMessageOverTimeChartOptions(
    messageCountList,
    channels
  );

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
