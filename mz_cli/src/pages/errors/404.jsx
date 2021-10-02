import React from 'react'
import "../../assets/css/NotFound.css";
import { Link } from "react-router-dom";
function Unfound() {
    return (
        <>
        <section className="page">
        <div id="error-page">
        <div className="content">
          <h2 className="header" data-text="404">
            404
          </h2>
          <h4 data-text="Opps! Page not found">Opps! Page not found</h4>
          <p>
            Sorry, the page you're looking for doesn't exist. If you think
            something is broken, report a problem.
          </p>
          <div className="btns">
            <Link to="/">Back to Home</Link>
          </div>
        </div>
        </div>
        </section>
        </>
    )
}

export default Unfound
