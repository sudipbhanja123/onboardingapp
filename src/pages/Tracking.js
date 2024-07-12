import React, { useState } from "react";
import RandomQuotes from "../components/Randomquotes";
import AnalogClock from "../components/AnalogClock";

const Tracking = () => {
  const [speed, setSpeed] = useState(1);
  const [clockTime, setClockTime] = useState(new Date());

  // Function to handle the speed change
  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  };

  // Function to handle the share button
  const handleShare = () => {
    const currentUrl = window.location.href;
    const newUrl = `${currentUrl}?time=${clockTime.getTime()}&speed=${speed}`;
    navigator.clipboard.writeText(newUrl);
    alert("URL copied to clipboard");
  };

  // Update clockTime based on speed
  React.useEffect(() => {
    const timer = setInterval(() => {
      setClockTime((prevTime) => new Date(prevTime.getTime() - 1000 * speed));
    }, 1000);

    return () => clearInterval(timer);
  }, [speed]);

  return (
    // <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    //   <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
    //     <h1 className="text-2xl font-bold mb-4">Tracking Screen</h1>
    //     <div className="mb-4">
    //       <AnalogClock time={clockTime} />
    //     </div>
    //     <div className="mb-4">
    //       <label className="block mb-2 text-sm font-medium">
    //         Speed Control
    //       </label>
    //       <input
    //         type="range"
    //         min="0.5"
    //         max="2"
    //         step="0.1"
    //         value={speed}
    //         onChange={handleSpeedChange}
    //         className="w-full"
    //       />
    //     </div>
    //     <button
    //       onClick={handleShare}
    //       className="bg-orange-500 text-white p-2 rounded font-semibold mt-4"
    //     >
    //       Share
    //     </button>
    //   </div>
    // </div>

    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Tracking Screen</h1>
        <div className="mb-4 flex justify-center items-center">
          <AnalogClock time={clockTime} />
          {/* <Clock datediff={clockTime} /> */}
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">
            Speed Control
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speed}
            onChange={handleSpeedChange}
            className="w-full"
          />
        </div>
        <button
          onClick={handleShare}
          className="bg-orange-500 text-white p-2 rounded font-semibold mt-4"
        >
          Share
        </button>
        <RandomQuotes />
      </div>
    </div>
  );
};

export default Tracking;
