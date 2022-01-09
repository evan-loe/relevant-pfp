import React from "react";
import "./App.css";
import ImageCropper from "./components/ImageCropper";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

library.add(faGithub, faQuestion);

function App() {
  return (
    <div className="background">
      <NavBar />
      <ImageCropper />
      <Footer />
    </div>
  );
}

export default App;
