import { NavLink } from "react-router-dom";

interface BottomNavProps {
  aoAbrirContato: () => void;
}

export default function BottomNav({ aoAbrirContato }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `bottom-nav__item ${isActive ? "bottom-nav__item--ativo" : ""}`}
      >
        <span className="bottom-nav__icone">🏠</span>
        <span>Início</span>
      </NavLink>

      <NavLink
        to="/anuncios"
        className={({ isActive }) => `bottom-nav__item ${isActive ? "bottom-nav__item--ativo" : ""}`}
      >
        <span className="bottom-nav__icone">🔎</span>
        <span>Anúncios</span>
      </NavLink>

      <NavLink to="/anuncios/novo" className="bottom-nav__item bottom-nav__item--destaque">
        <span className="bottom-nav__icone bottom-nav__icone--destaque">+</span>
        <span>Anunciar</span>
      </NavLink>

      <button className="bottom-nav__item bottom-nav__item--botao" onClick={aoAbrirContato}>
        <span className="bottom-nav__icone">💬</span>
        <span>Contato</span>
      </button>
    </nav>
  );
}
