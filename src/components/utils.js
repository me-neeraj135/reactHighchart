export const engagementHelper = {
  engagementMessageOverTimeChartOptions: (messageCountList, channels) => {
    const channelIdToDateCount = {};

    // Group messageCountList data by channelId and date

    messageCountList.forEach((message, i) => {
      //   console.log(message, `message`);
      const channelId = message.channelId;
      const date = new Date(message.timeBucket);

      //   console.log(channelId, date, `id and date`);

      if (!channelIdToDateCount[channelId]) {
        channelIdToDateCount[channelId] = {};
        // console.log(channelIdToDateCount, `channelIdToDateCount${i}`);
      }

      if (!channelIdToDateCount[channelId][date]) {
        channelIdToDateCount[channelId][date] = 0;
      }
      channelIdToDateCount[channelId][date] += parseInt(message.count);
    });

    // Filter channels that have messages for more than 1 date
    const validChannels = channels?.filter((channel) => {
      const channelId = channel?.id;

      return (
        channelIdToDateCount[channelId] &&
        Object.keys(channelIdToDateCount[channelId]).length > 1
      );
    });
    // console.log(validChannels, `validChannels`);

    // Prepare series data for valid channels
    const seriesData = validChannels?.map((channel) => {
      const channelId = channel.id;
      const data = Object.keys(channelIdToDateCount[channelId]).map((date) => {
        return [
          new Date(date).getTime(),
          channelIdToDateCount[channelId][date],
        ];
      });

      //   console.log("data", data);
      const sortData = data.sort((a, b) => new Date(a.date) - new Date(b.date));

      let convertData = {
        name: channel.name,
        data: sortData,
        // pointStart: sortData[0][0],
        // pointInterval: 24 * 3600 * 1000,
      };
      return convertData;
    });

    // Create the Highcharts options
    const options = {
      chart: {
        type: "line",
      },
      title: {
        text: "Engagement Messages Over Time",
      },
      xAxis: {
        type: "datetime",
      },
      yAxis: {
        title: {
          text: "Message Count",
        },
      },

      tooltip: {
        formatter: function () {
          const date = new Date(this.x).toLocaleDateString();
          const channelName = this.series.name;
          const count = this.y;

          //   console.log(date, channelName, count, `date,channelId,count`);
          return `<b>${date}</b><br>${channelName}: ${count} messages`;
        },
      },
      series: seriesData,
    };

    return options;
  },
};
