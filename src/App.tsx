import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { BeginPage } from "./pages/BeginPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/begin" element={<BeginPage />} />
      </Routes>
    </BrowserRouter>
  );
}