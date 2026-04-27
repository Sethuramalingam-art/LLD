import "./App.css";
import trafficSignalData from "../src/data";
import TrafficSignal from "../src/TrafficSignal";

function App() {
  return (
    <div className="App">
      <header className="App-header"> Traffic Signal - LLD</header>
      <TrafficSignal data={trafficSignalData} />
    </div>
  );
}

export default App;
