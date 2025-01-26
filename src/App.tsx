import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContractPage } from "./pages/ContractPage";
import { HomePage } from "./pages/HomePage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contract" element={<ContractPage />} />
        </Routes>
      </div>
    </Router>
  );
}