import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import "./components/css/App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Services from "./pages/Service";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer/Footer";
import ScriptInitializer from "./components/Script/ScriptInitializer";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

import "bootstrap-icons/font/bootstrap-icons.css";

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  
  // Check if this is a 404 route - skip loading screen for invalid routes
  const is404Route = location.pathname === '/404' || location.pathname === '/not-found' || !['/', '/about', '/skills', '/services', '/projects', '/contact'].includes(location.pathname);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // For 404 routes, skip loading screen
  if (is404Route) {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/404" element={<NotFound />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </>
    );
  }

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

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
