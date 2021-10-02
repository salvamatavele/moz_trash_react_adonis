import React, { memo, useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "../../app/Axios";
import Logo from "../../assets/images/logo.png";
import { logout, selectUser } from "../../features/userSlice";

function Side() {
  /**
   * Helpers and configs
   */
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const axios = Axios();
  const history = useHistory();
  /**
   * states
   */
  const [claims, setClaims] = useState([]);

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

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/admin/claims");
        setClaims(res.data);
      } catch (error) {
        toast.warning("Oops! We get some problem.");
        if (error.response.status === 401) {
          dispatch(logout());
        }
      }
    }
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <ToastContainer />
      {/* <!-- LEFT BAR --> */}
      <aside id="left-col" className="uk-light uk-visible@m">
        <div className="left-logo uk-flex uk-flex-middle">
          <img className="custom-logo" src={Logo} alt="logo" />
          &nbsp;MOZ TRASH
        </div>
        <div className="left-content-box content-box-dark">
          <div className="uk-position-relative profile-img">
            <Avatar
              name={user.user.name}
              size="50px"
              round="50px"
              textSizeRatio={1.5}
            />
          </div>
          <div>
            <h4 className=" uk-text-center uk-margin-remove-vertical text-light uk-text-bold ">
              {user.user.name + " " + user.user.surname}
            </h4>

            <div className="uk-position-relative uk-text-center uk-display-block">
              <button className="uk-button uk-button-text uk-text-small uk-text-muted uk-display-block uk-text-center uk-text-lowercase">
                <span
                  data-uk-icon="icon: triangle-down; ratio: 0.7"
                  className="uk-margin-small-right"
                ></span>
                {user.user.email}
              </button>
              {/* <!-- user dropdown --> */}
              <div
                className="uk-dropdown user-drop"
                data-uk-dropdown="mode: click; pos: bottom-center; animation: uk-animation-slide-bottom-small; duration: 150"
              >
                <ul className="uk-nav uk-dropdown-nav uk-text-left">
                  <li>
                    <Link to="/">
                      <span data-uk-icon="icon: info"></span> Summary
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <span data-uk-icon="icon: refresh"></span> Edit
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <span data-uk-icon="icon: settings"></span> Configuration
                    </Link>
                  </li>
                  <li className="uk-nav-divider"></li>
                  <li>
                    <Link to="/">
                      <span data-uk-icon="icon: image"></span> Your Data
                    </Link>
                  </li>
                  <li className="uk-nav-divider"></li>
                  <li>
                    <Link to="/">
                      <span data-uk-icon="icon: sign-out"></span> Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
              {/* <!-- /user dropdown --> */}
            </div>
          </div>
        </div>

        <div className="left-nav-wrap">
          <ul className="uk-nav uk-nav-default uk-nav-parent-icon" data-uk-nav>
            <li className="uk-nav-header">ACTIVIDADES</li>
            <li>
              <Link to="/admin/companies">
                <span
                  data-uk-icon="icon: lifesaver"
                  className="uk-margin-small-right"
                ></span>
                Companhias
              </Link>
            </li>
            <li className="uk-parent">
              <Link to="/admin">
                <span
                  data-uk-icon="icon: users"
                  className="uk-margin-small-right"
                ></span>
                Usuários
              </Link>
              <ul className="uk-nav-sub">
                <li>
                  <Link to="/admin/users" title="Contas" uk-tooltip="Contas">
                    Contas
                  </Link>
                </li>
                <li>
                  <Link to="/" title="Acesso" uk-tooltip="Acesso">
                    Níveis de Acesso
                  </Link>
                </li>
                <li>
                  <Link to="/" title="Permissões" uk-tooltip="Permissões">
                    Permissões
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/admin/adverts">
                <span
                  data-uk-icon="icon: album"
                  className="uk-margin-small-right"
                ></span>
                Anúncios
              </Link>
            </li>
            <li>
              <Link to="/admin/tips">
                <span
                  data-uk-icon="icon: question"
                  className="uk-margin-small-right"
                ></span>
                Dicas
              </Link>
            </li>
            <li>
              <Link to="/admin/alerts">
                <span
                  data-uk-icon="icon: info"
                  className="uk-margin-small-right"
                ></span>
                Alertas
              </Link>
            </li>
            <li>
              <Link to="/admin/claims">
                <span
                  data-uk-icon="icon: warning"
                  className="uk-margin-small-right"
                ></span>
                Reclamações
                <span className="uk-badge">{claims.length}</span>
              </Link>
            </li>
          </ul>
          <div className="left-content-box uk-margin-top">
            <h5>Daily Reports</h5>
            <div>
              <span className="uk-text-small">
                Traffic <small>+50</small>
              </span>
              <progress className="uk-progress" value="50" max="100"></progress>
            </div>
            <div>
              <span className="uk-text-small">
                Income <small>+78</small>
              </span>
              <progress
                className="uk-progress success"
                value="78"
                max="100"
              ></progress>
            </div>
            <div>
              <span className="uk-text-small">
                Feedback <small>-12</small>
              </span>
              <progress
                className="uk-progress warning"
                value="12"
                max="100"
              ></progress>
            </div>
          </div>
        </div>
        <div className="bar-bottom">
          <ul
            className="uk-subnav uk-flex uk-flex-center uk-child-width-1-5"
            data-uk-grid="true"
          >
            <li>
              <Link
                to="/dashboard"
                className="uk-icon-link"
                data-uk-icon="icon: home"
                title="Home"
                data-uk-tooltip="Dashboard"
              ></Link>
            </li>
            <li>
              <Link
                to="/admin/schedules"
                className="uk-icon-link"
                data-uk-tooltip="Agendas"
                data-uk-icon="icon: calendar"
              ></Link>
            </li>
            <li>
              <button
                onClick={logOut}
                className="uk-text-danger uk-icon-link"
                data-uk-icon="icon:  sign-out"
                title="Log Out"
                data-uk-tooltip="Log Out"
              ></button>
            </li>
          </ul>
        </div>
      </aside>
      {/* <!-- /LEFT BAR --> */}
    </>
  );
}

export default memo(Side);
