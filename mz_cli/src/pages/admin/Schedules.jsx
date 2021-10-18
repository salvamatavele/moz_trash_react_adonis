import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import Axios from "../../app/Axios";
import Header from "../../components/admin/Header";
import Side from "../../components/admin/Side";
import { logout, selectUser } from "../../features/userSlice";
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
  const [schedules, setSchedules] = useState([]);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [busy, setBusy] = useState(false);
  const [load, setLoad] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function getSchedules() {
      document.title = "Agenda";
      try {
        const res = await axios.get("admin/schedules");
        setSchedules(res.data);
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
    getSchedules();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  function clear() {
    setTitle("");
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
  }

  async function store(e) {
    e.preventDefault();
    if (validator.current.allValid()) {
      const form = new FormData();
      form.append("companyId", user.user.company_id);
      form.append("title", title);
      form.append("startDate", startDate);
      form.append("startTime", startTime);
      form.append("endDate", endDate);
      form.append("endTime", endTime);
      setBusy(true);
      try {
        const res = await axios.post("/admin/schedules", form);
        if (res.data.success) {
          toast.success("Agenda criada com sucesso.");
          setRefresh(!refresh);
          clear();
        } else {
          toast.error(
            "Ooops! Erro ao tentar criar a agenda. Por favor tente novamente."
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
      const res = await axios.delete(`/admin/schedules/${id}`);
      if (res.data.success) {
        toast.success("Actividade eliminada com sucesso.");
        setRefresh(!refresh);
      } else {
        toast.error(
          "Ooops! Erro ao tentar eliminar a actividade. Por favor tente novamente."
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
                  Agendar Actividade
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
                        placeholder="Titulo da actividade"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
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
                      <button
                        type="button"
                        onClick={clear}
                        className="uk-button uk-button-default"
                      >
                        limpar
                      </button>
                      <button
                        className="uk-button uk-button-primary"
                        disabled={busy}
                      >
                        criar
                      </button>
                    </div>
                  </form>
                </div>
              </li>
            </ul>
          </div>
          <div uk-grid="true">
            {schedules.map((schedule)=>{return(
              <div key={schedule.id} className="uk-card uk-card-default uk-width-1-2@m">
            <div className="uk-card-header">
              <div className="uk-grid-small uk-flex-middle" uk-grid="true">
                <div className="uk-width-expand">
                  <h3 className="uk-card-title uk-margin-remove">{schedule.title}</h3>
                  <p className="uk-text-meta uk-margin-remove">
                    <time dateTime="2016-04-01T19:00"><Moment date={schedule.created_at} format="ddd DD/MM/YYYY - HH:MM" /></time>
                  </p>
                </div>
              </div>
            </div>
            <div className="uk-card-body">
              <p>
                De <Moment date={schedule.start_date} format="ddd DD/MM/YYYY" /> das {`${schedule.start_time} as ${schedule.end_time}`} ate <Moment date={schedule.end_date} format="ddd DD/MM/YYYY" />
              </p>
              <div
                className="uk-grid-small uk-child-width-auto"
                uk-grid="true"
                uk-countdown={`date: ${schedule.end_date.substr(0,10)}T${schedule.end_time}+00:00`}
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
              <button onClick={()=>{confirm(schedule.id)}} className="uk-button uk-button-text uk-text-danger">Eliminar</button>
            </div>
          </div>
            )})}
          
          </div>
          <Load load={load} />
        </div>
      </div>
    </>
  );
}

export default Schedules;
