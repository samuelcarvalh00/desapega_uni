import { useState } from "react";
import { Link } from "react-router-dom";
import { isAdmin, setAdmin } from "../visitor";

export default function Navbar() {
  const [adminAtivo, setAdminAtivo] = useState(isAdmin());

  function handleSairAdmin() {
    setAdmin(false);
    setAdminAtivo(false);
    window.location.reload();
  }

  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        <img src="/mascote-unifor.png" alt="Mascote UNIFOR" className="navbar__mascote" />
        Desapega UNI
      </Link>
      <nav className="navbar__links">
        {adminAtivo && (
          <button
            onClick={handleSairAdmin}
            className="navbar__admin-btn navbar__admin-btn--ativo"
            title="Modo Admin Ativo — clique para desativar"
          >
            👑 Admin ON
          </button>
        )}
        <Link to="/anuncios">Anúncios</Link>
        <Link to="/anuncios/novo" className="navbar__cta">
          Anunciar item
        </Link>
      </nav>
    </header>
  );
}
