import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Anuncios from "./pages/Anuncios";
import NovoAnuncio from "./pages/NovoAnuncio";
import Navbar from "./components/Navbar";

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
