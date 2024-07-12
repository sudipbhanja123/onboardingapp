import React, { useState } from "react";
import { auth, googleProvider } from "../utils/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    console.log("Auth=", auth);
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/tracking");
      console.log("Successfull");
      // Redirect or show logged-in state
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/onboarding");
      // Redirect or show logged-in state
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">Login to your account.</h1>
        <p className="mb-6 text-PrimarySeparator">
          Please sign in to your account
        </p>
        <form onSubmit={handleLogin}>
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
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="/" className="text-primeryBtn text-sm float-right mt-1">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-primeryBtn text-white p-2 rounded font-semibold mt-4"
          >
            Sign In
          </button>
        </form>
        <div className="text-center flex gap-4 justify-center items-center my-4">
          <div className="bg-PrimarySeparator h-[1px] w-[27%]"></div>
          <span className="text-sm text-PrimarySeparator">Or sign in with</span>
          <div className="bg-PrimarySeparator h-[1px] w-[27%]"></div>
        </div>
        <div className="flex justify-center mb-4">
          <button
            onClick={handleGoogleLogin}
            className="bg-white border border-gray-300 rounded-full p-2"
          >
            <img
              className="h-8"
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google sign-in"
            />
          </button>
        </div>
        <div className="text-center">
          <span className="text-sm">Don't have an account? </span>
          <a href="/registration" className="text-primeryBtn text-sm">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
