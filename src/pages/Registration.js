import React, { useState } from "react";
import { auth, googleProvider, database } from "../utils/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { ref, set } from "firebase/database";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("You must accept the terms and conditions to register.");
      return;
    }
    try {
      set(ref(database, "users/" + uuid()), {
        id: uuid(),
        email: email,
        username: username,
        password: password,
        termsAccepted: termsAccepted,
      }).then(() => {
        console.log("User created successfully");
      });
      //   console.log("Registered with email:", email);
      // Redirect or show logged-in state
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userId = user.uid;
      set(ref(database, "users/" + userId), {
        id: uuid(),
        email: user.email,
        username: user.displayName,
        termsAccepted: true,
      });
      // Redirect or show logged-in state
    } catch (error) {
      console.error("Error during Google sign-up:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Create your new account</h1>
        <p className="mb-6">
          Create an account to start looking for the food you like
        </p>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
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
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">User Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
              />
              <span className="text-sm">
                I agree with{" "}
                <a href="/" className="text-primeryBtn">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/" className="text-primeryBtn">
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-primeryBtn text-white p-2 rounded font-semibold mt-4"
          >
            Register
          </button>
        </form>
        <div className="text-center flex gap-4 justify-center items-center my-4">
          <div className="bg-PrimarySeparator h-[1px] w-[27%]"></div>
          <span className="text-sm text-PrimarySeparator">Or sign in with</span>
          <div className="bg-PrimarySeparator h-[1px] w-[27%]"></div>
        </div>
        <div className="flex justify-center mb-4">
          <button
            onClick={handleGoogleSignUp}
            className="bg-white border border-gray-300 rounded-full p-2"
          >
            <img
              className="h-8"
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google sign-up"
            />
          </button>
        </div>
        <div className="text-center">
          <span className="text-sm">Have an account? </span>
          <button
            onClick={() => {
              navigate("/registration");
            }}
            className="text-primeryBtn text-sm"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
