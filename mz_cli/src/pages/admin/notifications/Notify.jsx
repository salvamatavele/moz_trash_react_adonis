import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Axios from "../../../app/Axios";
import Header from "../../../components/admin/Header";
import Side from "../../../components/admin/Side";
import { logout } from "../../../features/userSlice";
import Load from '../../../components/Load';

function Notify() {
  const { id } = useParams();
  const axios = Axios();

  const dispatch = useDispatch();
  const history = useHistory();
  /**
   * states
   */
  const [notify, setNotify] = useState([]);
  const [usr, setUser] = useState([]);
  const [load,setLoad] = useState(true)
  // Get notification by id
  useEffect(() => {
    async function fetchData() {
      document.title = "Detalhes|Dicas";
      try {
        const res = await axios.get(`/admin/notification/${id}`);
        setNotify(res.data);
        setUser(res.data.user);
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

  // confirm delete
  function confirm(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        destroy(id);
      }
    });
  }
  // destroy
  async function destroy(id) {
    try {
      const res = await axios.delete(`/admin/notifications/${id}`);
      if (res.data.success) {
        toast.success("Notificação eliminada com sucesso.");
        history.push("/admin/notifications");
      } else {
        toast.error(
          "Ooops! Erro ao tentar eliminar a notificação. Por favor tente novamente."
        );
      }
    } catch (error) {
      toast.error("Ooops!Ocorreu algum problema");
      if (error.response) {
        console.log(error.response);
      }
    }
  }
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
              <Link to="/admin/notifications">Notificações</Link>
            </li>
            <li>
              <span>Detalhes|Notificações</span>
            </li>
          </ul>
          <h4 className="uk-heading-line uk-text-bold">
            <span>Detalhes|Notificação</span>
          </h4>
          <article className="uk-article">
            <h5 className="uk-article-title">{notify.title}</h5>

            <p className="uk-article-meta">
              Written by {usr.name} on{" "}
              <Moment
                data={notify.created_at}
                format="ddd DD/MM/YYYY  HH:MM:SS"
              />
              .
            </p>

            <p>{notify.content}</p>

            <div className="uk-grid-small uk-child-width-auto" uk-grid="true">
              <div>
                <button
                  onClick={() => {
                    confirm(notify.id);
                  }}
                  title=""
                  uk-tooltip="eliminar"
                  className="uk-text-danger"
                  type="button"
                  uk-close="true"
                ></button>{" "}
              </div>
            </div>
          </article>
          <Load load={load}/>
        </div>
      </div>
    </>
  );
}

export default Notify;
