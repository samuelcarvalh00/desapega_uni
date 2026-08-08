import { Link } from "react-router-dom";

interface NavbarProps {
  aoAbrirContato: () => void;
}

export default function Navbar({ aoAbrirContato }: NavbarProps) {
  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        <img src="/mascote-unifor.png" alt="Mascote UNIFOR" className="navbar__mascote" />
        Desapega UNI
      </Link>
      <nav className="navbar__links">
        <Link to="/anuncios">Anúncios</Link>
        <button className="navbar__link-botao" onClick={aoAbrirContato}>
          Contato
        </button>
        <Link to="/anuncios/novo" className="navbar__cta">
          Anunciar item
        </Link>
      </nav>
    </header>
  );
}
