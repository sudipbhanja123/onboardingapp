import React, { useState, useEffect } from "react";
import RandomQuotes from "../components/Randomquotes";
import AnalogClock from "../components/AnalogClock";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebaseConfig";
import { toast } from "react-toastify";
import { getQueryParams } from "../utils/getQueryParams";
import "react-toastify/dist/ReactToastify.css";

const Tracking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = getQueryParams(location.search);

  const initialSpeed = parseFloat(queryParams.get("speed")) || 1;
  const initialTimeValue = parseInt(queryParams.get("time"));
  const initialTime = isNaN(initialTimeValue)
    ? new Date()
    : new Date(initialTimeValue);

  const [speed, setSpeed] = useState(initialSpeed);
  const [clockTime, setClockTime] = useState(initialTime);

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  };

  const handleShare = () => {
    const currentUrl = location.pathname;
    const newUrl = `${
      window.location.origin
    }${currentUrl}?time=${clockTime.getTime()}&speed=${speed}`;
    navigator.clipboard.writeText(newUrl);
    toast.success("URL Copied", { autoClose: 3000 });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setClockTime((prevTime) => new Date(prevTime.getTime() - 1000 * speed));
    }, 1000);

    return () => clearInterval(timer);
  }, [speed]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logout successful", { autoClose: 3000 });
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout", { autoClose: 3000 });
    }
  };
  console.log("Time=", initialTime);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="p-8 rounded shadow-md w-full max-w-md text-center bg-white h-screen md:h-auto">
        <button
          onClick={handleLogout}
          className=" text-primeryBtn p-3 ml-64 rounded font-semibold cursor-pointer hover:underline"
        >
          Logout
        </button>
        <h1 className="text-2xl font-bold mb-4">Tracking Screen</h1>
        <div className="mb-4 flex justify-center items-center">
          <AnalogClock time={clockTime} />
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
        <div className="">{speed}</div>
        <button
          onClick={handleShare}
          className="bg-primeryBtn text-white p-2 rounded font-semibold mt-4"
        >
          Share
        </button>
        <RandomQuotes />
      </div>
    </div>
  );
};

export default Tracking;
