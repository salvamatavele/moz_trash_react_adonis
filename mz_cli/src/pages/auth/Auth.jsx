import React, { useState, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import "../../assets/css/login.css";
import Logo from "../../assets/images/logo.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useHistory } from "react-router-dom";
import Axios from "../../app/Axios";
import Load from "../../components/Load";

function Auth() {
  // Config validations and roter
  const history = useHistory();
  const [, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: () => forceUpdate(1) },
    })
  );
  const dispatch = useDispatch();
  const axios = Axios();

  /**
   * states
   */
  const [emailCredencial, setEmailCredencial] = useState("");
  const [passwordCredencial, setPasswordCredencial] = useState("");

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [terms, setTerms] = useState(false);
  const [load, setLoad] = useState(false);

  async function onLogin(event) {
    event.preventDefault();
    setLoad(true);
    const form = new FormData();
    form.append("email", emailCredencial);
    form.append("password", passwordCredencial);
    try {
      const res = await axios.post("/login", form);
      setLoad(false);
      dispatch(
        login({ user: res.data.user.guards.api.user, token: res.data.token })
      );
      toast.success("Logged In Successfuly.");
      if (res.data.user.guards.api.user.admin !== 0) {
        history.push("/dashboard");
      } else {
        history.push("/");
      }
    } catch (error) {
      setLoad(false);
      toast.error("Ooops!Ocorreu algum problema");
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
  }

  async function onRegister(event) {
    event.preventDefault();
    if (validator.current.allValid()) {
      setLoad(true);

      try {
        const form = new FormData();
        form.append("name", name);
        form.append("surname", surname);
        form.append("phone", phone);
        form.append("email", email);
        form.append("admin", 0);
        form.append("password", password);
        form.append("password_confirmation", password_confirmation);

        const res = await axios.post("/register", form);
        if (res.data.success) {
          setLoad(false);
          dispatch(
            login({
              user: res.data.user.guards.api.user,
              token: res.data.token,
            })
          );
          toast.success("Logged In Successfuly.");
          if (res.data.user.guards.api.user.admin !== 0) {
            history.push("/dashboard");
          } else {
            history.push("/");
          }
        } else {
          setLoad(false);

          toast.error("Ooops! Erro ao tentar criar a conta. Tente novamente");
        }
      } catch (error) {
        setLoad(false);

        toast.error("Ooops!Ocorreu algum problema");
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
  return (
    <>
      <ToastContainer />
      <div
        className=" uk-flex uk-flex-center uk-flex-middle uk-background-muted uk-height-viewport"
        id="sign"
        data-uk-height-viewport
      >
        <div className="uk-width-large uk-padding-small">
          <div className="uk-flex uk-flex-center">
            <h1 className="uk-text-gradient toggle-class">
              <img
                className="uk-logo"
                src={Logo}
                width="50"
                height="50"
                alt="logo"
              />
              Log In
            </h1>
            <h1 className="uk-text-gradient toggle-class" hidden>
              <img
                className="uk-logo"
                src={Logo}
                width="50"
                height="50"
                alt="logo"
              />
              Criar Conta
            </h1>
          </div>
          <hr className="uk-divider-icon" />

          {/* <!-- login --> */}
          <form className="toggle-class" onSubmit={onLogin}>
            <fieldset className="uk-fieldset">
              <div className="uk-margin-small">
                <div className="uk-inline uk-width-1-1">
                  <span
                    className="uk-form-icon uk-form-icon-flip"
                    data-uk-icon="icon: user"
                  ></span>
                  <input
                    className="uk-input uk-border-pill"
                    required
                    value={emailCredencial}
                    placeholder="E-mail"
                    onChange={(event) => {
                      setEmailCredencial(event.target.value);
                    }}
                    type="email"
                  />
                </div>
              </div>
              {/* <span className="uk-text-danger">
                {validator.current.message(
                  "Email",
                  emailCredencial,
                  "required|email"
                )}
              </span> */}
              <div className="uk-margin-small">
                <div className="uk-inline uk-width-1-1">
                  <span
                    className="uk-form-icon uk-form-icon-flip"
                    data-uk-icon="icon: lock"
                  ></span>
                  <input
                    id="password"
                    className="uk-input uk-border-pill"
                    required
                    value={passwordCredencial}
                    placeholder="Password"
                    onChange={(event) => {
                      setPasswordCredencial(event.target.value);
                    }}
                    type="password"
                  />
                </div>
              </div>
              <div className="uk-margin-small">
                <label>
                  <input
                    className="uk-checkbox"
                    v-model="auth.remember"
                    type="checkbox"
                  />
                  Keep me logged in
                </label>
              </div>
              <div className="uk-margin-bottom">
                <button
                  type="submit"
                  className="uk-button uk-button-gradient-animat uk-border-pill uk-width-1-1 uk-box-shadow-hover-large"
                >
                  LOG IN
                </button>
              </div>
            </fieldset>
          </form>
          {/* <!-- /login --> */}
          {/* <!-- register --> */}
          <form className="toggle-class" onSubmit={onRegister} hidden>
            <fieldset className="uk-fieldset">
              <div className="uk-margin-small">
                <div className="uk-inline uk-width-1-1">
                  <span
                    className="uk-form-icon uk-form-icon-flip"
                    data-uk-icon="icon: user"
                  ></span>
                  <input
                    className="uk-input uk-border-pill"
                    required
                    value={name}
                    placeholder="Nome"
                    type="text"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>
                <span className="uk-text-danger">
                  {validator.current.message(
                    "name",
                    name,
                    "required|min:3|max:225"
                  )}
                </span>
              </div>
              <div className="uk-margin-small">
                <div className="uk-inline uk-width-1-1">
                  <span
                    className="uk-form-icon uk-form-icon-flip"
                    data-uk-icon="icon: user"
                  ></span>
                  <input
                    className="uk-input uk-border-pill"
                    required
                    value={surname}
                    placeholder="Apelido"
                    type="text"
                    onChange={(event) => {
                      setSurname(event.target.value);
                    }}
                  />
                </div>
                <span className="uk-text-danger">
                  {validator.current.message(
                    "surname",
                    surname,
                    "required|min:3|max:225"
                  )}
                </span>
              </div>
              <div className="uk-margin-small">
                <div className="uk-inline uk-width-1-1">
                  <span
                    className="uk-form-icon uk-form-icon-flip"
                    data-uk-icon="icon: phone"
                  ></span>
                  <input
                    className="uk-input uk-border-pill"
                    required
                    value={phone}
                    placeholder="Contacto ex.(+25884..........)"
                    type="text"
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                  />
                </div>
                <span className="uk-text-danger">
                  {validator.current.message(
                    "phone",
                    phone,
                    "required|min:8|max:225|integer"
                  )}
                </span>
              </div>
              <div className="uk-margin-small">
                <div className="uk-inline uk-width-1-1">
                  <span
                    className="uk-form-icon uk-form-icon-flip"
                    data-uk-icon="icon: mail"
                  ></span>
                  <input
                    className="uk-input uk-border-pill"
                    required
                    value={email}
                    placeholder="E-mail"
                    type="email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>
                <span className="uk-text-danger">
                  {validator.current.message(
                    "email",
                    email,
                    "required|email|min:6|max:225"
                  )}
                </span>
              </div>
              <div className="uk-margin-small">
                <div className="uk-inline uk-width-1-1">
                  <span
                    className="uk-form-icon uk-form-icon-flip"
                    data-uk-icon="icon: lock"
                  ></span>
                  <input
                    className="uk-input uk-border-pill"
                    required
                    value={password}
                    placeholder="Password"
                    type="password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </div>
                <span className="uk-text-danger">
                  {validator.current.message(
                    "password",
                    password,
                    "required|min:8|max:225|alpha_num"
                  )}
                </span>
              </div>
              <div className="uk-margin-small">
                <div className="uk-inline uk-width-1-1">
                  <span
                    className="uk-form-icon uk-form-icon-flip"
                    data-uk-icon="icon: lock"
                  ></span>
                  <input
                    className="uk-input uk-border-pill"
                    required
                    value={password_confirmation}
                    placeholder=" Confirm Password"
                    type="password"
                    onChange={(event) => {
                      setPasswordConfirmation(event.target.value);
                    }}
                  />
                </div>
                <span className="uk-text-danger">
                  {validator.current.message(
                    "password_confirmation",
                    password_confirmation,
                    `required|min:8|max:225|in:${password}|alpha_num`
                  )}
                </span>
              </div>
              <div className="uk-margin-small">
                <label>
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    value={terms}
                    onChange={(event) => {
                      setTerms(!terms);
                    }}
                  />
                  Concordo com os Termos e Condicoes.
                </label>
                <span className="uk-text-danger">
                  {validator.current.message("terms", terms, "accepted")}
                </span>
              </div>
              <div className="uk-margin-bottom ">
                <button
                  type="submit"
                  className="uk-button uk-button-gradient-animat uk-border-pill uk-width-1-1 uk-box-shadow-hover-large"
                >
                  Registar
                </button>
              </div>
            </fieldset>
          </form>
          {/* <!-- /register --> */}

          {/* <!-- recover password --> */}
          {/* <!-- This is the modal with the default close button --> */}
          <div id="modal-close-default" uk-modal="true">
            <div className="uk-modal-dialog uk-modal-body">
              <button
                className="uk-modal-close-default"
                type="button"
                uk-close="true"
              ></button>
              <h2 className="uk-modal-title uk-text-gradient">
                Recuperar Senha
              </h2>
              <form className="toggle" method="POST">
                <div className="uk-margin-small">
                  <div className="uk-inline uk-width-1-1">
                    <span
                      className="uk-form-icon uk-form-icon-flip"
                      data-uk-icon="icon: mail"
                    ></span>
                    <input
                      className="uk-input uk-border-pill"
                      placeholder="E-mail"
                      required
                      type="text"
                      v-model="form.email"
                    />
                  </div>
                </div>
                <div className="uk-margin-bottom">
                  <button
                    type="submit"
                    className="uk-button uk-button-gradient-animat uk-border-pill uk-width-1-1 uk-box-shadow-hover-large"
                  >
                    ENVIAR
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* <!-- /recover password --> */}

          {/* <!-- action buttons --> */}
          <div className="uk-clearfix">
            <div className="uk-float-right">
              <button
                className="uk-button uk-button-text  uk-text-gradient"
                data-uk-toggle="target: #modal-close-default; animation: uk-animation-fade"
              >
                Esqueceu a senha?
              </button>
            </div>
            <div className="uk-float-left">
              <button
                className="uk-button uk-button-text toggle-class uk-text-gradient"
                data-uk-toggle="target: .toggle-class ;animation: uk-animation-fade"
                hidden
              >
                <span data-uk-icon="arrow-left"></span>Login
              </button>
              <button
                className="uk-button uk-button-text toggle-class uk-text-gradient"
                data-uk-toggle="target: .toggle-class ;animation: uk-animation-fade"
              >
                Regista-se
              </button>
            </div>
          </div>
          {/* <!-- action buttons --> */}
          <Load load={load} />
        </div>
      </div>
    </>
  );
}

export default Auth;
