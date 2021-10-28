import React, { useState, useEffect, useRef } from "react";
import Nav from "../../components/Nav";
import Load from "../../components/Load";
import Axios from "../../app/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Url from "../../constants/Global";
import Pagination from "../../components/paginator/Pagination";
import { Link, useHistory } from "react-router-dom";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/userSlice";
import SimpleReactValidator from "simple-react-validator";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";

function Adverts() {
  /**
   * configs
   */
  const [, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: () => forceUpdate(1) },
    })
  );
  const axios = Axios();
  const { user } = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();
  /**
   * states
   */
  const [search, setSearch] = useState("");
  const [adverts, setAdverts] = useState([]);
  const [load, setLoad] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [busy, setBusy] = useState(false);
  const [edit, setEdit] = useState(false);
  const [meta, setMeta] = useState({ total: 1, per_page: 4 });
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [doc, setDoc] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    document.title ="Anuncios";
    async function getAdverts() {
      try {
        const res = await axios.get("/adverts", {
          params: { page: currentPage, search },
        });
        setAdverts(res.data.data);
        setMeta(res.data.meta);
        setLoad(false);
      } catch (error) {
        toast.warning("Ooops! Ocorreu algum problema.");
        setLoad(false);
      }
    }
    getAdverts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, search]);

  async function getAdvertsByUser() {
    if (user.isLogged) {
      try {
        const res = await axios.get(
          `/adverts/${user.user.name}/${user.user.id}`,
          {
            params: {
              page: currentPage,
              search: search,
            },
          }
        );
        setAdverts(res.data.data);
        setMeta(res.data.meta);
        setLoad(false);
      } catch (error) {
        toast.warning("Ooops! Ocorreu algum problema.");
        setLoad(false);
        if (error.response) {
          console.log(error.response);
          if (error.response.status === 401) {
            dispatch(logout());
          }
        }
      }
    } else {
      history.push("/login");
    }
  }
  function create() {
    if (user.isLogged) {
      clear();
      setEdit(false);
      setOpen(true);
    } else {
      history.push("/login");
    }
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

  // submit
  async function submit() {
    edit ? update() : store();
  }

  // store tip
  async function store() {
    setBusy(true);
    let form = new FormData();
    form.append("userId", user.user.id);
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
        const res = await axios.post("/adverts", form);
        if (res.data.success) {
          toast.success("Anuncio criado com sucesso.");
          getAdvertsByUser();
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
    form.append("userId", user.user.id);
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
        const res = await axios.put(`/adverts/${id}`, form);
        if (res.data.success) {
          toast.success("Anuncio actualizado com sucesso.");
          getAdvertsByUser();
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
      const res = await axios.delete(`/adverts/${id}`);
      if (res.data.success) {
        toast.success("Anuncio eliminado com sucesso.");
        setCurrentPage(1);
        getAdvertsByUser();
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
      <Nav />
      <ToastContainer/>
      <div className="uk-container">
        <h4 className="uk-heading-line uk-text-bold">
          <span>Anúncios</span>
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
            uk-tooltip="Criar Anuncio"
            className="uk-button uk-button-primary"
            onClick={create}
          >
            <span uk-icon="icon: plus"></span>
          </button>
        </div>
        <ul
          className="uk-subnav uk-subnav-pill"
          uk-switcher="animation: uk-animation-fade"
        >
          <li>
            <a
              onClick={() => {
                setRefresh(!refresh);
              }}
              href={"/#"}
            >
              Todos Anúncios
            </a>
          </li>
          <li>
            <a onClick={getAdvertsByUser} href={"/#"}>
              Meus Anúncios
            </a>
          </li>
        </ul>

        <ul className="uk-switcher uk-margin">
          <li>
            <div uk-grid="masonry: true">
              {adverts.map((advert) => {
                return (
                  <li key={advert.id} className="uk-width-1-2@m">
                    <div className="uk-card uk-card-default uk-card-body uk-card-small uk-flex uk-flex-middle uk-card-default uk-border-rounded">
                      <div
                        className="uk-grid uk-grid-medium uk-flex uk-flex-middle"
                        data-uk-grid="true"
                      >
                        <div className="uk-width-1-3@s uk-width-2-5@m uk-height-1-1">
                          <img
                            src={`${Url}/image/adverts/${advert.image_url}`}
                            alt=""
                          />
                        </div>
                        <div className="uk-width-2-3@s uk-width-3-5@m">
                          <h4 className="uk-card-title uk-margin-small-top uk-margin-remove-bottom">
                            <Link
                              className="uk-link-text"
                              to={`/adverts/${advert.id}`}
                            >
                              {advert.title}
                            </Link>
                          </h4>
                          <span className="uk-article-meta">
                            Publicado aos{" "}
                            <Moment
                              date={advert.created_at}
                              format="DD MMMM YYYY"
                            />
                          </span>
                          <p className="uk-margin-small uk-text-justify">
                            {advert.content.substr(0, 100)}...
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </div>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={meta.total}
              pageSize={meta.per_page}
              onPageChange={(page) => setCurrentPage(page)}
            />
            {adverts.length === 0 && <h5>Nenhum anuncio encontrado</h5>}
          </li>
          <li>
            <div uk-grid="masonry: true">
              {adverts.map((advert) => {
                return (
                  <li key={advert.id} className="uk-width-1-2@m">
                    <div className="uk-card uk-card-default uk-card-body uk-card-small uk-flex uk-flex-middle uk-card-default uk-border-rounded">
                      <div
                        className="uk-grid uk-grid-medium uk-flex uk-flex-middle"
                        data-uk-grid="true"
                      >
                        <div className="uk-width-1-3@s uk-width-2-5@m uk-height-1-1">
                          <img
                            src={`${Url}/image/adverts/${advert.image_url}`}
                            alt=""
                          />
                        </div>
                        <div className="uk-width-2-3@s uk-width-3-5@m">
                          <h4 className="uk-card-title uk-margin-small-top uk-margin-remove-bottom">
                            <Link
                              className="uk-link-text"
                              to={`/adverts/${advert.id}`}
                            >
                              {advert.title}
                            </Link>
                          </h4>
                          <span className="uk-article-meta">
                            Publicado aos{" "}
                            <Moment
                              date={advert.created_at}
                              format="DD MMMM YYYY"
                            />
                          </span>
                          <p className="uk-margin-small uk-text-justify">
                            {advert.content.substr(0, 100)}...
                          </p>
                        </div>
                      </div>
                    </div>
                    {user.user.id === advert.user_id && (
                      <div className="uk-flex uk-flex-right uk-margin-remove-top">
                        <button
                          uk-tooltip="editar"
                          className="uk-button uk-button-link"
                          onClick={() => {
                            onEdit(advert);
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
                            confirm(advert.id);
                          }}
                        >
                          <span
                            className="uk-text-danger"
                            uk-icon="close"
                          ></span>
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </div>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={meta.total}
              pageSize={meta.per_page}
              onPageChange={(page) => setCurrentPage(page)}
            />
            {adverts.length === 0 && <h5>Nenhum anuncio encontrado</h5>}
          </li>
        </ul>
      </div>
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
              {validator.current.message("address", address, "min:3|max:255")}
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
              {validator.current.message("content", content, "required|min:10")}
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
      <Load load={load} />
    </>
  );
}

export default Adverts;
