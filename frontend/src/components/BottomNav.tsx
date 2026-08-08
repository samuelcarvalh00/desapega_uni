import { NavLink } from "react-router-dom";

export default function BottomNav() {
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

      <NavLink
        to="/anuncios/novo"
        className={({ isActive }) => `bottom-nav__item bottom-nav__item--destaque ${isActive ? "bottom-nav__item--ativo" : ""}`}
      >
        <span className="bottom-nav__icone bottom-nav__icone--destaque">+</span>
        <span>Anunciar</span>
      </NavLink>
    </nav>
  );
}
