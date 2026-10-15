import { useState } from "react";
import "../styles/menuNav.css";

function MenuNav({ onCategoriaChange, busqueda, onCambioBusqueda }) {

  const [menuAbierto, setMenuAbierto] = useState(false);

  const seleccionarCategoria = (categoria) => {
    onCategoriaChange(categoria);
    setMenuAbierto(false);
  };

  return (
    <>
      <form className="menu__search" role="search">

        <label htmlFor="busqueda">
          Buscar en toda la carta:
        </label>

        <input
          type="search"
          id="busqueda"
          name="busqueda"
          className="menu__search-input"
          value={busqueda}
          onChange={(e) => onCambioBusqueda(e.target.value)}
        />

      </form>

      <nav className="menu-nav" aria-label="Categorías de la carta">

        <button
          type="button"
          className="menu-nav__toggle boton-estilo"
          aria-expanded={menuAbierto}
          aria-controls="categorias-menu"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          Categorías
          <span aria-hidden="true">
            {menuAbierto ? " ▲" : " ▼"}
          </span>
        </button>

        <ul
          id="categorias-menu"
          className={`menu-nav__list ${menuAbierto ? "menu-nav__list--abierto" : ""}`}
        >

          <li className="menu-nav__item">
            <button
              type="button"
              className="menu-nav__button boton-estilo"
              onClick={() => seleccionarCategoria(null)}
            >
              Todo
            </button>
          </li>

          <li className="menu-nav__item">
            <button
              type="button"
              className="menu-nav__button boton-estilo"
              onClick={() => seleccionarCategoria(2)}
            >
              Arroces y pastas
            </button>
          </li>

          <li className="menu-nav__item">
            <button
              type="button"
              className="menu-nav__button boton-estilo"
              onClick={() => seleccionarCategoria(3)}
            >
              Carnes
            </button>
          </li>

          <li className="menu-nav__item">
            <button
              type="button"
              className="menu-nav__button boton-estilo"
              onClick={() => seleccionarCategoria(4)}
            >
              Pescados
            </button>
          </li>

          <li className="menu-nav__item">
            <button
              type="button"
              className="menu-nav__button boton-estilo"
              onClick={() => seleccionarCategoria(5)}
            >
              Sushi
            </button>
          </li>

          <li className="menu-nav__item">
            <button
              type="button"
              className="menu-nav__button boton-estilo"
              onClick={() => seleccionarCategoria(1)}
            >
              Entrantes
            </button>
          </li>

        </ul>
      </nav>
    </>
  );
}

export default MenuNav;
