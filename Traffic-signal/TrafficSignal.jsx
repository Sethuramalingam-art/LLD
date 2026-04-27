import React, { useState, useEffect, useRef } from "react";

const TrafficSignal = ({ data }) => {
  const [lightState, setLightState] = useState(data);
  const [currentLight, setCurrentLight] = useState(data.red.color);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setCurrentLight(lightState[currentLight].next);
      setLightState((prevState) => {
        const newState = { ...prevState };
        Object.keys(newState).forEach((light) => {
          newState[light].enabled = light === lightState[currentLight].next;
        });
        return newState;
      });
    }, lightState[currentLight].duration);
    return () => clearTimeout(timer.current);
  }, [lightState, currentLight]);

  const handleStart = () => {
    setCurrentLight(data.red.color);
    setLightState((prevState) => {
      const newState = { ...prevState };
      Object.keys(newState).forEach((light) => {
        newState[light].enabled = light === data.red.color;
      });
      return newState;
    });
  };

  const handlePause = () => {
    clearTimeout(timer.current);
  };

  const handleReset = () => {
    clearTimeout(timer.current);
    setCurrentLight(data.red.color);
    setLightState((prevState) => {
      const newState = { ...prevState };
      Object.keys(newState).forEach((light) => {
        newState[light].enabled = light === data.red.color;
      });
      return newState;
    });
  };

  return (
    <>
      <div className="traffic-signal">
        {Object.keys(lightState).map((light) => {
          return (
            <div
              key={light}
              className="light"
              style={{
                backgroundColor: lightState[light].enabled
                  ? lightState[light].color
                  : "white",
              }}
            ></div>
          );
        })}
      </div>
      <div className="light-controls">
        <>
          <button onClick={handleStart}>"Start"</button>
          <button onClick={handlePause}>"Pause"</button>
          <button onClick={handleReset}>"Reset"</button>
        </>
      </div>
    </>
  );
};

export default TrafficSignal;
