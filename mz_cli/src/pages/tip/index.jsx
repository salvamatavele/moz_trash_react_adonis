import React, { useEffect, useRef, useState } from "react";
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

function Tips() {
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
  const [load, setLoad] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [tips, setTips] = useState([]);
  const [meta, setMeta] = useState({ total: 1, per_page: 4 });
  const [currentPage, setCurrentPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [content, steContent] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    document.title = "Dicas";
    async function getTips() {
      try {
        const res = await axios.get("/tips", {
          params: {
            page: currentPage,
            per_page: 6,
            search: search,
          },
        });
        setTips(res.data.data);
        setMeta(res.data.meta);
        setLoad(false);
      } catch (error) {
        toast.warning("Ooops! Ocorreu algum problema.");
        setLoad(false);
      }
    }
    getTips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, search, currentPage]);

  async function getTipsByUser() {
    if (user.isLogged) {
      try {
        const res = await axios.get(`/tips/${user.user.name}/${user.user.id}`, {
          params: {
            page: currentPage,
            search: search,
          },
        });
        setTips(res.data.data);
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
  // clear
  function clear(params) {
    setTitle("");
    setLink("");
    steContent("");
    setImage("");
  }
  // create new
  function create() {
    if (user && user.isLogged) {
      clear();
      setOpen(true);
    } else {
      history.push("/login");
    }
  }

  function save() {
    edit ? update() : store();
  }
  // store
  async function store() {
    setBusy(true);
    let form = new FormData();
    form.append("userId", user.user.id);
    form.append("title", title);
    form.append("link", link);
    form.append("content", content);
    form.append("imageUrl", image);

    if (validator.current.allValid()) {
      try {
        const res = await axios.post("/tips", form);
        if (res.data.success) {
          toast.success("Dica registada com sucesso.");
          setRefresh(!refresh);
          getTipsByUser();
          setOpen(false);
          clear();
        } else {
          toast.error(
            "Ooops! Erro ao tentar registar a dica. Por favor tente novamente."
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
          if (error.response.status === 401) {
            dispatch(logout());
          }
        }
      }
    } else {
      validator.current.showMessages();
      setBusy(false);
    }
  }

  /**
   * edit method
   */
  function onEdit(tip) {
    clear();
    setEdit(true);
    setOpen(true);
    setId(tip.id);
    setTitle(tip.title);
    setLink(tip.link);
    steContent(tip.content);
  }

  // update
  async function update() {
    setBusy(true);
    let form = new FormData();
    form.append("userId", user.user.id);
    form.append("title", title);
    form.append("link", link);
    form.append("content", content);
    form.append("imageUrl", image);
    if (validator.current.allValid()) {
      try {
        const res = await axios.put(`/tips/${id}`, form);
        if (res.data.success) {
          toast.success("Dica actualizada com sucesso.");
          getTipsByUser();
          setOpen(false);
          clear();
        } else {
          toast.error(
            "Ooops! Erro ao tentar actalizar a dica. Por favor tente novamente."
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
      const res = await axios.delete(`/tips/${id}`);
      if (res.data.success) {
        toast.success("Dica eliminada com sucesso.");
        setCurrentPage(1);
        getTipsByUser();
      } else {
        toast.error(
          "Ooops! Erro ao tentar eliminar a dica. Por favor tente novamente."
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
          <span>Dicas</span>
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
            uk-tooltip="Partilhar Dica"
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
              Todas Dicas
            </a>
          </li>
          <li>
            <a onClick={getTipsByUser} href={"/#"}>
              Minhas Dicas
            </a>
          </li>
        </ul>

        <ul className="uk-switcher uk-margin">
          <li>
            <div uk-grid="masonry: true">
              {tips.map((tip) => {
                return (
                  <article
                    key={tip.id}
                    className="uk-section uk-section-small uk-padding-remove-top uk-width-1-2@m"
                  >
                    <header>
                      <h3 className="uk-margin-remove-adjacent uk-text-bold uk-margin-small-bottom">
                        <Link className="" to={`/tips/${tip.id}`}>
                          {tip.title}
                        </Link>
                      </h3>
                      <p className="uk-article-meta">
                        Escrito em{" "}
                        <Moment date={tip.created_at} format="MMMM DD, YYYY" />{" "}
                        {tip.link && (
                          <>
                            Postado no{" "}
                            <a
                              href={tip.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Link
                            </a>
                          </>
                        )}
                        | <span data-uk-icon="icon: future"></span> Takes 7 min
                        reading.
                      </p>
                    </header>
                    <img
                      src={`${Url}/image/tips/${tip.image_url}`}
                      width="800"
                      alt="Alt text"
                      className="lazy"
                      data-uk-img="true"
                      // style={{height: 400+"px"}}
                    />

                    <p className="uk-text-justify">
                      ACTUALIZADO{" "}
                      <Moment
                        date={tip.updated_at}
                        format="MMMM DD, YYYY HH:MM"
                      />{" "}
                      -{tip.content.substr(0, 400)}...
                    </p>

                    <Link
                      to={`/tips/${tip.id}`}
                      className="uk-button uk-button-default uk-button-small"
                    >
                      Ler Mais
                    </Link>
                    <hr />
                  </article>
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
            {tips.length === 0 && <h5>Nenhuma dica encontrada</h5>}
          </li>
          <li>
            <div uk-grid="masonry: true">
              {tips.map((tip) => {
                return (
                  <article
                    key={tip.id}
                    className="uk-section uk-section-small uk-padding-remove-top uk-width-1-2@m"
                  >
                    <header>
                      <h3 className="uk-margin-remove-adjacent uk-text-bold uk-margin-small-bottom">
                        <Link className="" to={`/tips/${tip.id}`}>
                          {tip.title}
                        </Link>
                      </h3>
                      <p className="uk-article-meta">
                        Escrito em{" "}
                        <Moment date={tip.created_at} format="MMMM DD, YYYY" />{" "}
                        {tip.link && (
                          <>
                            Postado no{" "}
                            <a
                              href={tip.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Link
                            </a>
                          </>
                        )}
                        | <span data-uk-icon="icon: future"></span> Takes 7 min
                        reading.
                      </p>
                    </header>
                    <img
                      src={`${Url}/image/tips/${tip.image_url}`}
                      width="800"
                      alt="Alt text"
                      className="lazy"
                      data-uk-img="true"
                    />

                    <p className="uk-text-justify">
                      ACTUALIZADO{" "}
                      <Moment
                        date={tip.updated_at}
                        format="MMMM DD, YYYY HH:MM"
                      />{" "}
                      -{tip.content.substr(0, 400)}...
                    </p>

                    <Link
                      to={`/tips/${tip.id}`}
                      className="uk-button uk-button-default uk-button-small"
                    >
                      Ler Mais
                    </Link>
                    {user.user.id === tip.user_id && (
                      <div className="uk-flex uk-flex-right uk-margin-remove-top">
                        <button
                          uk-tooltip="editar"
                          className="uk-button uk-button-link"
                          onClick={() => {
                            onEdit(tip);
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
                            confirm(tip.id);
                          }}
                        >
                          <span
                            className="uk-text-danger"
                            uk-icon="close"
                          ></span>
                        </button>
                      </div>
                    )}
                    <hr />
                  </article> 
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
            {tips.length === 0 && <h5>Nenhuma dica encontrada</h5>}
          </li>
        </ul>
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <div className="uk-width-expand">
            <h3 className="uk-card-title uk-margin-remove-bottom">
              {edit ? `Editar Dica: ${title}` : "Nova Dica"}
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
              <label className="uk-form-label" htmlFor="title">
                Informe um link (opcional)
              </label>
              <input
                className="uk-input"
                id="title"
                type="url"
                placeholder="Caso tenha um tutorial, link da youtube ou blog que detalhe as info..."
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
          </form>
          <hr />
          <div className="uk-card-footer uk-float-right">
            <button className="uk-button uk-button-default" onClick={clear}>
              Limpar
            </button>
            <button
              className="uk-button uk-button-primary"
              disabled={busy}
              onClick={save}
            >
              Guardar
              {busy && <div uk-spinner="ratio: 0.6"></div>}
            </button>
          </div>
        </Modal>
      </div>
      <Load load={load} />
    </>
  );
}

export default Tips;
