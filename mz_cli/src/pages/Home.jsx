import React from "react";
import Nav from "../components/Nav";
import bg from "../assets/images/bg.jpg";
function Home() {
  return (
    <>
      <Nav />
      {/* <!-- HERO --> */}
      <section className="uk-section uk-section-small">
        <div className="uk-container">
          <div className="uk-height-large uk-cover-container uk-border-rounded">
            <img src={bg} alt="Alt img" data-uk-cover="true" />
            <div className="uk-overlay uk-overlay-primary uk-position-cover uk-flex uk-flex-center uk-flex-middle uk-light uk-text-center">
              <div data-uk-scrollspy="cls: uk-animation-slide-bottom-small">
                <span
                  style={{ letterSpacing: 0.2 + "em", fontSize: 0.770 + "rem" }}
                >
                  HIGIENE É SAÚDE E SAÚDE É VIDA!
                </span>
                <h1 className="uk-margin-top uk-margin-small-bottom uk-margin-remove-adjacent">
                  Juntos podemos fazer do mundo um lugar melhor
                </h1>
                <p>
                  Mantenha a sua casa e a sua cidade limpa, deposite sempre os
                  rediduos em locais apropriados, recicle os, e separe os de
                  acordo com os tipos. Ensine ao seu irmão também.
                </p>
                <a
                  href={"/"}
                  className="uk-button uk-button-default uk-margin-top"
                >
                  GO TO ARTICLE
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- HERO --> */}
      {/* <!-- FEATURED --> */}
      <div className="uk-container">
        <h4 className="uk-heading-line uk-text-bold">
          <span>Featured</span>
        </h4>
        <div data-uk-slider="velocity: 5">
          <div className="uk-position-relative">
            <div className="uk-slider-container">
              <ul className="uk-slider-items uk-child-width-1-2@m uk-grid uk-grid-medium news-slide">
                <li>
                  <div className="uk-card uk-card-default uk-card-body uk-card-small uk-flex uk-flex-middle uk-card-default uk-border-rounded">
                    <div
                      className="uk-grid uk-grid-medium uk-flex uk-flex-middle"
                      data-uk-grid="true"
                    >
                      <div className="uk-width-1-3@s uk-width-2-5@m uk-height-1-1">
                        <img
                          src="https://picsum.photos/500/500/?random=1"
                          alt=""
                        />
                      </div>
                      <div className="uk-width-2-3@s uk-width-3-5@m">
                        <span
                          className="uk-label uk-label-warning"
                          style={{ fontSize: 0.75 + "rem" }}
                        >
                          Trends
                        </span>
                        <h3 className="uk-card-title uk-margin-small-top uk-margin-remove-bottom">
                          <a className="uk-link-reset" href={"/"}>
                            Short Blog Title
                          </a>
                        </h3>
                        <span className="uk-article-meta">
                          Published 12th August 2019
                        </span>
                        <p className="uk-margin-small">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do...
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="uk-card uk-card-default uk-card-body uk-card-small uk-flex uk-flex-middle uk-card-default uk-border-rounded">
                    <div
                      className="uk-grid uk-grid-medium uk-flex uk-flex-middle"
                      data-uk-grid="true"
                    >
                      <div className="uk-width-1-3@s uk-width-2-5@m uk-height-1-1">
                        <img
                          src="https://picsum.photos/500/500/?random=2"
                          alt=""
                        />
                      </div>
                      <div className="uk-width-2-3@s uk-width-3-5@m">
                        <span
                          className="uk-label uk-label-warning"
                          style={{ fontSize: 0.75 + "rem" }}
                        >
                          Trends
                        </span>
                        <h3 className="uk-card-title uk-margin-small-top uk-margin-remove-bottom">
                          <a className="uk-link-reset" href={"/"}>
                            Short Blog Title
                          </a>
                        </h3>
                        <span className="uk-article-meta">
                          Published 12th August 2019
                        </span>
                        <p className="uk-margin-small">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do...
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="uk-card uk-card-default uk-card-body uk-card-small uk-flex uk-flex-middle uk-card-default uk-border-rounded">
                    <div
                      className="uk-grid uk-grid-medium uk-flex uk-flex-middle"
                      data-uk-grid="true"
                    >
                      <div className="uk-width-1-3@s uk-width-2-5@m uk-height-1-1">
                        <img
                          src="https://picsum.photos/500/500/?random=3"
                          alt=""
                        />
                      </div>
                      <div className="uk-width-2-3@s uk-width-3-5@m">
                        <span
                          className="uk-label uk-label-warning"
                          style={{ fontSize: 0.75 + "rem" }}
                        >
                          Trends
                        </span>
                        <h3 className="uk-card-title uk-margin-small-top uk-margin-remove-bottom">
                          <a className="uk-link-reset" href={"/"}>
                            Short Blog Title
                          </a>
                        </h3>
                        <span className="uk-article-meta">
                          Published 12th August 2019
                        </span>
                        <p className="uk-margin-small">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do...
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="uk-card uk-card-default uk-card-body uk-card-small uk-flex uk-flex-middle uk-card-default uk-border-rounded">
                    <div
                      className="uk-grid uk-grid-medium uk-flex uk-flex-middle"
                      data-uk-grid="true"
                    >
                      <div className="uk-width-1-3@s uk-width-2-5@m uk-height-1-1">
                        <img
                          src="https://picsum.photos/500/500/?random=4"
                          alt=""
                        />
                      </div>
                      <div className="uk-width-2-3@s uk-width-3-5@m">
                        <span
                          className="uk-label uk-label-warning"
                          style={{ fontSize: 0.75 + "rem" }}
                        >
                          Trends
                        </span>
                        <h3 className="uk-card-title uk-margin-small-top uk-margin-remove-bottom">
                          <a className="uk-link-reset" href={"/"}>
                            Short Blog Title
                          </a>
                        </h3>
                        <span className="uk-article-meta">
                          Published 12th August 2019
                        </span>
                        <p className="uk-margin-small">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do...
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="uk-hidden@l uk-light">
              <a
                className="uk-position-center-left uk-position-small"
                href={"/"}
                data-uk-slidenav-previous
                data-uk-slider-item="previous"
              ></a>
              <a
                className="uk-position-center-right uk-position-small"
                href={"/"}
                data-uk-slidenav-next
                data-uk-slider-item="next"
              ></a>
            </div>
            <div className="uk-visible@l">
              <a
                className="uk-position-center-left-out uk-position-small"
                href={"/"}
                data-uk-slidenav-previous
                data-uk-slider-item="previous"
              ></a>
              <a
                className="uk-position-center-right-out uk-position-small"
                href={"/"}
                data-uk-slidenav-next
                data-uk-slider-item="next"
              ></a>
            </div>
          </div>
          <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin">
            <li></li>
          </ul>
        </div>
      </div>
      {/* <!-- /FEATURED --> */}
      {/* <!--CONTENT--> */}
      <div className="uk-section uk-section-default">
        <div className="uk-container">
          <div className="uk-grid" data-ukgrid="true">
            <div className="uk-width-2-3@m">
              <h4 className="uk-heading-line uk-text-bold">
                <span>Latest News</span>
              </h4>
              <article className="uk-section uk-section-small uk-padding-remove-top">
                <header>
                  <h2 className="uk-margin-remove-adjacent uk-text-bold uk-margin-small-bottom">
                    <a
                      title="Fusce facilisis tempus magna ac dignissim."
                      className="uk-link-reset"
                      href={"/"}
                    >
                      Fusce facilisis tempus magna ac dignissim.
                    </a>
                  </h2>
                  <p className="uk-article-meta">
                    Written on March 23, 2019. Posted in <a href={"/"}>Blog</a>{" "}
                    | <span data-uk-icon="icon: future"></span> Takes 7 min
                    reading.
                  </p>
                </header>
                <figure>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAEsCAYAAAA7Ldc6AAADuUlEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMA3p/4AAaxRls8AAAAASUVORK5CYII="
                    data-src="https://picsum.photos/800/300/?random=1"
                    width="800"
                    height="300"
                    alt="Alt text"
                    className="lazy"
                    data-uk-img="true"
                  />
                  <figcaption className="uk-padding-small uk-text-center uk-text-muted">
                    Caption of the image
                  </figcaption>
                </figure>
                <p>
                  UPDATE 24th October 15.10 BST — Vivamus sed consequat urna.
                  Fusce vitae urna sed ante placerat iaculis. Suspendisse
                  potenti. Pellentesque quis fringilla libero. In hac habitasse
                  platea dictumst.
                </p>
                <p>
                  Ultricies eget, tempor sit amet, ante. Donec eu libero sit
                  amet quam egestas semper. Aenean ultricies mi vitae est.
                  Mauris placerat eleifend leo.
                </p>
                <a
                  href={"/"}
                  title="Read More"
                  className="uk-button uk-button-default uk-button-small"
                >
                  READ MORE
                </a>
                <hr />
              </article>
              <article className="uk-section uk-section-small uk-padding-remove-top">
                <header>
                  <h2 className="uk-margin-remove-adjacent uk-text-bold uk-margin-small-bottom">
                    <a
                      title="Ultricies eget, tempor sit amet, ante"
                      className="uk-link-reset"
                      href={"/"}
                    >
                      Ultricies eget, tempor sit amet, ante.
                    </a>
                  </h2>
                  <p className="uk-article-meta">
                    Written on March 22, 2019. Posted in <a href={"/"}>Blog</a>{" "}
                    | <span data-uk-icon="icon: future"></span> Takes 7 min
                    reading.
                  </p>
                </header>
                <figure>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAEsCAYAAAA7Ldc6AAADuUlEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMA3p/4AAaxRls8AAAAASUVORK5CYII="
                    data-src="https://picsum.photos/800/300/?random=2"
                    width="800"
                    height="300"
                    alt="Alt text"
                    className="lazy"
                    data-uk-img="true"
                  />
                  <figcaption className="uk-padding-small uk-text-center uk-text-muted">
                    Caption of the image
                  </figcaption>
                </figure>

                <p>
                  UPDATE 24th October 15.10 BST — Vivamus sed consequat urna.
                  Fusce vitae urna sed ante placerat iaculis. Suspendisse
                  potenti. Pellentesque quis fringilla libero. In hac habitasse
                  platea dictumst.
                </p>
                <p>
                  Ultricies eget, tempor sit amet, ante. Donec eu libero sit
                  amet quam egestas semper. Aenean ultricies mi vitae est.
                  Mauris placerat eleifend leo.
                </p>
                <a
                  href={"/"}
                  title="Read More"
                  className="uk-button uk-button-default uk-button-small"
                >
                  READ MORE
                </a>
                <hr />
              </article>
              <article className="uk-section uk-section-small uk-padding-remove-top">
                <header>
                  <h2 className="uk-margin-remove-adjacent uk-text-bold uk-margin-small-bottom">
                    <a
                      title="Donec eu libero sit amet quam egestas semper"
                      className="uk-link-reset"
                      href={"/"}
                    >
                      Donec eu libero sit amet quam egestas semper
                    </a>
                  </h2>
                  <p className="uk-article-meta">
                    Written on March 21, 2019. Posted in <a href={"/"}>Blog</a>{" "}
                    | <span data-uk-icon="icon: future"></span> Takes 7 min
                    reading.
                  </p>
                </header>
                <figure>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAEsCAYAAAA7Ldc6AAADuUlEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMA3p/4AAaxRls8AAAAASUVORK5CYII="
                    data-src="https://picsum.photos/800/300/?random=3"
                    width="800"
                    height="300"
                    alt="Alt text"
                    className="lazy"
                    data-uk-img="true"
                  />
                  <figcaption className="uk-padding-small uk-text-center uk-text-muted">
                    Caption of the image
                  </figcaption>
                </figure>
                <p>
                  UPDATE 24th October 15.10 BST — Vivamus sed consequat urna.
                  Fusce vitae urna sed ante placerat iaculis. Suspendisse
                  potenti. Pellentesque quis fringilla libero. In hac habitasse
                  platea dictumst.
                </p>
                <p>
                  Ultricies eget, tempor sit amet, ante. Donec eu libero sit
                  amet quam egestas semper. Aenean ultricies mi vitae est.
                  Mauris placerat eleifend leo.
                </p>
                <a
                  href={"/"}
                  title="Read More"
                  className="uk-button uk-button-default uk-button-small"
                >
                  READ MORE
                </a>
              </article>
              <article className="uk-section uk-section-small uk-padding-remove-top">
                <header>
                  <h2 className="uk-margin-remove-adjacent uk-text-bold uk-margin-small-bottom">
                    <a
                      title="Donec eu libero sit amet quam egestas semper"
                      className="uk-link-reset"
                      href={"/"}
                    >
                      Donec eu libero sit amet quam egestas semper
                    </a>
                  </h2>
                  <p className="uk-article-meta">
                    Written on March 21, 2019. Posted in <a href={"/"}>Blog</a>{" "}
                    | <span data-uk-icon="icon: future"></span> Takes 7 min
                    reading.
                  </p>
                </header>
                <figure>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAEsCAYAAAA7Ldc6AAADuUlEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMA3p/4AAaxRls8AAAAASUVORK5CYII="
                    data-src="https://picsum.photos/800/300/?random=4"
                    width="800"
                    height="300"
                    alt="Alt text"
                    className="lazy"
                    data-uk-img="true"
                  />
                  <figcaption className="uk-padding-small uk-text-center uk-text-muted">
                    Caption of the image
                  </figcaption>
                </figure>
                <p>
                  UPDATE 24th October 15.10 BST — Vivamus sed consequat urna.
                  Fusce vitae urna sed ante placerat iaculis. Suspendisse
                  potenti. Pellentesque quis fringilla libero. In hac habitasse
                  platea dictumst.
                </p>
                <p>
                  Ultricies eget, tempor sit amet, ante. Donec eu libero sit
                  amet quam egestas semper. Aenean ultricies mi vitae est.
                  Mauris placerat eleifend leo.
                </p>
                <a
                  href={"/"}
                  title="Read More"
                  className="uk-button uk-button-default uk-button-small"
                >
                  READ MORE
                </a>
              </article>
            </div>
            <div className="uk-width-1-3@m">
              <h4 className="uk-heading-line uk-text-bold">
                <span>Archive</span>
              </h4>
              <ul className="uk-list">
                <li>
                  <a href={"/"}>March</a>
                </li>
                <li>
                  <a href={"/"}>February</a>
                </li>
                <li>
                  <a href={"/"}>January</a>
                </li>
                <li>
                  <a href={"/"}>
                    December <small>(2017)</small>
                  </a>
                </li>
                <li>
                  <a href={"/"}>
                    November <small>(2017)</small>
                  </a>
                </li>
                <li>
                  <a href={"/"}>
                    October <small>(2017)</small>
                  </a>
                </li>
                <li>
                  <a href={"/"}>
                    September <small>(2017)</small>
                  </a>
                </li>
                <li>
                  <a href={"/"}>
                    August <small>(2017)</small>
                  </a>
                </li>
              </ul>
              <h4 className="uk-heading-line uk-text-bold">
                <span>About Us</span>
              </h4>
              <div className="uk-tile uk-tile-small uk-tile-muted uk-border-rounded">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in.
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--/CONTENT--> */}
    </>
  );
}

export default Home;
