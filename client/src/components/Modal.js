const Modal = (props) => {
  return (
    <>
      <div
        className="modal show"
        id="modal-block-vcenter"
        tabIndex="-1"
        aria-labelledby="modal-block-vcenter"
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="block block-rounded block-transparent mb-0">
              <div className="block-header block-header-default">
                <h3 className="block-title">Modal</h3>
                <div className="block-options">
                  <button
                    type="button"
                    className="btn-block-option"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      props.closeModal();
                    }}
                    aria-label="Close"
                  >
                    <i className="fa fa-fw fa-times"></i>
                  </button>
                </div>
              </div>
              <div className="block-content fs-sm">
                <div>
                  <div className="block">{props.modalText}</div>
                </div>
              </div>
              <div className="block-content block-content-full text-end bg-body">
                <button
                  type="button"
                  className="btn btn-sm btn-alt-secondary me-1"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    props.closeModal();
                  }}
                >
                  Close
                </button>
                {/*<button*/}
                {/*  type="button"*/}
                {/*  className="btn btn-sm btn-primary"*/}
                {/*  data-bs-dismiss="modal"*/}
                {/*  onClick={props.modalAction}*/}
                {/*>*/}
                {/*  Perfect*/}
                {/*</button>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal-backdrop fade show"
        style={{ display: "block" }}
      ></div>
    </>
  );
};

export default Modal;
