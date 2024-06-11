import React from "react";

const Paginator = (props) => (
  <div className="d-flex gap-3 justify-content-end mt-3 align-items-center">
    {props.children}
    <div className="paginator__controls">
      {props.currentPage > 1 && (
        <button
          className="btn btn-info fst-italic text-muted"
          onClick={props.onPrevious}
        >
          Previous
        </button>
      )}
      {props.currentPage < props.lastPage && (
        <button
          className="btn btn-info fst-italic text-muted"
          onClick={props.onNext}
        >
          Next
        </button>
      )}
    </div>
  </div>
);

export default Paginator;
