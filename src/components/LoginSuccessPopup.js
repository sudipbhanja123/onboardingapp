import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginSuccessPopup = ({ show, onClose }) => {
  const navigate = useNavigate();

  if (!show) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logout successful", { autoClose: 3000 });
      onClose(); // Close the popup
    } catch (error) {
      toast.error("Failed to logout", { autoClose: 3000 });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-end justify-center">
      <div className="bg-white px-6 rounded-lg shadow-lg text-center mb-20 max-w-sm w-full py-16">
        <div className="mb-4">
          <img
            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTC807m8EnAU1xdtEGHQeAn3LQeQjEzTZQ0ZhJthMKaeqS7fHJW"
            alt="Success"
            className="h-28 mx-auto"
          />
        </div>
        <h2 className="text-2xl font-semibold mb-8">Login Successful</h2>
        {/* <p className="mb-6">You have successfully logged in.</p> */}
        <button
          onClick={() => navigate("/tracking")}
          className="w-full bg-primeryBtn text-white py-2 rounded-full font-semibold mb-8"
        >
          Go to Tracking Screen
        </button>
        <button
          onClick={handleLogout}
          className="w-full text-PrimarySeparator font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LoginSuccessPopup;
