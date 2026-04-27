const trafficSignalData = {
  red: {
    color: "red",
    duration: 3000,
    next: "yellow",
    enabled: true,
  },
  yellow: {
    color: "yellow",
    duration: 2000,
    next: "green",
    enabled: false,
  },
  green: {
    color: "green",
    duration: 3000,
    next: "red",
    enabled: false,
  },
};

export default trafficSignalData;
