
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";

import "./App.css";

const Upload = lazy(() => import("./pages/Upload.jsx"));
const Code = lazy(() => import("./pages/Code.jsx"));
const Download = lazy(() => import("./pages/Download.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const FAQ = lazy(() => import("./pages/FAQ.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Privacy = lazy(() => import("./pages/Privacy.jsx"));
const Terms = lazy(() => import("./pages/Terms.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
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
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
