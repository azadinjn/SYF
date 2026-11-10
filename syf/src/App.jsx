
import { BrowserRouter, Routes, Route } from "react-router";

import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";

import Upload from "./pages/Upload.jsx";
import Code from "./pages/Code.jsx";
import Download from "./pages/Download.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import FAQ from "./pages/FAQ.jsx";
import Contact from "./pages/Contact.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import NotFound from "./pages/NotFound.jsx";


import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        
        <Route path="/terms" element={<Terms />} />

        <Route path="/privacy" element={<Privacy />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/faq" element={<FAQ />} />

        <Route path="/about" element={<About />} />

        <Route path="/" element={<Home />} />

        <Route path="/upload" element={<Upload />} />

        <Route path="/code" element={<Code />} />

        <Route path="/download/:code" element={<Download />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      
       <Footer />
    </BrowserRouter>
  );
}

export default App;
