import Navbar from "./components/Navbar/Navbar";
import "./components/css/App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Services from "./pages/Service";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Footer from "./components/Footer/Footer";
import ScriptInitializer from "./components/ScriptInitializer";

import "bootstrap-icons/font/bootstrap-icons.css";


function App() {
  return (
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
  );
}

export default App;
