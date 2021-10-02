import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Axios from "../../app/Axios";
import Header from "../../components/admin/Header";
import Side from "../../components/admin/Side";
import { logout } from "../../features/userSlice";
import Load from "../../components/Load";
import Pagination from "../../components/paginator/Pagination";
import SimpleReactValidator from "simple-react-validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Moment from "react-moment";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";

function Companies() {
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

  /**
   * States
   */
  const [companies, setCompanies] = useState([]);
  const [meta, setMeta] = useState({ total: 1, per_page: 5 });
  const [search, setSeach] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [load, setLoad] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [slog, setSlog] = useState("");
  const [type, setType] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = "Companhias";
    async function getCompanies() {
      try {
        const res = await axios.get("/admin/companies", {
          params: { page: currentPage, search: search },
        });
        setCompanies(res.data.data);
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
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, refresh, currentPage]);

  function clean() {
    setName("");
    setSlog("");
    setType("");
    setId(0);
  }

  function submit() {
    edit ? update() : store();
  }
  function create() {
    clean();
    setOpen(true);
    setEdit(false);
  }
  async function store() {
    setBusy(true);
    const form = { name: name, slog: slog, type: type };
    if (validator.current.allValid()) {
      try {
        const res = await axios.post("/admin/companies", form);
        if (res.data.success) {
          toast.success("Companhia registada com sucesso.");
          onRefresh();
          onClose();
          clean();
        } else {
          toast.error(
            "Ooops!...Erro ao tentar registar a companhia. Por favor tente novamente."
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

  function onEdit(item) {
    setEdit(true);
    setOpen(true);
    setName(item.name);
    setSlog(item.slog);
    setType(item.type);
    setId(item.id);
  }

  async function update() {
    setBusy(true);
    const form = { name: name, slog: slog, type: type };
    if (validator.current.allValid()) {
      try {
        const res = await axios.put(`/admin/companies/${id}`, form);
        if (res.data.success) {
          toast.success("Companhia actualizada com sucesso.");
          onRefresh();
          onClose();
          clean();
        } else {
          toast.error(
            "Ooops!...Erro ao tentar actualizar a companhia. Por favor tente novamente."
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
  function confirm(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        destroy(id);
      }
    }) 
  }
  async function destroy(id) {
    setLoad(true);
    try {
      const res = await axios.delete(`/admin/companies/${id}`);
      if (res.data.success) {
        toast.success("Companhia eliminada com sucesso.");
        onRefresh();
      } else {
        toast.error(
          "Ooops!...Erro ao tentar eliminar a companhia. Por favor tente novamente."
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
  function onRefresh() {
    setRefresh(!refresh);
  }

  function onClose() {
    setOpen(false);
  }

  // Rendering
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
              <span>Companhias</span>
            </li>
          </ul>
          {/* Add button and search */}
          <div className="uk-flex uk-flex-right@m">
            <div className="uk-search uk-search-default">
              <span uk-search-icon="true"></span>
              <input
                v-model="search"
                className="uk-search-input"
                type="search"
                value={search}
                placeholder=""
                onChange={(event) => {
                  setSeach(event.target.value);
                }}
              />
            </div>
            &nbsp;
            <button
              uk-tooltip="Nova Companhia"
              className="uk-button uk-button-primary"
              onClick={create}
            >
              <span uk-icon="icon: plus"></span>
            </button>
          </div>
          {/* Table for data displaying */}
          <table
            id="companies"
            className="uk-table uk-table-striped uk-table-hover uk-table-divider  uk-table-responsive"
          >
            <thead>
              <tr className="uk-background-secondary">
                <th>Nome</th>
                <th>Slog</th>
                <th>Tipo</th>
                <th>Criada aos</th>
                <th>Accoes</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.slog}</td>
                    <td>{item.type}</td>
                    <td>
                      <Moment data={item.created_at} format="YYYY/MM/DD" />
                    </td>
                    <td>
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
            <tfoot>
              <tr>
                {companies.length === 0 && (
                  <td>Nenhuma companhia registada. Registe</td>
                )}
              </tr>
            </tfoot>
          </table>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={meta.total}
            pageSize={meta.per_page}
            onPageChange={(page) => setCurrentPage(page)}
          />
          {/* Form */}
          <Modal open={open} onClose={onClose} center={false}>
            <div className="uk-width-expand">
              <h3 className="uk-card-title uk-margin-remove-bottom">
                {edit ? `Editar Companhia: ${slog}` : "Nova Companhia"}
              </h3>
            </div>
            <hr />
            <form className="uk-form-stacked uk-grid-large" uk-grid="true">
              <div className="uk-margin uk-width-1-1">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Nome
                </label>
                <input
                  className="uk-input"
                  id="form-stacked-text"
                  type="text"
                  placeholder="Nome da companhia..."
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
                <span className="uk-text-danger">
                  {validator.current.message(
                    "name",
                    name,
                    "required|min:5|max:255"
                  )}
                </span>
              </div>
              <div className="uk-margin uk-width-1-1">
                <label className="uk-form-label">Slog</label>
                <input
                  className="uk-input"
                  type="text"
                  placeholder="Slog da companhia..."
                  value={slog}
                  onChange={(event) => {
                    setSlog(event.target.value);
                  }}
                />
                <span className="uk-text-danger">
                  {validator.current.message(
                    "slog",
                    slog,
                    "required|min:2|max:255"
                  )}
                </span>
              </div>
              <div className="uk-margin uk-width-1-1">
                <div className="uk-form-label">Tipo de Companhia</div>
                <label>
                  <input
                    checked={type === "Publica"}
                    className="uk-radio"
                    onChange={(event) => {
                      setType(event.target.value);
                    }}
                    value="Publica"
                    type="radio"
                    name="type"
                  />
                  {"Publica "}
                </label>
                <br />
                <label>
                  <input
                    checked={type === "Privada"}
                    className="uk-radio"
                    onChange={(event) => {
                      setType(event.target.value);
                    }}
                    value="Privada"
                    type="radio"
                    name="type"
                  />
                  {"Privada"}
                </label>
                <span className="uk-text-danger">
                  {validator.current.message("type", type, "required")}
                </span>
              </div>
            </form>
            <hr />
            <div className="uk-card-footer uk-float-right">
              <button className="uk-button uk-button-default" onClick={clean}>
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
          <Load load={load} />
        </div>
      </div>
    </>
  );
}

export default Companies;
