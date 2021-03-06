import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleReactValidator from "simple-react-validator";
import Axios from "../../app/Axios";
function Claim(props) {
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
  /**
   * states
   */
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [busy,setBusy] = useState(false);

  useEffect(() => {
    async function getCompanies() {
      if (props.open) {
        try {
          const res = await axios.get("/companies");
          setCompanies(res.data);
        } catch (error) {
          toast.error("Ooops! Ocorreu algum problema.");
        }
      }
    }
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  async function onSend(params) {
    if (validator.current.allValid()) {
      setBusy(true)
      const form = new FormData()
      form.append("companyId", company);
      form.append("title", title);
      form.append("content", content);
      try {
        const res = await axios.post("/claims", form)
        if (res.data.success) {
          props.onClose(false);
          toast.success("A sua reclamacao foi enviada com sucesso.")
        } else {
          toast.error("Ooops! A sua reclamacao nao foi enviada. Tente novamente!")
        }
        setBusy(false)
      } catch (error) {
        setBusy(false)
        toast.warn("Ooops! Ocorreu algum problema.");
      }
    } else {
      validator.current.showMessages();
    }
  }
  return (
    <>
      <ToastContainer />
      <Modal
        open={props.open}
        onClose={() => {
          props.onClose(false);
        }}
      >
        <h3 className="title">Fazer Reclama????o</h3>
        <hr className="uk-divider-icon" />
        <div className="uk-alert-warning" uk-alert="true">
          <button className="uk-alert-close" uk-close="true"></button>
          <p>
            N??o preocupe-se voc?? esta no modo anonimato, aqui ningu??m vai saber
            de nenhum dos seus dados. Sinta-se a vontade.
          </p>
        </div>
        <p>
          Faca a sua reclama????o aqui. Preencha os campos abaixo com o assunto
          pelo qual deseja reclamar e de seguida descreve o detalhadamente
        </p>
        <form className="uk-form-stacked">
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="company_id">
              Para
            </label>
            <select
              className="uk-select"
              id="company_id"
              value={company}
              onChange={(event) => {
                setCompany(event.target.value);
              }}
            >
              <option value="">----------</option>
              {companies.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
              {companies.length === 0 && (
                <option value="">Nenhum Munic??pio Encontrado!</option>
              )}
            </select>
            <span className="uk-text-danger">
              {validator.current.message(
                "company",
                company,
                "required|integer|max:255"
              )}
            </span>
          </div>
          <div className="uk-margin">
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
                "required|string|max:255"
              )}
            </span>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label">Conte??do</label>
            <textarea
              className="uk-textarea"
              placeholder="Faca a descri????o do conte??do aqui"
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
              }}
            ></textarea>
            <span className="uk-text-danger">
              {validator.current.message(
                "content",
                content,
                "required|string|min:20"
              )}
            </span>
          </div>

          <div className="uk-text-right">
            <button
              className="uk-button uk-button-primary"
              type="button"
              onClick={onSend}
              disabled={busy}
            >
              Enviar
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

Claim.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

export default Claim;
