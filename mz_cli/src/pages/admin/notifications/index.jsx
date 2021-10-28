import React from 'react'
import Axios from "../../../app/Axios";
import Header from "../../../components/admin/Header";
import Side from "../../../components/admin/Side";

function Notifications() {
    return (
        <>
        <Header/>
        <Side/>
        <div id="content" data-uk-height-viewport="expand: true">
        <div className="uk-container uk-container-expand">
        <h4 className="uk-heading-line uk-text-bold">
          <span>Notificações</span>
        </h4>
        <dl className="uk-description-list uk-description-list-divider">
    <dt>Description term</dt>
    <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</dd>
    <dt>Description term</dt>
    <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</dd>
    <dt>Description term</dt>
    <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</dd>
</dl>
        </div>
      </div>        </>
    )
}

export default Notifications
