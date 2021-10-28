import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../components/Nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Moment from "react-moment";
import Axios from "../../app/Axios";
import Url from "../../constants/Global";

function Advert() {
  /**
   * configs
   */
  const axios = Axios();
  const { id } = useParams();
  /**
   * states
   */
  const [advert, setAdverts] = useState([]);
  const [user, setUser] = useState([]);
  const [company, setCompany] = useState([]);

  useEffect(() => {
    async function getAdvertById() {
      document.title = "Detalhes|Anuncio";
      try {
        const res = await axios.get(`/adverts/${id}`);
        setAdverts(res.data);
        setUser(res.data.user);
        setCompany(res.data.company);
      } catch (error) {
        toast.error("Ooops!Ocorreu algum problema");
        if (error.response) {
          console.log(error.response);
        }
      }
    }
    getAdvertById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Nav />
      <ToastContainer/>
      <article className="uk-article">
        <h1 className="uk-article-title">{advert.title}</h1>
        <p className="uk-article-meta">
          Criado por {advert.user_id ? user.name : company.name} aos
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
        {advert.phone && (
          <p>
            <span uk-icon="icon: phone"></span>-{advert.phone}
          </p>
        )}
        {advert.address && (
          <p>
            <span uk-icon="icon: location"></span>-{advert.address}
          </p>
        )}
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
            <Moment date={advert.updated_at} format="DD/MM/YYYY - HH:MM" />.
          </div>
        </div>
      </article>
    </>
  );
}

export default Advert;
