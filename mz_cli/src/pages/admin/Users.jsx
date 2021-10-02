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

function Users() {
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
   * States
   */
  const [users, setUsers] = useState([]);
  const [getUser, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [meta, setMeta] = useState({ total: 1, per_page: 5 });
  const [companies, setCompanies] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [busy, setBusy] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [admin, setAdmin] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  // Get all users
  useEffect(() => {
    async function getUsers() {
      document.title = "Usuários"
      try {
        const res = await axios.get("/admin/users", {
          params: { page: currentPage, search: search },
        });
        setUsers(res.data.data);
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
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, refresh, currentPage]);

  function clean() {
    setId(0);
    setName("");
    setSurname("");
    setPhone("");
    setEmail("");
    setAdmin("");
    setCompany("");
    setPassword("");
    setPasswordConfirmation("");
  }
  function submit() {
    edit ? update() : store();
  }
  // create
  function create() {
    clean();
    setEdit(false);
    setOpen(true);
    getCompanies();
    if (user.user.admin !== 1) {
      setCompany(user.user.company_id);
    }
  }
  // store user
  async function store() {
    setBusy(true);
    const form = {
      company_id: company,
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      admin: admin,
      password: password,
      password_confirmation: password_confirmation,
    };
    if (validator.current.allValid()) {
      try {
        const res = await axios.post("/admin/users", form);
        if (res.data.success) {
          toast.success("Usuário registado com sucesso.");
          onRefresh();
          setOpen(false);
          clean();
        } else {
          toast.error(
            "Ooops!...Erro ao tentar registar o usuário. Por favor tente novamente."
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

  // get companies
  async function getCompanies() {
    try {
      const res = await axios.get("/admin/users/create");
      setCompanies(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }
  // edit
  function onEdit(item) {
    clean();
    setEdit(true);
    setOpen(true);
    getCompanies();
    setId(item.id);
    setName(item.name);
    setSurname(item.surname);
    setPhone(item.phone);
    setEmail(item.email);
    setAdmin(item.admin);
    setCompany(item.company_id);
  }

  async function update() {
    setBusy(true);
    setPassword("password");
    const form = {
      id: id,
      company_id: company,
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      admin: admin,
    };
    if (validator.current.allValid()) {
      try {
        const res = await axios.put(`/admin/users/${id}`, form);
        if (res.data.success) {
          toast.success("Usuário actualizado com sucesso.");
          onRefresh();
          setOpen(false);
          clean();
        } else {
          toast.error(
            "Ooops! Erro ao tentar actualizar o usuário. Por favor tente novamente."
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
      const res = await axios.delete(`/admin/users/${id}`);
      if (res.data.success) {
        toast.success("Usuário eliminado com sucesso.");
        setCurrentPage(1);
        onRefresh();
      } else {
        toast.error(
          "Ooops! Erro ao tentar eliminar o usuário. Por favor tente novamente."
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
  // show
  async function details(item) {
    setUser(item);
    setShow(true);
  }
  // refreshing users
  function onRefresh() {
    setRefresh(!refresh);
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
              <span>Usuários</span>
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
                  placeholder=""
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
              </div>
            </div>
            &nbsp;
            <button
              uk-tooltip="Novo Usuário"
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
                <th>E-mail</th>
                <th>Contacto</th>
                <th>Acesso</th>
                {user.user.admin === 1 && <th>Companhia</th>}
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => {
                return user.user.admin !== 1 ? (
                  user.user.company_id === item.company_id && (
                    <tr key={item.id}>
                      <td>{item.name + " " + item.surname}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>
                        {item.admin === 2 ? (
                          <span className="uk-badge">Admin</span>
                        ) : (
                          <span className="uk-badge">Normal</span>
                        )}
                      </td>
                      {user.user.admin === 1 && (
                        <td>
                          <span className="uk-badge" title="" uk-tooltip={item.userCompany.name}>
                            {item.userCompany.slog}
                          </span>
                        </td>
                      )}
                      <td>
                        <button
                          uk-tooltip="ver+"
                          className="uk-button uk-button-link"
                          onClick={() => {
                            details(item);
                          }}
                        >
                          <span
                            className="uk-text-primary"
                            uk-icon="info"
                          ></span>
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
                          <span
                            className="uk-text-danger"
                            uk-icon="close"
                          ></span>
                        </button>
                      </td>
                    </tr>
                  )
                ) : (
                  <tr key={item.id}>
                    <td>{item.name + " " + item.surname}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      {item.admin === 2 ? (
                        <span className="uk-badge">Admin</span>
                      ) : (
                        <span className="uk-badge">Normal</span>
                      )}
                    </td>
                    {user.user.admin === 1 && item.company_id === null ? (
                      <td>
                        <mark>root</mark>
                      </td>
                    ) : (
                      <td>
                        <span className="uk-badge"  title="" uk-tooltip={item.userCompany.name} >
                          {item.userCompany.slog}
                        </span>
                      </td>
                    )}
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
          {users.length === 0 && <h5>Nenhum usuário registado. Registe!</h5>}
          {/* pagination */}
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={meta.total}
            pageSize={meta.per_page}
            onPageChange={(page) => setCurrentPage(page)}
          />
          <Modal
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            center={false}
          >
            <div className="uk-width-expand">
              <h3 className="uk-card-title uk-margin-remove-bottom">
                {edit ? `Editar Usuário: ${name}` : "Novo Usuário"}
              </h3>
            </div>
            <hr />
            <form className="uk-form-stacked uk-grid-large" uk-grid="true">
              <div className="uk-margin uk-width-1-1">
                <label className="uk-form-label" htmlFor="name">
                  Nome
                </label>
                <input
                  className="uk-input"
                  id="name"
                  type="text"
                  placeholder="Nome..."
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
                <span className="uk-text-danger">
                  {validator.current.message(
                    "name",
                    name,
                    "required|min:3|max:255"
                  )}
                </span>
              </div>
              <div className="uk-margin uk-width-1-1">
                <label className="uk-form-label" htmlFor="surname">
                  Apelido
                </label>
                <input
                  className="uk-input"
                  id="surname"
                  type="text"
                  placeholder="Apelido..."
                  value={surname}
                  onChange={(event) => {
                    setSurname(event.target.value);
                  }}
                />
                <span className="uk-text-danger">
                  {validator.current.message(
                    "surname",
                    surname,
                    "required|min:3|max:255"
                  )}
                </span>
              </div>
              <div className="uk-margin uk-width-1-1">
                <label className="uk-form-label" htmlFor="phone">
                  Contacto
                </label>
                <input
                  className="uk-input"
                  id="phone"
                  type="text"
                  placeholder="Contacto..."
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                />
                <span className="uk-text-danger">
                  {validator.current.message(
                    "phone",
                    phone,
                    "required|min:8|max:255"
                  )}
                </span>
              </div>
              <div className="uk-margin uk-width-1-1">
                <label className="uk-form-label" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="uk-input"
                  id="email"
                  type="email"
                  placeholder="E-mail..."
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <span className="uk-text-danger">
                  {validator.current.message(
                    "email",
                    email,
                    "required|email|min:5|max:255"
                  )}
                </span>
              </div>
              <div className="uk-margin uk-width-1-1">
                <label className="uk-form-label" htmlFor="admin">
                  Selecione o tipo de usuário
                </label>
                <select
                  className="uk-select"
                  id="admin"
                  value={admin}
                  onChange={(event) => {
                    setAdmin(event.target.value);
                  }}
                >
                  <option>--selecione--</option>
                  {user.user.admin === 1 && (
                    <>
                      <option value="1">Super Admin</option>
                      <option value="2">Admin</option>
                    </>
                  )}
                  <option value="3">Normal</option>
                </select>
                <span className="uk-text-danger">
                  {validator.current.message("access", admin, "required")}
                </span>
              </div>
              {user.user.admin === 1 && (
                <div className="uk-margin uk-width-1-1">
                  <label className="uk-form-label" htmlFor="admin">
                    Selecione a companhia
                  </label>
                  <select
                    className="uk-select"
                    id="admin"
                    value={company}
                    onChange={(event) => {
                      setCompany(event.target.value);
                    }}
                  >
                    <option>--selecione--</option>
                    {companies.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <span className="uk-text-danger">
                    {validator.current.message("company", company, "required")}
                  </span>
                </div>
              )}
              {edit !== true && (
                <>
                  <div className="uk-margin uk-width-1-1">
                    <label className="uk-form-label" htmlFor="password">
                      Palavra Passe
                    </label>
                    <input
                      className="uk-input"
                      id="password"
                      type="password"
                      placeholder="Palavra Passe..."
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                    <span className="uk-text-danger">
                      {validator.current.message(
                        "password",
                        password,
                        "min:4|max:255"
                      )}
                    </span>
                  </div>
                  <div className="uk-margin uk-width-1-1">
                    <label
                      className="uk-form-label"
                      htmlFor="password_comfirmation"
                    >
                      Confirmar Palavra passe
                    </label>
                    <input
                      className="uk-input"
                      id="password_comfirmation"
                      type="password"
                      placeholder="Comfirmar Palavra passe..."
                      value={password_confirmation}
                      onChange={(event) => {
                        setPasswordConfirmation(event.target.value);
                      }}
                    />
                    <span className="uk-text-danger">
                      {validator.current.message(
                        "password_comfirmation",
                        password_confirmation,
                        "min:4|max:255"
                      )}
                    </span>
                  </div>{" "}
                </>
              )}
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
          {/* show user detail */}
          <Modal
            open={show}
            onClose={() => {
              setShow(false);
            }}
          >
            <article className="uk-article">
              <h5 className="uk-article-title">
                {getUser.name + " " + getUser.surname}
              </h5>

              <p className="uk-article-meta">
                Registado <span className="uk-badge">{getUser.id}</span> aos{" "}
                <Moment
                  data={getUser.created_at}
                  format="YYYY/MM/DD HH:MM:SS"
                />
                .
              </p>
              <ul className="uk-list uk-list-striped">
                <li>
                  <b>Contacto: </b>
                  {getUser.phone}
                </li>
                <li>
                  <b>Email: </b>
                  {getUser.email}
                </li>
                <li>
                  <b>Permissao: </b>
                  <span className="uk-badge">
                    {getUser.admin === 2 ? "Admin" : "Normal"}
                  </span>
                </li>
              </ul>
              <div className="uk-grid-small uk-child-width-auto" uk-grid="true">
                <div>
                  <span>
                    Actualizado aos{" "}
                    <Moment
                      data={getUser.updated_at}
                      format="YYYY/MM/DD HH:MM:SS"
                    />
                    .
                  </span>
                </div>
                <div>
                </div>
              </div>
            </article>
          </Modal>
          <Load load={load} />
        </div>
      </div>
    </>
  );
}

export default Users;
