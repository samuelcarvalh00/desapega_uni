import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Anuncios from "./pages/Anuncios";
import AnuncioDetalhe from "./pages/AnuncioDetalhe"; // <-- NOVO
import NovoAnuncio from "./pages/NovoAnuncio";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app__conteudo">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/anuncios" element={<Anuncios />} />
          <Route path="/anuncios/:id" element={<AnuncioDetalhe />} /> {/* <-- NOVO */}
          <Route path="/anuncios/novo" element={<NovoAnuncio />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}