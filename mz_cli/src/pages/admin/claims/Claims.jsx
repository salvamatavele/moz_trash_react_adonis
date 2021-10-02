import React, { useEffect, useState } from "react";
import Header from "../../../components/admin/Header";
import Side from "../../../components/admin/Side";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Axios from "../../../app/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../../../features/userSlice";

function Claims() {
  /**
   * config
   */
  const dispatch = useDispatch();
  const axios = Axios();

  /**
   * states
   */
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    document.title = 'Reclamações';
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
      <Header />
      <Side />
      <ToastContainer />
      <div id="content" data-uk-height-viewport="expand: true">
        <div className="uk-container uk-container-expand">
          <ul className="uk-breadcrumb">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <span>Reclamações</span>
            </li>
          </ul>
          <legend className="uk-legend">Caixa de Reclamações</legend>
          <div
            className="uk-child-width-1-1@s uk-grid-collapse uk-box-shadow-large "
            uk-grid="true"
          >
            <div className="uk-margin-left" uk-switcher="animation: uk-animation-fade; toggle: > *">
              <button className="uk-button uk-button-default" type="button">
                Todas
              </button>
              <button className="uk-button uk-button-default" type="button">
                Não Lidas
              </button>
              <button className="uk-button uk-button-default" type="button">
                Lidas
              </button>
            </div>

            <ul className="uk-switcher uk-margin ">
              <li>
                <dl className="uk-description-list uk-description-list-divider">
                  {claims.map((item) => {
                    return item.status ? (
                      <div
                        key={item.id}
                        className="uk-box-shadow-small uk-margin uk-margin-left uk-margin-right"
                      >
                        <dt>{item.title}</dt>
                        <dd className="uk-panel uk-text-truncate">
                          {item.content}
                        </dd>
                        <Link to={`/admin/claims/${item.id}`} className="uk-button uk-button-text">
                          Ler mais
                        </Link>
                      </div>
                    ) : (
                      <div
                        key={item.id}
                        className="uk-box-shadow-small uk-background-grey-blue uk-margin uk-margin-left uk-margin-right"
                      >
                        <dt>{item.title}</dt>
                        <dd className="uk-panel uk-text-truncate">
                          {item.content}
                        </dd>
                        <Link to={`/admin/claims/${item.id}`} className="uk-button uk-button-text">
                          Ler mais
                        </Link>
                      </div>
                    );
                  })}
                  {claims.length === 0 && (<dt>Nenhuma reclamação encontrada</dt>)}
                </dl>
              </li>
              <li>
              <dl className="uk-description-list uk-description-list-divider">
                  {claims.map((item) => {
                    return item.status === false && (
                      <div
                        key={item.id}
                        className="uk-box-shadow-small uk-background-grey-blue uk-margin uk-margin-left uk-margin-right"
                      >
                        <dt>{item.title}</dt>
                        <dd className="uk-panel uk-text-truncate">
                          {item.content}
                        </dd>
                        <Link to={`/admin/claims/${item.id}`} className="uk-button uk-button-text">
                          Ler mais
                        </Link>
                      </div>
                    );
                  })}
                  {claims.length === 0 && (<dt>Nenhuma reclamação encontrada</dt>)}
                </dl>
              </li>
              <li>
              <dl className="uk-description-list uk-description-list-divider">
                  {claims.map((item) => {
                    return item.status && (
                      <div
                        key={item.id}
                        className="uk-box-shadow-small uk-margin uk-margin-left uk-margin-right"
                      >
                        <dt>{item.title}</dt>
                        <dd className="uk-panel uk-text-truncate">
                          {item.content}
                        </dd>
                        <Link to={`/admin/claims/${item.id}`} className="uk-button uk-button-text">
                          Ler mais
                        </Link>
                      </div>
                    );
                  })}
                  {claims.length === 0 && (<dt>Nenhuma reclamação encontrada</dt>)}
                </dl>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Claims;
