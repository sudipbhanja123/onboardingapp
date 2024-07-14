import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [userExists, setUserExists] = useState(null);
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const checkUser = async () => {
    const db = getDatabase();
    const usersRef = ref(db, "users");
    const emailQuery = query(usersRef, orderByChild("email"), equalTo(email));

    try {
      const snapshot = await get(emailQuery);
      if (snapshot.exists()) {
        setUserExists(true);
        return true;
      } else {
        setUserExists(false);
        return false;
      }
    } catch (error) {
      console.error("Error checking user: ", error);
      return false;
    }
  };

  const sendResetEmail = async (e) => {
    e.preventDefault();
    const userExistsResponse = await checkUser();

    if (userExistsResponse) {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success(`Password reset email sent to ${email}`, {
            autoClose: 3000,
          });
          setOtpSent(true);
        })
        .catch((error) => {
          console.error("Error sending password reset email: ", error);
          toast.error(
            "Failed to send password reset email. Please try again.",
            {
              autoClose: 3000,
            }
          );
        });
    } else {
      toast.error("User does not exist!", { autoClose: 3000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {otpSent ? (
          <div>
            <p className="mb-6 text-PrimarySeparator">
              If an account with the provided email exists, a password reset
              email has been sent. Please check your email.
            </p>
            <button
              className="w-full bg-primeryBtn text-white p-2 font-semibold mt-4 rounded-full"
              onClick={() => {
                navigate("/login");
              }}
            >
              Go To Login
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4">Forgot password?</h2>
            <p className="mb-6 text-PrimarySeparator">
              Enter your email address and we’ll send you a confirmation code to
              reset your password.
            </p>

            <form onSubmit={sendResetEmail}>
              <label className="block mb-2 text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className="w-full bg-primeryBtn text-white p-2 font-semibold mt-4 rounded-full"
                type="submit"
              >
                Continue
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
