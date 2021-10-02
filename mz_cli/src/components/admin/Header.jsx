import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/Side.css";
import "../../assets/css/Admin.css";
function Header() {
  return (
    <>
      {/* <!--HEADER--> */}
      <header id="top-head" className="uk-position-fixed">
        <div className="uk-container uk-container-expand uk-background-primary">
          <nav
            className="uk-navbar uk-light"
            data-uk-navbar="mode:click; duration: 250"
          >
            <div className="uk-navbar-left">
              <button
                className="uk-navbar-toggle uk-hidden@m"
                data-uk-toggle
                data-uk-navbar-toggle-icon
                uk-toggle="target: #offcanvas-side"
                title="Menu"
                data-uk-tooltip="Menu"
              ></button>
              <div className="uk-navbar-item uk-visible@s">
                <Link to="/" className="uk-logo">
                  <span>
                    <strong>MOZ TRASH</strong>
                  </span>
                </Link>
              </div>
            </div>
            <div className="uk-navbar-right">
              <ul className="uk-navbar-nav">
                <li>
                  <Link
                    to="/"
                    data-uk-icon="icon:bell"
                    title="Notificações"
                    data-uk-tooltip="Notificações"
                  ></Link>
                </li>
                <span className="uk-badge side-badge-red">0</span>
                <li>
                  <Link
                    to="/"
                    data-uk-icon="icon:calendar"
                    title="Agendas"
                    data-uk-tooltip="Agendas"
                  ></Link>
                </li>
                <li>
                  <Link
                    to="/"
                    data-uk-icon="icon: user"
                    title="Perfil"
                    data-uk-tooltip="Perfil"
                  ></Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      {/* <!--/HEADER--> */}
      {/* <!-- OFFCANVAS SIDE NAV--> */}
      <div id="offcanvas-side" data-uk-offcanvas="overlay: true">
        <div className="uk-offcanvas-bar uk-offcanvas-bar-animation uk-offcanvas-slide">
          <button
            className="uk-offcanvas-close uk-close"
            type="button"
            data-uk-close="true"
          ></button>
          <ul className="uk-nav uk-nav-default">
            <li className="uk-nav-header">Header</li>
            <li>
              <Link to="/">
                <span
                  className="uk-margin-small-right"
                  data-uk-icon="icon: table"
                ></span>
                Item
              </Link>
            </li>
            <li>
              <Link to="/">
                <span
                  className="uk-margin-small-right"
                  data-uk-icon="icon: thumbnails"
                ></span>
                Item
              </Link>
            </li>
            <li className="uk-nav-divider"></li>
            <li>
              <Link to="/">
                <span
                  className="uk-margin-small-right"
                  data-uk-icon="icon: trash"
                ></span>
                Item
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* <!-- /OFFCANVAS --> */}
    </>
  );
}

export default Header;
