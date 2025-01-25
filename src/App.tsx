import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { BeginPage } from "./pages/BeginPage";
import { ContractPage } from "./pages/ContractPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/begin" element={<BeginPage />} />
        <Route path="/contract" element={<ContractPage />} />
      </Routes>
    </BrowserRouter>
  );
}