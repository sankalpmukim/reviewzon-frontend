export const Modal = ({ extra_text, title, id, saveChanges, children }) => {
  // myModal.handleUpdate()
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby="settingsModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title" id="exampleModalLabel">
              {title}
            </h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <h4>{extra_text}</h4>
            {children}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={saveChanges}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
