import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar/Navbar";
import "./components/css/App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Services from "./pages/Service";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Footer from "./components/Footer/Footer";
import ScriptInitializer from "./components/Script/ScriptInitializer";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

import "bootstrap-icons/font/bootstrap-icons.css";


function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      {!isLoading && (
        <>
          <ScriptInitializer />
          <Navbar />
          <Home/>
          <About/>
          <Skills/>
          <Services />
          <Projects/>
          <Contact />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
