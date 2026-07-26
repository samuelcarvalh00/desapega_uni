import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        ♻️ Desapega UNI
      </Link>
      <nav className="navbar__links">
        <Link to="/anuncios">Anúncios</Link>
        <Link to="/anuncios/novo" className="navbar__cta">
          Anunciar item
        </Link>
      </nav>
    </header>
  );
}
