import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Anuncios from "./pages/Anuncios.jsx";
import NovoAnuncio from "./pages/NovoAnuncio.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/anuncios" element={<Anuncios />} />
          <Route path="/anuncios/novo" element={<NovoAnuncio />} />
        </Routes>
      </main>
    </div>
  );
}
