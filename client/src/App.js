import React, { useLayoutEffect } from "react";
import "./App.css";
import ImageCropper from "./components/ImageCropper";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import PrivacyPolicy from "./components/PrivacyPolicy";

const ScrollToTopWrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTopWrapper>
        <NavBar />
        <Routes>
          <Route path="/" element={<ImageCropper />}></Route>
          <Route path="privacy-policy" element={<PrivacyPolicy />}></Route>
        </Routes>
        <Footer />
      </ScrollToTopWrapper>
    </BrowserRouter>
  );
}

export default App;
