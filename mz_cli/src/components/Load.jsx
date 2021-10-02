import React from "react";

function Load(props) {
  return (
    <>
      {props.load === true && (
        <div className="uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle">
          <div  className="uk-text-warning"  uk-spinner="true"> </div>
        </div>
      )}
    </>
  );
}

export default Load;
