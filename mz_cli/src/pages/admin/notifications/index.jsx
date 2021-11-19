import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../../../app/Axios";
import Header from "../../../components/admin/Header";
import Side from "../../../components/admin/Side";
import { logout } from "../../../features/userSlice";
import Load from '../../../components/Load';

function Notifications() {
  /**
   * configs
   */
  const axios = Axios();
  const dispatch = useDispatch();

  /**states
   * useStates
   */
  const [notifications, setNotifications] = useState([]);
  const [load,setLoad] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/admin/notifications");
        setNotifications(response.data);
        setLoad(false)
      } catch (error) {
        setLoad(false)
        toast.error("Ooops!Ocorreu algum problema");
        if (error.response) {
          console.log(error.response);
          if (error.response.status === 401) {
            dispatch(logout());
          }
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
      <div id="content" data-uk-height-viewport="expand: true">
        <div className="uk-container uk-container-expand">
          <ul className="uk-breadcrumb">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <span>Notificações</span>
            </li>
          </ul>
          <h4 className="uk-heading-line uk-text-bold">
            <span>Notificações</span>
          </h4>
          <dl className="uk-description-list uk-description-list-divider">
            {notifications.map((notify) => {
              return notify.status === true ? (
                <>
                  <dt key={notify.id}>
                    <Link
                      to={`/admin/notifications/${notify.id}`}
                      className="uk-button-text"
                    >
                      {notify.title}
                    </Link>
                  </dt>
                  <dd>{notify.content.substr(0, 100)}...</dd>
                </>
              ) : (
                <>
                  <dt className="uk-text-bolde" key={notify.id}>
                    <Link
                      to={`/admin/notifications/${notify.id}`}
                      className="uk-button-text"
                    >
                      {notify.title}
                    </Link>
                  </dt>
                  <dd className="uk-text-bolder">
                    {notify.content.substr(0, 100)}...
                  </dd>
                </>
              );
            })}
            {notifications.length === 0 && (
              <dt>Nenhuma notificação enviada!</dt>
            )}
          </dl>
          <Load load={load}/>

        </div>
      </div>
    </>
  );
}

export default Notifications;
