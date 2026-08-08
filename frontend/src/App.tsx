import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Anuncios from "./pages/Anuncios";
import NovoAnuncio from "./pages/NovoAnuncio";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import ContactModal from "./components/ContactModal";

export default function App() {
  const [contatoAberto, setContatoAberto] = useState(false);

  return (
    <div className="app">
      <Navbar aoAbrirContato={() => setContatoAberto(true)} />
      <main className="app__conteudo">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/anuncios" element={<Anuncios />} />
          <Route path="/anuncios/novo" element={<NovoAnuncio />} />
        </Routes>
      </main>
      <BottomNav aoAbrirContato={() => setContatoAberto(true)} />
      <ContactModal aberto={contatoAberto} aoFechar={() => setContatoAberto(false)} />
    </div>
  );
}
