import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../../features/userSlice";

import Header from "../../components/admin/Header";
import Side from "../../components/admin/Side";

function Admin() {
  /**
   * Configs
   */
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <>
      <Header />
      <Side />
      <div id="content" data-uk-height-viewport="expand: true">
        <div className="uk-container uk-container-expand">
          <div className="uk-alert-success" uk-alert="true">
            <button className="uk-alert-close" uk-close="true"></button>
            <p>
              Welcome to{" "}
              <span className="uk-badge uk-text-uppercase">Moz Trash</span>{" "}
              {user.user.name + " " + user.user.surname}
            </p>
          </div>
          <div
            className="uk-grid uk-grid-divider uk-grid-large uk-child-width-1-2 uk-child-width-1-3@l uk-child-width-1-4@xl"
            data-uk-grid="true"
          >
            <div>
              <span className="uk-text-small">
                <span
                  data-uk-icon="icon:users"
                  className="uk-margin-small-right uk-text-primary"
                ></span>
                New Users
              </span>
              <h1 className="uk-heading-primary uk-margin-remove  uk-text-primary">
                2.134
              </h1>
              <div className="uk-text-small">
                <span
                  className="uk-text-success"
                  data-uk-icon="icon: triangle-up"
                >
                  15%
                </span>{" "}
                more than last week.
              </div>
            </div>
            <div>
              <span className="uk-text-small">
                <span
                  data-uk-icon="icon:users"
                  className="uk-margin-small-right uk-text-primary"
                ></span>
                New Users
              </span>
              <h1 className="uk-heading-primary uk-margin-remove  uk-text-primary">
                2.134
              </h1>
              <div className="uk-text-small">
                <span
                  className="uk-text-success"
                  data-uk-icon="icon: triangle-up"
                >
                  15%
                </span>{" "}
                more than last week.
              </div>
            </div>
            <div>
              <span className="uk-text-small">
                <span
                  data-uk-icon="icon:social"
                  className="uk-margin-small-right uk-text-primary"
                ></span>
                Social Media
              </span>
              <h1 className="uk-heading-primary uk-margin-remove uk-text-primary">
                8.490
              </h1>
              <div className="uk-text-small">
                <span
                  className="uk-text-warning"
                  data-uk-icon="icon: triangle-down"
                >
                  -15%
                </span>{" "}
                less than last week.
              </div>
            </div>
            <div>
              <span className="uk-text-small">
                <span
                  data-uk-icon="icon:clock"
                  className="uk-margin-small-right uk-text-primary"
                ></span>
                Traffic hours
              </span>
              <h1 className="uk-heading-primary uk-margin-remove uk-text-primary">
                12.00<small className="uk-text-small">PM</small>
              </h1>
              <div className="uk-text-small">
                <span
                  className="uk-text-success"
                  data-uk-icon="icon: triangle-up"
                >
                  {" "}
                  19%
                </span>{" "}
                more than last week.
              </div>
            </div>
            <div>
              <span className="uk-text-small">
                <span
                  data-uk-icon="icon:search"
                  className="uk-margin-small-right uk-text-primary"
                ></span>
                Week Search
              </span>
              <h1 className="uk-heading-primary uk-margin-remove uk-text-primary">
                9.543
              </h1>
              <div className="uk-text-small">
                <span
                  className="uk-text-danger"
                  data-uk-icon="icon: triangle-down"
                >
                  {" "}
                  -23%
                </span>{" "}
                less than last week.
              </div>
            </div>
            <div className="uk-visible@xl">
              <span className="uk-text-small">
                <span
                  data-uk-icon="icon:users"
                  className="uk-margin-small-right uk-text-primary"
                ></span>
                Lorem ipsum
              </span>
              <h1 className="uk-heading-primary uk-margin-remove uk-text-primary">
                5.284
              </h1>
              <div className="uk-text-small">
                <span
                  className="uk-text-success"
                  data-uk-icon="icon: triangle-up"
                >
                  {" "}
                  7%
                </span>{" "}
                more than last week.
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
}

export default Admin;
