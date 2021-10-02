import React from 'react'
import "../../assets/css/NotFound.css";
import { Link } from "react-router-dom";
function Unauthorizated() {
    return (
        <>
        <section className="page">
        <div id="error-page">
        <div className="content">
          <h2 className="header" data-text="401">
            401
          </h2>
          <h4 data-text="Opps!">OOOPS! UNAUTHORIZETED</h4>
          <p>
            Sorry, you don't have permition to access this page. If you think
            something is broken, report a problem.
          </p>
          <div className="btns">
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </div>
        </div>
        </section>
        </>
    )
}

export default Unauthorizated
