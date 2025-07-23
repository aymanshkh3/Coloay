import react from "react";
import "./App.css";
import Hero from "./pages/hero/Hero";
import Header from "./components/header/Header";
import Contact from "./pages/contact/Contact";
import Services from "./pages/services/Services";
import About from "./pages/aboutpage/About";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
