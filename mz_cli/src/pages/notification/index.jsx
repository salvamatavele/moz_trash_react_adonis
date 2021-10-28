import React, { useRef, useState } from "react";
import Nav from "../../components/Nav";
import { useEffect } from "react";
import Axios from "../../app/Axios";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/userSlice";
import Load from "../../components/Load";
import Pagination from "../../components/paginator/Pagination";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import Modal from "react-responsive-modal";

function Notification() {
  /**
   * Configs and Helpers
   */
  const [, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: () => forceUpdate(1) },
    })
  );
  const axios = Axios();
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  /**
   * states
   */
  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState("");
  const [meta, setMeta] = useState({ total: 1, per_page: 5 });
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [load, setLoad] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [busy, setBusy] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    document.title = "Notificacoes";
    async function fetchData() {
      try {
        // You can await here
        const res = await axios.get("/notifications", {
          params: {
            page: currentPage,
            search,
          },
        });
        setMeta(res.data.meta);
        setNotifications(res.data.data);
        setLoad(false);
        // ...
      } catch (error) {
        setLoad(false);
        toast.warning("Ooops! Ocorreu algum problema.");
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
  }, [refresh, currentPage, search]);

  // clear
  function clear(params) {
    setId(0);
    setTitle("");
    setAddress("");
    setContent("");
  }
  // create new
  function create() {
    clear();
    setEdit(false);
    setOpen(true);
  }

  // submit
  async function submit() {
    edit ? update() : store();
  }

  // store tip
  async function store() {
    setBusy(true);
    let form = new FormData();
    form.append("companyId", user.user.company_id);
    form.append("userId", user.user.id);
    form.append("title", title);
    form.append("address", address);
    form.append("content", content);

    if (validator.current.allValid()) {
      try {
        const res = await axios.post("/notifications", form);
        if (res.data.success) {
          toast.success("Notificação enviada com sucesso.");
          setRefresh(!refresh);
          setOpen(false);
          clear();
        } else {
          toast.error(
            "Ooops! Erro ao tentar enviar notificação. Por favor tente novamente."
          );
        }
        setBusy(false);
        return;
      } catch (error) {
        setBusy(false);
        toast.error("Opps!Ocorreu algum problema");
        if (error.response) {
          console.error(error.response);
          if (error.response.data.errors) {
            let message = "";
            for (const key in error.response.data.errors) {
              message += error.response.data.errors[key].message + "\n";
            }
            toast.error(message);
          }
        }
      }
    } else {
      validator.current.showMessages();
      setBusy(false);
    }
  }

  // edit
  function onEdit(item) {
    clear();
    setEdit(true);
    setOpen(true);
    setId(item.id);
    setTitle(item.title);
    setAddress(item.address || "");
    setContent(item.content);
  }

  // update
  async function update() {
    setBusy(true);
    let form = new FormData();
    form.append("companyId", user.user.company_id);
    form.append("userId", user.user.id);
    form.append("title", title);
    form.append("address", address);
    form.append("content", content);
    if (validator.current.allValid()) {
      try {
        const res = await axios.put(`/notifications/${id}`, form);
        if (res.data.success) {
          toast.success("Notificação actualizada com sucesso.");
          setRefresh(!refresh);
          setOpen(false);
          clear();
        } else {
          toast.error(
            "Ooops! Erro ao tentar actualizar. Por favor tente novamente."
          );
        }
        setBusy(false);
        return;
      } catch (error) {
        setBusy(false);
        toast.error("Opps!Ocorreu algum problema");
        if (error.response) {
          console.error(error.response);
          if (error.response.data.errors) {
            let message = "";
            for (const key in error.response.data.errors) {
              message += error.response.data.errors[key].message + "\n";
            }
            toast.error(message);
          }
        }
      }
    } else {
      validator.current.showMessages();
      setBusy(false);
      console.log(validator.current);
    }
  }

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
    setLoad(true);
    try {
      const res = await axios.delete(`/notifications/${id}`);
      if (res.data.success) {
        toast.success("Notificação eliminada com sucesso.");
        setCurrentPage(1);
        setRefresh(!refresh);
      } else {
        toast.error(
          "Ooops! Erro ao tentar eliminar. Por favor tente novamente."
        );
      }
    } catch (error) {
      toast.error("Ooops!Ocorreu algum problema");
      if (error.response) {
        console.log(error.response);
      }
    }
    setLoad(false);
  }

  return (
    <>
      <Nav />
      <ToastContainer />
      <div className="uk-container">
        <h4 className="uk-heading-line uk-text-bold">
          <span>Notificações</span>
        </h4>
        {/* Add button and search */}
        <div className="uk-flex uk-flex-right@m">
          <div className="uk-search uk-search-default">
            <div className="uk-inline">
              <span uk-search-icon="true" />
              <button
                className="uk-form-icon uk-form-icon-flip"
                title="limpar"
                uk-tooltip="limpar"
                uk-icon="icon: close"
                onClick={() => {
                  setSearch("");
                }}
              />
              <input
                v-model="search"
                className="uk-search-input"
                type="search"
                value={search}
                placeholder="pesquisar"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
            </div>
          </div>
          &nbsp;
          <button
            uk-tooltip="Notificar"
            className="uk-button uk-button-primary"
            onClick={create}
          >
            <span uk-icon="icon: plus"></span>
          </button>
        </div>
        <ul uk-accordion="true">
          {notifications.map((notify) => {
            return (
              <li key={notify.id}>
                <a className="uk-accordion-title" href="#">
                  {notify.title}
                </a>
                <div className="uk-accordion-content">
                  <p>-{notify.content}</p>
                  <p>
                    <span uk-icon="icon: location"></span>-{notify.address}
                  </p>
                  {user.user.id === notify.user_id && (
                    <div className="uk-flex uk-flex-right uk-margin-remove-top">
                      <button
                        uk-tooltip="editar"
                        className="uk-button uk-button-link"
                        onClick={() => {
                          onEdit(notify);
                        }}
                      >
                        <span
                          className="uk-text-primary"
                          uk-icon="pencil"
                        ></span>
                      </button>
                      &nbsp;
                      <button
                        uk-tooltip="eliminar"
                        className="uk-button uk-button-link"
                        onClick={() => {
                          confirm(notify.id);
                        }}
                      >
                        <span className="uk-text-danger" uk-icon="close"></span>
                      </button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={meta.total}
          pageSize={meta.per_page}
          onPageChange={(page) => setCurrentPage(page)}
        />
        {notifications.length === 0 && (
          <h5>
            Ainda não fez nenhuma notificação. Aqui você pode notificar um
            problema!
          </h5>
        )}

        {/* Modal form */}
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <div className="uk-width-expand">
            <h3 className="uk-card-title uk-margin-remove-bottom">
              {edit ? `Editar : ${title}` : "Notificar"}
            </h3>
          </div>
          <hr />
          <form className="uk-form-stacked uk-grid-large" uk-grid="true">
            <div className="uk-margin uk-width-1-1">
              <label className="uk-form-label" htmlFor="title">
                Assunto
              </label>
              <input
                className="uk-input"
                id="title"
                type="text"
                placeholder="Assunto..."
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
              <span className="uk-text-danger">
                {validator.current.message(
                  "title",
                  title,
                  "required|min:3|max:255"
                )}
              </span>
            </div>

            <div className="uk-margin uk-width-1-1">
              <label className="uk-form-label" htmlFor="address">
                Local (opcional)
              </label>
              <input
                className="uk-input"
                id="address"
                type="text"
                placeholder="Local"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
              <span className="uk-text-danger">
                {validator.current.message("address", address, "min:3|max:255")}
              </span>
            </div>

            <div className="uk-margin uk-width-1-1">
              <label className="uk-form-label" htmlFor="content">
                Descrição
              </label>
              <textarea
                onChange={(event) => {
                  setContent(event.target.value);
                }}
                value={content}
                className="uk-textarea"
                placeholder="Descreve o anuncio"
              />
              <span className="uk-text-danger">
                {validator.current.message(
                  "content",
                  content,
                  "required|min:10"
                )}
              </span>
            </div>
          </form>
          <hr />
          <div className="uk-card-footer uk-float-right">
            <button className="uk-button uk-button-default" onClick={clear}>
              Limpar
            </button>
            <button
              className="uk-button uk-button-primary"
              disabled={busy}
              onClick={submit}
            >
              Enviar
              {busy && <div uk-spinner="ratio: 0.6"></div>}
            </button>
          </div>
        </Modal>
      </div>
      <Load load={load} />
    </>
  );
}

export default Notification;
