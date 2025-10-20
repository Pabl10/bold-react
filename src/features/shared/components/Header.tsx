import React from 'react';
import './Header.scss';

/**
 * Componente Header del dashboard
 * Incluye el logo de Bold y la navegación
 */
export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <svg className='header__logo-icon' width="79" height="29" viewBox="0 0 79 29"><path d="M23.84 19.003h19.565c-.47 5.047-4.677 9.01-9.783 9.01-5.107 0-9.312-3.963-9.783-9.01h.001zM9.882 8.158v19.81c4.982-.476 8.897-4.736 8.897-9.905S14.864 8.636 9.882 8.16zm23.74-.044c-5.105 0-9.311 3.964-9.782 9.012h19.565c-.47-5.048-4.677-9.012-9.783-9.012zM0 15.344v12.67h7.97V0H0v15.344zM71.03 0v28.013H79V0h-7.97zM60.279 18.064c0 .629.06 1.243.171 1.84.8 4.307 4.35 7.645 8.727 8.064V8.158c-4.983.477-8.898 4.737-8.898 9.906zm-12.843 9.95h7.97V0h-7.97v28.013z"></path><defs><linearGradient id="bold_logo_inline_svg__gradient" x1="78.748" y1="14" x2="0" y2="14" gradientUnits="userSpaceOnUse"><stop offset="0.2" stop-color="#EE424E"></stop><stop offset="0.8" stop-color="#121E6C"></stop></linearGradient></defs></svg>
        </div>
        
        <nav className="header__nav">
          <a href="#" className="header__nav-link">
            Mi negocio
          </a>
          <a href="#" className="header__nav-link header__nav-link--help">
            Ayuda ?
          </a>
        </nav>
      </div>
    </header>
  );
};
