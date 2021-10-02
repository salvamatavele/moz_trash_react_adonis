import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import Axios from "../../app/Axios";
import Header from "../../components/admin/Header";
import Side from "../../components/admin/Side";
import { selectUser } from "../../features/userSlice";
import Load from "../../components/Load";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import Moment from "react-moment";

function Schedules() {
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
   * states
   */
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  async function store(e) {
    e.preventDefault();
    if (validator.current.allValid()) {
    } else {
      validator.current.showMessages();
    }
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
              <span>Agendas</span>
            </li>
          </ul>
          <div className="uk-card uk-card-hover uk-card-default uk-card-body">
            <ul uk-accordion="true">
              <li>
                <button className="uk-accordion-title uk-button uk-button-muted">
                  Criar Agenda
                </button>
                <div className="uk-accordion-content">
                  <form
                    className="uk-grid-small"
                    uk-grid="true"
                    onSubmit={store}
                  >
                    <div className="uk-width-1-1">
                      <label>Titulo</label>
                      <input
                        className="uk-input"
                        type="text"
                        placeholder="Titulo da agenda"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                      <span className="uk-text-danger">
                        {validator.current.message(
                          "title",
                          title,
                          "required|min3|max:255"
                        )}
                      </span>
                    </div>
                    <div className="uk-width-1-2@s">
                      <label>Data de inicio</label>
                      <input
                        className="uk-input"
                        type="date"
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                        }}
                      />
                      <span className="uk-text-danger">
                        {validator.current.message(
                          "Start date",
                          startDate,
                          "required"
                        )}
                      </span>
                    </div>
                    <div className="uk-width-1-2@s">
                      <label>Hora de inicio</label>
                      <input
                        className="uk-input"
                        type="time"
                        value={startTime}
                        onChange={(e) => {
                          setStartTime(e.target.value);
                        }}
                      />
                      <span className="uk-text-danger">
                        {validator.current.message(
                          "Start time",
                          startTime,
                          "required"
                        )}
                      </span>
                    </div>
                    <div className="uk-width-1-2@s">
                      <label>Data do fim</label>
                      <input
                        className="uk-input"
                        type="date"
                        value={endDate}
                        onChange={(e) => {
                          setEndDate(e.target.value);
                        }}
                      />
                      <span className="uk-text-danger">
                        {validator.current.message(
                          "End date",
                          endDate,
                          "required"
                        )}
                      </span>
                    </div>
                    <div className="uk-width-1-2@s">
                      <label>Hora do fim</label>
                      <input
                        className="uk-input"
                        type="time"
                        value={endTime}
                        onChange={(e) => {
                          setEndTime(e.target.value);
                        }}
                      />
                      <span className="uk-text-danger">
                        {validator.current.message(
                          "End time",
                          endTime,
                          "required"
                        )}
                      </span>
                    </div>
                    <hr />
                    <div className="uk-position-bottom-right uk-margin-medium-right">
                      <button className="uk-button uk-button-primary">
                        criar
                      </button>
                    </div>
                  </form>
                </div>
              </li>
            </ul>
          </div>
          <div className="uk-card uk-card-default uk-width-1-2@m">
            <div className="uk-card-header">
              <div className="uk-grid-small uk-flex-middle" uk-grid="true">
                <div className="uk-width-expand">
                  <h3 className="uk-card-title uk-margin-remove">Title</h3>
                  <p className="uk-text-meta uk-margin-remove">
                    <time datetime="2016-04-01T19:00">April 01, 2016</time>
                  </p>
                </div>
              </div>
            </div>
            <div className="uk-card-body">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
              <div
                className="uk-grid-small uk-child-width-auto"
                uk-grid="true"
                uk-countdown="date: 2021-10-08T15:17:17+00:00"
              >
                <div>
                  <div className="uk-countdown-days"></div>
                  <div className="uk-countdown-label uk-margin-small uk-text-center uk-visible@s">
                    Dias
                  </div>
                </div>
                <div className="">:</div>
                <div>
                  <div className=" uk-countdown-hours"></div>
                  <div className="uk-countdown-label uk-margin-small uk-text-center uk-visible@s">
                    Horas
                  </div>
                </div>
                <div className="">:</div>
                <div>
                  <div className=" uk-countdown-minutes"></div>
                  <div className="uk-countdown-label uk-margin-small uk-text-center uk-visible@s">
                    Minutos
                  </div>
                </div>
                <div className="">:</div>
                <div>
                  <div className=" uk-countdown-seconds"></div>
                  <div className="uk-countdown-label uk-margin-small uk-text-center uk-visible@s">
                    Segundos
                  </div>
                </div>
              </div>
            </div>
            <div className="uk-card-footer">
              <button className="uk-button uk-button-text">Read more</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Schedules;
