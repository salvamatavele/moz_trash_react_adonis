import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import Header from "../../../components/admin/Header";
import Side from "../../../components/admin/Side";
import { useDispatch } from "react-redux";
import Axios from "../../../app/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../../../features/userSlice";
import Swal from "sweetalert2";

function Show() {
  /**
   * config
   */
  const dispatch = useDispatch();
  const axios = Axios();
  const { id } = useParams();
  const history = useHistory();
  /**
   * states
   */
  const [claim, setClaim] = useState([]);

  useEffect(() => {
    document.title = claim.title;
    async function fetchData() {
      try {
        const res = await axios.get(`/admin/claims/${id}`);
        setClaim(res.data);
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

  function destroy() {
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
        onDestroy();
      }
    });
  }
  async function onDestroy() {
    try {
      const res = await axios.delete(`/admin/claims/${id}`);
      if (res.data.success) {
        toast.success("Reclamação eliminada com sucesso.");
        history.push("/admin/claims");
      } else {
        toast.error(
          "Ooops! Erro ao tentar eliminar a reclamação. Por favor tente novamente."
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
      <ToastContainer />
      <div id="content" data-uk-height-viewport="expand: true">
        <div className="uk-container uk-container-expand">
          <ul className="uk-breadcrumb">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/claims">Reclamações</Link>
            </li>
            <li>
              <span>Ver Mais | Reclamação</span>
            </li>
          </ul>
          <article className="uk-article">
            <h1 className="uk-article-title">{claim.title}</h1>

            <p className="uk-article-meta">Criado aos {claim.created_at}</p>

            <p className="uk-text-lead uk-text-justify">{claim.content}</p>
            <div className="uk-grid-small uk-child-width-auto" uk-grid="true">
              <div>
                <Link className="uk-button uk-button-text" to={"/admin/claims"}>
                  voltar
                </Link>
              </div>
              <div>
                <button
                  className="uk-button uk-button-text uk-text-danger"
                  onClick={destroy}
                >
                  Apagar
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}

export default Show;
