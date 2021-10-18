import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import bg from "../assets/images/bg.jpg";
import Axios from "../app/Axios";
import Load from "../components/Load";
import Url from "../constants/Global"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Moment from "react-moment";
import { Link } from "react-router-dom";

function Home() {
  /**
   * configs
   */
  const axios = Axios();
  /**
   * states
   */
  const [adverts, setAdverts] = useState([]);
  const [tips,setTips] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    async function getAdverts() {
      try {
        const res = await axios.get("/adverts");
        setAdverts(res.data.data);
        setLoad(false);
      } catch (error) {
        toast.warning("Ooops! Ocorreu algum problema.");
        setLoad(false);
      }
    }
    getAdverts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getTips() {
      try {
        const res = await axios.get("/tips");
        setTips(res.data.data);
        setLoad(false);
      } catch (error) {
        toast.warning("Ooops! Ocorreu algum problema.");
        setLoad(false);
      }
    }
    getTips();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Nav />
      <ToastContainer />
      {/* <!-- HERO --> */}
      <section className="uk-section uk-section-small">
        <div className="uk-container">
          <div className="uk-height-large uk-cover-container uk-border-rounded">
            <img src={bg} alt="Alt img" data-uk-cover="true" />
            <div className="uk-overlay uk-overlay-primary uk-position-cover uk-flex uk-flex-center uk-flex-middle uk-light uk-text-center">
              <div data-uk-scrollspy="cls: uk-animation-slide-bottom-small">
                <span
                  style={{ letterSpacing: 0.2 + "em", fontSize: 1 + "rem" }}
                >
                  HIGIENE É SAÚDE E SAÚDE É VIDA!
                </span>
                <h1 className="uk-margin-top uk-margin-small-bottom uk-margin-remove-adjacent">
                  Juntos podemos fazer do mundo um lugar melhor
                </h1>
                <p>
                  Mantenha a sua casa e a sua cidade limpa, deposite sempre os
                  rediduos em locais apropriados, recicle os, e separe os de
                  acordo com os tipos. Ensine o seu irmão também.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- HERO --> */}
      {/* <!-- FEATURED --> */}
      <div className="uk-container">
        <h4 className="uk-heading-line uk-text-bold">
          <span>Anúncios de Interesse Público</span>
        </h4>
        <div data-uk-slider="velocity: 5">
          <div className="uk-position-relative">
            <div className="uk-slider-container">
              <ul className="uk-slider-items uk-child-width-1-2@m uk-grid uk-grid-medium news-slide">
                
                {adverts.map((advert)=>{return(
                  <li key={advert.id}>
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
                        <span
                          className="uk-label uk-label-warning"
                          style={{ fontSize: 0.75 + "rem" }}
                        >
                          Recente
                        </span>
                        <h4 className="uk-card-title uk-margin-small-top uk-margin-remove-bottom">
                          <Link className="uk-link-text" to={"/"}>
                            {advert.title}
                          </Link>
                        </h4>
                        <span className="uk-article-meta">
                          Publicado aos <Moment date={advert.created_at} format="DD MMMM YYYY" />
                        </span>
                        <p className="uk-margin-small">
                          {advert.content.substr(0,100)}...
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                )})}
                
              </ul>
            </div>
            <div className="uk-hidden@l uk-light">
              <button
                className="uk-position-center-left uk-position-small"
                data-uk-slidenav-previous
                data-uk-slider-item="previous"
              ></button>
              <button
                className="uk-position-center-right uk-position-small"
                data-uk-slidenav-next
                data-uk-slider-item="next"
              ></button>
            </div>
            <div className="uk-visible@l">
              <button
                className="uk-position-center-left-out uk-position-small"
                data-uk-slidenav-previous
                data-uk-slider-item="previous"
              ></button>
              <button
                className="uk-position-center-right-out uk-position-small"
                data-uk-slidenav-next
                data-uk-slider-item="next"
              ></button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /FEATURED --> */}
      {/* <!--CONTENT--> */}
      <div className="uk-section uk-section-default">
        <div className="uk-container">
          <div className="uk-grid" data-ukgrid="true">
            <div className="uk-width-2-3@m">
              <h4 className="uk-heading-line uk-text-bold">
                <span>Ultimas Dicas de Reciclagem</span>
              </h4>
              {tips.map((tip)=>{return(
                <article key={tip.id} className="uk-section uk-section-small uk-padding-remove-top">
                <header>
                  <h3 className="uk-margin-remove-adjacent uk-text-bold uk-margin-small-bottom">
                    <Link
                      className=""
                      to={"/"}
                    >
                      {tip.title}
                    </Link>
                  </h3>
                  <p className="uk-article-meta">
                    Escrito em <Moment date={tip.created_at} format="MMMM DD, YYYY" /> {tip.link && (<>Postado no <a href={tip.link} target="_blank" rel="noopener noreferrer">Link</a></>)}
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
                  
                <p>
                  ACTUALIZADO <Moment date={tip.updated_at} format="MMMM DD, YYYY HH:MM" /> -{tip.content.substr(0,400)}...
                </p>
  
                <Link
                  to={"/"}
                  className="uk-button uk-button-default uk-button-small"
                >
                  Ler Mais
                </Link>
                <hr />
              </article>
              )})}
              
            </div>
            <div className="uk-width-1-3@m">
              <h4 className="uk-heading-line uk-text-bold">
                <span>Sobre Nos</span>
              </h4>
              <div className="uk-tile uk-tile-small uk-tile-muted uk-border-rounded uk-text-justify">
                Moz Trash uma plataforma que te matem conectado com o seu Município e com os demais munícipes, uma forma de melhorar o nosso Mundo, Informar e Alertar, Ensinar e Aprender. <strong>Higiene</strong> e a <strong>Saúde</strong> sao as prioridades, conecte-se através do celular, smartphone, computador ou qualquer dispositivo com acesso a internet.
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--/CONTENT--> */}
      <Load load={load} />
    </>
  );
}

export default Home;
