import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../components/Nav";
import { logout, selectUser } from "../../features/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Moment from "react-moment";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import Url from "../../constants/Global";
import none from "../../assets/images/noimg.png";
import Axios from "../../app/Axios";
import { useDispatch, useSelector } from "react-redux";
import Load from "../../components/Load";

function Tip() {
  /**
   * configs
   */
  const axios = Axios();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector(selectUser);
  /**
   * states
   */
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [busy, setBusy] = useState(false);
  const [tip, setTip] = useState([]);
  const [usr, setUser] = useState([]);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState();

  // Get tip
  useEffect(() => {
    async function getTip() {
      document.title = "Detalhes|Dicas";
      try {
        const res = await axios.get(`/tips/${id}`);
        setTip(res.data);
        setUser(res.data.user);
        setImages(res.data.images);
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
    getTip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  // submit
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    try {
      let res;
      for (let i = 0; i < image.length; i++) {
        const form = new FormData();
        form.append("tipId", id);
        form.append("image", image[i]);

        res = await axios.post(`/admin/tip/images`, form);
      }
      if (res.data.success) {
        toast.success("Upload realizado com sucesso.");
        setRefresh(!refresh);
        setOpen(false);
      } else {
        toast.error(
          "Ooops! Erro ao tentar fazer o upload! Por favor tente novamente."
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
      const res = await axios.delete(`/admin/tip/images/${id}`);
      if (res.data.success) {
        toast.success("Imagem eliminada com sucesso.");
        setRefresh(!refresh);
      } else {
        toast.error(
          "Ooops! Erro ao tentar eliminar a imagem. Por favor tente novamente."
        );
      }
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

  return (
    <>
      <Nav />
      <ToastContainer />
      <div className="uk-container">
          <hr className="uk-divider-icon" />
        <article className="uk-article">
          <h2 className="uk-heading-line"><span>{tip.title}</span></h2>

          <p className="uk-article-meta">
            {`Criado por ${usr.name}`}. Aos
            <Moment
              date={tip.created_at}
              format={" ddd DD/MM/YYYY - HH:MM:SS"}
            />
            .
          </p>
          <div className="uk-grid-divider" uk-grid="true">
            <div>
              {tip.image_url ? (
                <div uk-lightbox="true">
                  <a
                    className="uk-button uk-button-text"
                    href={`${Url}/image/tips/${tip.image_url}`}
                  >
                    <img
                      src={`${Url}/image/tips/${tip.image_url}`}
                      width="300"
                      alt="img"
                      uk-img="true"
                      title=""
                      uk-tooltip="clique"
                    />
                  </a>
                </div>
              ) : (
                <img
                  src={none}
                  width="300"
                  alt="none"
                  uk-img="true"
                  title=""
                  uk-tooltip="sem imagem"
                />
              )}
            </div>
            <div>
              {images.length === 0 ? (
                user.user.id === tip.user_id ? (
                  <span>Adicione mais imagens</span>
                ) : (
                  <span>Nenhuma imagem adicional</span>
                )
              ) : (
                <div
                  className="uk-child-width-1-3@m uk-child-width-1-5@l"
                  uk-grid="true"
                  uk-lightbox="animation: slide"
                >
                  {images.map((image) => {
                    return (
                      <div key={image.id} className="uk-inline">
                        <a
                          className="uk-inline"
                          href={`${Url}/image/tips/${image.image_url}`}
                          data-caption="+ Imagem"
                        >
                          <img
                            width={
                              images.length === 1
                                ? 400
                                : images.length === 2
                                ? 250
                                : 150
                            }
                            src={`${Url}/image/tips/${image.image_url}`}
                            alt="img"
                          />
                        </a>
                        <div className="uk-position-bottom-right">
                          {user.user.id === tip.user_id && (
                            <button
                              onClick={() => {
                                confirm(image.id);
                              }}
                              title=""
                              uk-tooltip="eliminar"
                              className="uk-text-danger"
                              type="button"
                              uk-close="true"
                            ></button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <br />
              {user.user.id === tip.user_id && (
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                  title=""
                  uk-tooltip="mais imagens"
                  className="uk-button uk-button-danger uk-button-small uk-width-1-1"
                >
                  <span uk-icon="icon: upload"></span> adicionar imagens
                </button>
              )}
            </div>
          </div>
          <p className="uk-text-justify">{tip.content}</p>

          <div>
            <div>
              {tip.link !== null && (
                <a
                  className="uk-button-text uk-text-primary"
                  href={tip.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Acesse {tip.link}
                </a>
              )}
            </div>
            <p className="uk-article-meta">Actualizado aos {tip.updated_at}</p>
          </div>
        </article>
        {/* upload modal */}
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          center={true}
        >
          <form method="POST" className="uk-margin-auto" onSubmit={submit}>
            <div className="js-upload uk-margin" uk-form-custom="true">
              <label className="uk-form-label" htmlFor="">
                Selecione uma ou mais imagem
              </label>
              <hr className="uk-divider-icon" />
              <input
                type="file"
                onChange={(event) => {
                  setImage(event.target.files);
                }}
                multiple
              />
              <button
                className="uk-button uk-button-text uk-text-primary"
                type="button"
                tabIndex="-1"
              >
                <span uk-icon="icon: cloud-upload"></span>
                Clique aqui para escolher uma ou mais imagens (PNG, JPG ou
                JPEG).
              </button>
            </div>
            <br />
            <button
              className="uk-button uk-button-primary uk-width-1-1"
              disabled={busy}
            >
              <span uk-icon="icon: upload"></span>upload
            </button>
          </form>
        </Modal>
        <Load load={load} />
      </div>
    </>
  );
}

export default Tip;
