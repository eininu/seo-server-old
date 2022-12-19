import NavBar from "./NavBar";

const Header = (props) => {
  return (
    <header id="page-header">
      <div className="content-header">
        <div className="d-flex align-items-center">
          <a
            className="fw-semibold fs-5 tracking-wider text-dual me-3"
            href="/"
          >
            { props.params.name }
          </a>

        </div>

        <div className="d-flex align-items-center">
          <div className="dropdown d-inline-block ms-2">
            <button
              type="button"
              className="btn btn-sm btn-alt-secondary"
              id="page-header-user-dropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                className="rounded-circle"
                src="/ein.jpg"
                alt="Header Avatar"
                style={{ width: "21px", height: "19px" }}
              />
              <span className="d-none d-sm-inline-block ms-1">アイン</span>
              <i className="fa fa-fw fa-angle-down d-none d-sm-inline-block"></i>
            </button>
            <div
              className="dropdown-menu dropdown-menu-md dropdown-menu-end p-0 border-0"
              aria-labelledby="page-header-user-dropdown"
            >
              <div className="p-2">
                <a
                  className="dropdown-item d-flex align-items-center justify-content-between"
                  href="/logout"
                >
                  <span className="fs-sm fw-medium">Log Out</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="page-header-search"
        className="overlay-header bg-body-extra-light"
      >
        <div className="content-header">
          <form className="w-100" method="POST">
            <div className="input-group input-group-sm">
              <button
                type="button"
                className="btn btn-alt-danger"
                data-toggle="layout"
                data-action="header_search_off"
              >
                <i className="fa fa-fw fa-times-circle"></i>
              </button>
              <input
                type="text"
                className="form-control"
                placeholder="Search or hit ESC.."
                id="page-header-search-input"
                name="page-header-search-input"
              />
            </div>
          </form>
        </div>
      </div>

      <div
        id="page-header-loader"
        className="overlay-header bg-primary-lighter"
      >
        <div className="content-header">
          <div className="w-100 text-center">
            <i className="fa fa-fw fa-circle-notch fa-spin text-primary"></i>
          </div>
        </div>
      </div>
      <NavBar />
    </header>
  );
};

export default Header;
