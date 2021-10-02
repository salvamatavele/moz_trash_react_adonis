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
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import Url from "../../constants/Global";
import Moment from "react-moment";
function Adverts() {
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
  const [adverts, setAdverts] = useState([]);
  const [advert, setAdvert] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [doc, setDoc] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");

  // Get all adverts
  useEffect(() => {
    async function getAdverts() {
      document.title = "Anúncios";
      try {
        const res = await axios.get("/admin/adverts", {
          params: { page: currentPage, search: search },
        });
        setAdverts(res.data.data);
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
    getAdverts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, refresh, currentPage]);

  // details
  async function details(item) {
    setShow(true);
    setAdvert(item);
  }
  // clear
  function clear(params) {
    setId(0);
    setTitle("");
    setLink("");
    setCategory("");
    setPhone("");
    setAddress("");
    setContent("");
    setImage("");
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

  // store tip
  async function store() {
    setBusy(true);
    let form = new FormData();
    form.append("companyId", user.user.company_id);
    form.append("title", title);
    form.append("link", link);
    form.append("category", category);
    form.append("phone", phone);
    form.append("address", address);
    form.append("content", content);
    form.append("image", image);
    form.append("doc", doc);

    if (validator.current.allValid()) {
      try {
        const res = await axios.post("/admin/adverts", form);
        if (res.data.success) {
          toast.success("Anuncio criado com sucesso.");
          setRefresh(!refresh);
          setOpen(false);
          clear();
        } else {
          toast.error(
            "Ooops! Erro ao tentar criar anuncio. Por favor tente novamente."
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
    setCategory(item.category);
    setPhone(item.phone || "");
    setAddress(item.address || "");
    setLink(item.link || "");
    setContent(item.content);
  }

  // update
  async function update() {
    setBusy(true);
    let form = new FormData();
    form.append("companyId", user.user.company_id);
    form.append("title", title);
    form.append("link", link);
    form.append("category", category);
    form.append("phone", phone);
    form.append("address", address);
    form.append("content", content);
    form.append("image", image);
    form.append("doc", doc);
    if (validator.current.allValid()) {
      try {
        const res = await axios.put(`/admin/adverts/${id}`, form);
        if (res.data.success) {
          toast.success("Anuncio actualizado com sucesso.");
          setRefresh(!refresh);
          setOpen(false);
          clear();
        } else {
          toast.error(
            "Ooops! Erro ao tentar actualizar o anuncio. Por favor tente novamente."
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
      const res = await axios.delete(`/admin/adverts/${id}`);
      if (res.data.success) {
        toast.success("Anuncio eliminado com sucesso.");
        setCurrentPage(1);
        setRefresh(!refresh);
      } else {
        toast.error(
          "Ooops! Erro ao tentar eliminar o anuncio. Por favor tente novamente."
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
              <span>Anúncios</span>
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
              uk-tooltip="Novo anuncio"
              className="uk-button uk-button-primary"
              onClick={create}
            >
              <span uk-icon="icon: plus"></span>
            </button>
          </div>
          {/* and */}
          {/* displaying all tips data */}
          <table className="uk-table uk-table-divider uk-table-hover uk-table-striped">
            <thead className="uk-background-secondary">
              <tr>
                <th>Assunto</th>
                {user.user.admin === 1 && <th>Companhia</th>}
                <th>Criado aos</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {adverts.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    {user.user.admin === 1 && (
                      <td>
                        <span className="uk-badge">{item.company.slog}</span>
                      </td>
                    )}
                    <td>
                      <Moment date={item.created_at} format="DD/MM/YYYY" />
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
          {adverts.length === 0 && <h5>Nenhum anuncio criado.</h5>}
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={meta.total}
            pageSize={meta.per_page}
            onPageChange={(page) => setCurrentPage(page)}
          />
          {/* end */}
          {/* Modal form */}
          <Modal
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          >
            <div className="uk-width-expand">
              <h3 className="uk-card-title uk-margin-remove-bottom">
                {edit ? `Editar Anuncio: ${title}` : "Criar Anuncio"}
              </h3>
            </div>
            <hr />
            <form className="uk-form-stacked uk-grid-large" uk-grid="true">
              <div className="uk-margin uk-width-1-1">
                <label className="uk-form-label" htmlFor="title">
                  Titulo
                </label>
                <input
                  className="uk-input"
                  id="title"
                  type="text"
                  placeholder="Titulo..."
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
                <label className="uk-form-label" htmlFor="form-stacked-select">
                  Selecione a categoria
                </label>
                <div className="uk-form-controls">
                  <select
                    className="uk-select"
                    id="form-stacked-select"
                    value={category}
                    onChange={(event) => {
                      setCategory(event.target.value);
                    }}
                  >
                    <option value="">--selecione--</option>
                    <option>Venda</option>
                    <option>Compra</option>
                    <option>Outras</option>
                  </select>
                </div>
                <span className="uk-text-danger">
                  {validator.current.message(
                    "category",
                    category,
                    "required|min:3|max:255"
                  )}
                </span>
              </div>
              <div className="uk-margin uk-width-1-1">
                <label className="uk-form-label" htmlFor="phone">
                  Contacto (opcional)
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
                    "integer|min:8|max:255"
                  )}
                </span>
              </div>
              <div className="uk-margin uk-width-1-1">
                <label className="uk-form-label" htmlFor="address">
                  Localização (opcional)
                </label>
                <input
                  className="uk-input"
                  id="address"
                  type="text"
                  placeholder="Localização"
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
                <span className="uk-text-danger">
                  {validator.current.message(
                    "address",
                    address,
                    "min:3|max:255"
                  )}
                </span>
              </div>
              <div className="uk-margin uk-width-1-1">
                <label className="uk-form-label" htmlFor="title">
                  Informe um link da pagina, empresa ... (opcional)
                </label>
                <input
                  className="uk-input"
                  id="title"
                  type="url"
                  placeholder="Caso tenha um link da fonte, empresa ou pagina que detalhe as info..."
                  value={link}
                  onChange={(event) => {
                    setLink(event.target.value);
                  }}
                />
                <span className="uk-text-danger">
                  {validator.current.message("link", link, "url|max:255")}
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
              <div
                className="js-upload uk-margin uk-width-1-1"
                uk-form-custom="true"
              >
                <label className="uk-form-label" htmlFor="">
                  Selecione uma imagem (opcional)
                </label>
                <input
                  type="file"
                  onChange={(event) => {
                    setImage(event.target.files[0]);
                  }}
                />
                <button
                  className="uk-button uk-button-default uk-text-primary uk-width-1-1"
                  type="button"
                  tabIndex="-1"
                >
                  <span uk-icon="icon: cloud-upload"></span>
                  Clique aqui para escolher um ficheiro (PNG, JPG ou JPEG).
                </button>
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
          {/* end */}
          {/* details */}
          <Modal
            open={show}
            onClose={() => {
              setShow(false);
            }}
          >
            <article className="uk-article">
              <h1 className="uk-article-title">{advert.title}</h1>
              <p className="uk-article-meta">
                Criado aos{" "}
                <Moment date={advert.created_at} format="DD/MM/YYYY - HH:MM" />.{" "}
                {advert.link && (
                  <a
                    className="uk-text-primary"
                    href={advert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Acesse o link aqui.
                  </a>
                )}
              </p>
              <p className="uk-text-lead">
                {advert.image_url && (
                  <img
                    className="uk-height-medium uk-height-small@s uk-width-1-1"
                    src={`${Url}/image/adverts/${advert.image_url}`}
                    alt=""
                    uk-img="true"
                  />
                )}
              </p>
              {advert.phone && <p><span uk-icon="icon: phone"></span>-{advert.phone}</p>}
              {advert.address && <p><span uk-icon="icon: location"></span>-{advert.address}</p>}
              <p className="uk-text-justify">{advert.content}</p>
              <div className="uk-grid-small uk-child-width-auto" uk-grid="true">
                <div>
                  {advert.doc && (
                    <a
                      className="uk-text-primary"
                      href={`${Url}/file/adverts/${advert.doc}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Acesse o documento para mais informacoes aqui.
                    </a>
                  )}
                </div>
                <div>
                  Actualizado aos
                  <Moment
                    date={advert.updated_at}
                    format="DD/MM/YYYY - HH:MM"
                  />
                  .
                </div>
              </div>
            </article>
          </Modal>

          {/* end */}
          <Load load={load} />
        </div>
      </div>
    </>
  );
}

export default Adverts;
