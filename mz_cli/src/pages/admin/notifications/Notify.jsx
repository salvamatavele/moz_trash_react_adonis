import React from "react";
import { useParams } from "react-router";
import Axios from "../../../app/Axios";
import Header from "../../../components/admin/Header";
import Side from "../../../components/admin/Side";

function Notify() {
  const { id } = useParams();
  return (
    <>
      <Header />
      <Side />
      <div id="content" data-uk-height-viewport="expand: true">
        <div className="uk-container uk-container-expand">
        <h4 className="uk-heading-line uk-text-bold">
          <span>Detalhes|Notificação</span>
        </h4>
            {id}</div>
      </div>
    </>
  );
}

export default Notify;
