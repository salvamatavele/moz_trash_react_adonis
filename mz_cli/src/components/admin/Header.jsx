import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/Side.css";
import "../../assets/css/Admin.css";
import Axios from "../../app/Axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import logo from "../../assets/images/logo.png";

function Header() {
  /**
   * configs
   */
  const axios = Axios();
  const { user } = useSelector(selectUser);
  /**
   * states
   */
  const [timer, setTimer] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [notifications, setNotifications] = useState([]);

  let counter = 1;

  async function fetchData() {
    console.info(Notification.permission);
    if (window.performance) {
      console.info("window.performance works fine on this browser");
    }

    try {
      const response = await axios.get("/admin/notifications/false");
      if (Notification.permission === "granted") {
        for (const key in response.data) {
          if (counter === performance.navigation.type) {
            showNotification(response.data[key].title);
            setNotifications(response.data);
          }
        }
        counter++;
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            for (const key in response.data) {
              if (counter === performance.navigation.type) {
                showNotification(response.data[key].title);
              }
            }
            counter++;
          }
        });
      }
    } catch (error) {
      if (error.response) {
        toast.warning("Ooops! Ocorreu algum problema.");
        console.log(error.response);
      }
    }
    clearTimeout(timer);
    setTimer(setTimeout(fetchData, 1000));
  }

  useEffect(() => {
    if (!isMounted) {
      fetchData();
      setIsMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function showNotification(body) {
    const notify = new Notification("Nova Notificação", {
      body: body,
      icon: logo,
    });
    notify.onclick = (e) => {
      window.location.href = "http://127.0.0.1:3000/dashboard";
    };
    return notify;
  }
  return (
    <>
      {/* <!--HEADER--> */}
      <ToastContainer />
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
                    to="/#"
                    className="uk-button-link"
                    data-uk-icon="icon:bell"
                    title="Notificações"
                    data-uk-tooltip="Notificações"
                  ></Link>
                  <div
                    uk-dropdown="animation: uk-animation-slide-top-small; duration: 1000"
                    className="uk-background-secondary"
                  >
                    <ul className="uk-nav uk-dropdown-nav  uk-list uk-list-divider">
                      {notifications.map((notify) => {
                        return (
                          <li key={notify.id} className="uk-active">
                            <Link
                              className="uk-link-text"
                              to={`/admin/notifications/${notify.id}`}
                            >
                              {notify.title}
                            </Link>
                          </li>
                        );
                      })}
                      <li className="">
                        <Link
                          className="uk-link-text"
                          to={`/admin/notifications`}
                        >
                          Ver Todas Notificações
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <span className="uk-badge side-badge-red">
                  {notifications.length}
                </span>
                <li>
                  <Link
                    to="/admin/schedules"
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

export default memo(Header);
