import React from "react";
import "../styles/Clock.css";

const AnalogClock = ({ time, title }) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hoursStyle = {
    transform: `rotate(${(hours % 12) * 30}deg)`,
  };
  const minutesStyle = {
    transform: `rotate(${minutes * 6}deg)`,
  };
  const secondsStyle = {
    transform: `rotate(${seconds * 6}deg)`,
  };

  return (
    <div className="clock">
      <h3>{title}</h3>
      <div className="analog-clock">
        <div className="dial seconds" style={secondsStyle}></div>
        <div className="dial minutes" style={minutesStyle}></div>
        <div className="dial hours" style={hoursStyle}></div>
      </div>
      <div className="digital-clock">
        {hours < 10 ? `0${hours}` : hours}:
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </div>
  );
};

export default AnalogClock;
