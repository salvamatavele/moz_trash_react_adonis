import React, { useState } from 'react'
import Nav from '../../components/Nav'

function Tips() {
    /**
     * configs
     */
    /**
     * states
     */
    const [search,setSearch] = useState("");

    function create(){
        
    }
    return (
        <>
        <Nav/>
        <div className="uk-container">
        <h4 className="uk-heading-line uk-text-bold">
          <span>Dicas</span>
        </h4>
         {/* Add button and search */}
         <div className="uk-flex uk-flex-right@m">
            <div className="uk-search uk-search-default">
              <div className="uk-inline">
                <span uk-search-icon="true" />
                <button
                  className="uk-form-icon uk-form-icon-flip"
                  title="limpar"
                  uk-tooltip="limpar"
                  uk-icon="icon: close"
                  onClick={() => {
                    setSearch("");
                  }}
                />
                <input
                  v-model="search"
                  className="uk-search-input"
                  type="search"
                  value={search}
                  placeholder="pesquisar"
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
              </div>
            </div>
            &nbsp;
            <button
              uk-tooltip="Nova Dica"
              className="uk-button uk-button-primary"
              onClick={create}
            >
              <span uk-icon="icon: plus"></span>
            </button>
          </div>
        </div>
        </>
    )
}

export default Tips
