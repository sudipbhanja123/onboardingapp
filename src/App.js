import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration";
import Tracking from "./pages/Tracking";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<OnboardingPage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/tracking" element={<Tracking />} />
        </Routes>
        {/* <LoginPage /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
