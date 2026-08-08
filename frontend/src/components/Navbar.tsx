import { useState } from "react";
import { Link } from "react-router-dom";
import { isAdmin, toggleAdmin } from "../visitor";

export default function Navbar() {
  const [adminAtivo, setAdminAtivo] = useState(isAdmin());

  function handleToggleAdmin() {
    const proximo = toggleAdmin();
    setAdminAtivo(proximo);
    window.location.reload();
  }

  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        <img src="/mascote-unifor.png" alt="Mascote UNIFOR" className="navbar__mascote" />
        Desapega UNI
      </Link>
      <nav className="navbar__links">
        <button
          onClick={handleToggleAdmin}
          className={`navbar__admin-btn ${adminAtivo ? "navbar__admin-btn--ativo" : ""}`}
          title={adminAtivo ? "Modo Admin Ativo (você pode deletar qualquer anúncio)" : "Ativar Modo Admin"}
        >
          👑 {adminAtivo ? "Admin ON" : "Admin"}
        </button>
        <Link to="/anuncios">Anúncios</Link>
        <Link to="/anuncios/novo" className="navbar__cta">
          Anunciar item
        </Link>
      </nav>
    </header>
  );
}
