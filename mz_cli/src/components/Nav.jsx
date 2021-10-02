import React, { memo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../assets/images/logo.png";
import Avatar from "react-avatar";
import Claim from "../pages/claim/index";
import "../assets/css/Nav.css";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import Axios from "../app/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Nav() {
  /**
   * config
   */
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const axios = Axios();
  const history = useHistory();

  /**
   * states
   */
   const [open,setOpen] = useState(false);

   function claim(){
     setOpen(true)
   }
  async function logOut() {
    try {
      const res = await axios.post("/logout");
      if (res.data.revoke) {
        dispatch(logout());
        toast.success("User logged out successfuly.");
        history.push("/");
      } else {
        toast.error("Oops! Error to logout!");
      }
    } catch (error) {
      toast.warning("Oops! We get some problem.");
      if (error.response.status === 401) {
        dispatch(logout());
      }
    }
  }

  return (
    <>
      <ToastContainer />
      {/* <!--HEADER--> */}
      <header
        id="header"
        className="uk-background-blue"
        data-uk-sticky="show-on-up: true; animation: uk-animation-fade; media: @l"
      >
        <div className="uk-container">
          <nav id="navbar" data-uk-navbar="mode: click;">
            <div className="uk-navbar-left nav-overlay uk-visible@m">
              <ul className="uk-navbar-nav">
                <li>
                  {user.isLogged ? (
                    <>
                      <Avatar
                        name={user.user.name}
                        size="30px"
                        round="50px"
                        textSizeRatio={1.7}
                      />
                      <button className="uk-button uk-button-text uk-text-capitalize">
                        {user.user.name + " " + user.user.surname}
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      title="Sign In"
                      uk-tooltip="SIgn In"
                      className="uk-link-text uk-text-danger"
                    >
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            </div>

            <div className="uk-navbar-center nav-overlay">
              <li
                className="uk-navbar-item uk-logo"
                title="Moz Trash"
                uk-tooltip="Moz Trash"
              >
                <img width="50" src={logo} alt="Logo" />
              </li>
            </div>
            <div className="uk-navbar-right nav-overlay">
              <button
                className="uk-navbar-toggle uk-visible@m uk-text-white"
                data-uk-search-icon
                data-uk-toggle="target: .nav-overlay; animation: uk-animation-fade"
              ></button>
              <div className="uk-navbar-item">
                <button
                  className="uk-visible@s uk-text-white"
                  data-uk-icon="bell"
                ></button>
                <span className="uk-badge badge-red uk-visible@s">0</span>
                &nbsp;&nbsp;
                <button
                  className="uk-visible@s uk-text-white"
                  data-uk-icon="comment"
                ></button>
                <span className="uk-badge badge-blue uk-visible@s">0</span>
                &nbsp;&nbsp;
                {user.isLogged && (
                  <button
                    onClick={logOut}
                    className="uk-visible@s uk-text-danger"
                    data-uk-icon="sign-out"
                    title=""
                    uk-tooltip="logout"
                  ></button>
                )}
                <button
                  uk-toggle="target: #offcanvas-nav"
                  className="uk-navbar-toggle uk-hidden@m"
                  data-uk-toggle
                  data-uk-navbar-toggle-icon
                ></button>
              </div>
            </div>
            <div className="nav-overlay uk-navbar-left uk-flex-1" hidden={true}>
              <div className="uk-navbar-item uk-width-expand">
                <form className="uk-search uk-search-navbar uk-width-1-1">
                  <input
                    className="uk-search-input"
                    type="search"
                    placeholder="Search..."
                  />
                </form>
              </div>
              <button
                className="uk-navbar-toggle"
                data-uk-close="true"
                data-uk-toggle="target: .nav-overlay; animation: uk-animation-fade"
              ></button>
            </div>
          </nav>
        </div>
      </header>
      {/* <!--/HEADER--> */}
      {/* <!-- NAVIGATION --> */}
      <div className="uk-container">
        <nav className="nav-scroll">
          <ul className="uk-subnav uk-flex uk-flex-between uk-flex-nowrap">
            <li className="uk-active">
              <button className="uk-button uk-button-text">Dicas</button>
            </li>
            <li>
              <button className="uk-button uk-button-text">Anúncios</button>
            </li>
            <li>
              <button className="uk-button uk-button-text">Notificar</button>
            </li>
            <li className="uk-visible@s">
              <button className="uk-button uk-button-text"
              onClick={claim}>
                Caixa de Reclamações
              </button>
            </li>
          </ul>
        </nav>
        {user.user.company_id === null && (
          <div className="uk-alert-danger" uk-alert="true">
            <li className="uk-alert-close" uk-close="true"></li>
            <p>
              <strong>Seja bem vindo NOME clique </strong>
              <li className="uk-button uk-button-link">AQUI</li>
              para actualizar o seu município e finalizar o registo.
            </p>
          </div>
        )}
      </div>
      {/* <!-- /NAVIGATION --> */}
      <Claim open={open} onClose={setOpen}/>

      {/* <!-- OFFCANVAS --> */}
      <div id="offcanvas-nav" data-uk-offcanvas="flip: true; overlay: true">
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

export default memo(Nav);
