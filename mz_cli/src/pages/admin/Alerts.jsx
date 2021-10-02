import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { Link } from "react-router-dom";
import Axios from "../../app/Axios";
import Header from "../../components/admin/Header";
import Side from "../../components/admin/Side";
import { logout, selectUser } from "../../features/userSlice";
import Load from "../../components/Load";
import Pagination from "../../components/paginator/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Moment from "react-moment";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import Url from "../../constants/Global";
import Pdf from "../../assets/images/pdf.png";
import none from "../../assets/images/nodoc.jpeg";

function Alerts() {
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

  //   states
  const [search, setSearch] = useState("");
  const [meta, setMeta] = useState({ total: 1, per_page: 5 });
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [load, setLoad] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [busy, setBusy] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [alerts, setAlerts] = useState([]);
  const [alert, setAlert] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [content, steContent] = useState("");
  const [doc, setDoc] = useState("");

  // Get all alerts
  useEffect(() => {
    async function getAlerts() {
      document.title = "Alertas";
      try {
        const res = await axios.get("/admin/alerts", {
          params: { page: currentPage, search: search },
        });
        setAlerts(res.data.data);
        setMeta(res.data.meta);
      } catch (error) {
        toast.error("Ooops!Ocorreu algum problema");
        if (error.response) {
          console.log(error.response);
          if (error.response.status === 401) {
            dispatch(logout());
          }
        }
      }
      setLoad(false);
    }
    getAlerts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, refresh, currentPage]);

  // details
  async function details(item) {
    setAlert({});
    setShow(true);
    setAlert(item);
  }
  // clear
  function clear(params) {
    setId(0);
    setTitle("");
    steContent("");
    setDoc("");
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

  // store alert
  async function store() {
    setBusy(true);
    let form = new FormData();
    form.append("companyId", user.user.company_id);
    form.append("title", title);
    form.append("content", content);
    form.append("doc", doc);

    if (validator.current.allValid()) {
      try {
        const res = await axios.post("/admin/alerts", form);
        if (res.data.success) {
          toast.success("Alerta criada com sucesso.");
          setRefresh(!refresh);
          setOpen(false);
          clear();
        } else {
          toast.error(
            "Ooops! Erro ao tentar criar a alert. Por favor tente novamente."
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
    steContent(item.content);
  }

  // update
  async function update() {
    setBusy(true);
    let form = new FormData();
    form.append("companyId", user.user.company_id);
    form.append("title", title);
    form.append("content", content);
    form.append("doc", doc);
    if (validator.current.allValid()) {
      try {
        const res = await axios.put(`/admin/alerts/${id}`, form);
        if (res.data.success) {
          toast.success("Alerta actualizada com sucesso.");
          setRefresh(!refresh);
          setOpen(false);
          clear();
        } else {
          toast.error(
            "Ooops! Erro ao tentar actualizar a Alerta. Por favor tente novamente."
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
      const res = await axios.delete(`/admin/alerts/${id}`);
      if (res.data.success) {
        toast.success("Alerta eliminada com sucesso.");
        setCurrentPage(1);
        setRefresh(!refresh);
      } else {
        toast.error(
          "Ooops! Erro ao tentar eliminar a alerta. Por favor tente novamente."
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
      <ToastContainer />
      <Header />
      <Side />
      <div id="content" data-uk-height-viewport="expand: true">
        <div className="uk-container uk-container-expand">
          <ul className="uk-breadcrumb">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <span>Alertas</span>
            </li>
          </ul>
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
              uk-tooltip="Nova Alerta"
              className="uk-button uk-button-danger"
              onClick={create}
            >
              <span uk-icon="icon: plus"></span>
            </button>
          </div>
          {/* displaying all alerts data */}
          <table className="uk-table uk-table-divider uk-table-hover uk-table-striped">
            <thead className="uk-background-secondary">
              <tr>
                <th>Assunto</th>
                <th>Ficheiro</th>
                <th>Criado aos</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>
                      {item.doc ? (
                        <a
                          title=""
                          uk-tooltip="abrir o pdf"
                          href={`${Url}/file/alerts/${item.doc}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={Pdf}
                            width="30"
                            height=""
                            alt="pdf"
                            uk-img="true"
                          />
                        </a>
                      ) : (
                        <img
                          src={none}
                          width="30"
                          alt="none"
                          uk-img="true"
                          title=""
                          uk-tooltip="sem documento"
                        />
                      )}
                    </td>
                    <td>
                      <Moment
                        data={item.created_at}
                        format="YYYY/MM/DD HH:MM:SS"
                      />
                    </td>
                    <td>
                      <button
                        uk-tooltip="ver +"
                        className="uk-button uk-button-link"
                        onClick={() => {
                          details(item);
                        }}
                      >
                        <span className="uk-text-primary" uk-icon="info"></span>
                      </button>
                      &nbsp;
                      <button
                        uk-tooltip="editar"
                        className="uk-button uk-button-link"
                        onClick={() => {
                          onEdit(item);
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
                          confirm(item.id);
                        }}
                      >
                        <span className="uk-text-danger" uk-icon="close"></span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {alerts.length === 0 && <h5>Nenhuma alerta registada.</h5>}
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={meta.total}
            pageSize={meta.per_page}
            onPageChange={(page) => setCurrentPage(page)}
          />
          {/* Modal form */}
          <Modal
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          >
            <div className="uk-width-expand">
              <h3 className="uk-card-title uk-margin-remove-bottom">
                {edit ? `Editar Alerta: ${title}` : "Nova Alerta"}
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
                <label className="uk-form-label" htmlFor="content">
                  Descrição
                </label>
                <textarea
                  onChange={(event) => {
                    steContent(event.target.value);
                  }}
                  value={content}
                  className="uk-textarea"
                  placeholder="Descreve o assunto"
                />
                <span className="uk-text-danger">
                  {validator.current.message(
                    "content",
                    content,
                    "required|min:10"
                  )}
                </span>
              </div>
              <div
                className="js-upload uk-margin uk-width-1-1"
                uk-form-custom="true"
              >
                <label className="uk-form-label" htmlFor="">
                  Selecione um ficheiro pdf (opcional)
                </label>
                <input
                  type="file"
                  onChange={(event) => {
                    setDoc(event.target.files[0]);
                  }}
                />
                <button
                  className="uk-button uk-button-default uk-text-primary uk-width-1-1"
                  type="button"
                  tabIndex="-1"
                >
                  <span uk-icon="icon: cloud-upload"></span>
                  Clique aqui para escolher um ficheiro pdf.
                </button>
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
                Guardar
                {busy && <div uk-spinner="ratio: 0.6"></div>}
              </button>
            </div>
          </Modal>

          {/* Show details */}
          <Modal
            open={show}
            onClose={() => {
              setShow(false);
            }}
          >
            <div className="uk-child-width-expand@$m uk-margin" uk-grid="true">
              <div>
                <h4 className="uk-heading-divider">{alert.title}</h4>
                <p className="uk-text-justify">{alert.content}</p>
                {alert.doc && (
                  <a
                    title=""
                    uk-tooltip="abrir o pdf"
                    href={`${Url}/file/alerts/${alert.doc}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Clique aqui para abrir o documento pdf
                  </a>
                )}
                <hr/>
                <em>Criado aos <Moment
                        data={alert.created_at}
                        format="YYYY/MM/DD HH:MM:SS"
                      />, Actualizada aos <Moment
                      data={alert.updated_at}
                      format="YYYY/MM/DD HH:MM:SS"
                    /></em>
              </div>
            </div>
          </Modal>
          <Load load={load} />
        </div>
      </div>
    </>
  );
}

export default Alerts;
