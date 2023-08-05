import Chart from "./components/Chart/Chart";
import messageCountList from "./assets/data/messageCountListData.json";
import channels from "./assets/data/channels.json";
function App() {
  return (
    <>
      <Chart
        messageCountList={messageCountList.messageCountList}
        channels={channels.channels}
      />
    </>
  );
}

export default App;
