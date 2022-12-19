import NavBar from "./NavBar";

const Header = () => {
  return (
    <header id="page-header">
      <div className="content-header">
        <div className="d-flex align-items-center">
          <a
            className="fw-semibold fs-5 tracking-wider text-dual me-3"
            href="index.html"
          >
            One<span className="fw-normal">UI</span>
          </a>

          <div className="dropdown d-inline-block me-2">
            <button
              type="button"
              className="btn btn-sm btn-alt-secondary"
              id="page-header-notifications-dropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-fw fa-bell"></i>
              <span className="text-primary">•</span>
            </button>
            <div
              className="dropdown-menu dropdown-menu-lg p-0 border-0 fs-sm"
              aria-labelledby="page-header-notifications-dropdown"
            >
              <div className="p-2 bg-body-light border-bottom text-center rounded-top">
                <h5 className="dropdown-header text-uppercase">
                  Notifications
                </h5>
              </div>
              <ul className="nav-items mb-0">
                <li>
                  <a className="text-dark d-flex py-2" href="#">
                    <div className="flex-shrink-0 me-2 ms-3">
                      <i className="fa fa-fw fa-check-circle text-success"></i>
                    </div>
                    <div className="flex-grow-1 pe-2">
                      <div className="fw-semibold">You have a new follower</div>
                      <span className="fw-medium text-muted">15 min ago</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="text-dark d-flex py-2" href="#">
                    <div className="flex-shrink-0 me-2 ms-3">
                      <i className="fa fa-fw fa-plus-circle text-primary"></i>
                    </div>
                    <div className="flex-grow-1 pe-2">
                      <div className="fw-semibold">1 new sale, keep it up</div>
                      <span className="fw-medium text-muted">22 min ago</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="text-dark d-flex py-2" href="#">
                    <div className="flex-shrink-0 me-2 ms-3">
                      <i className="fa fa-fw fa-times-circle text-danger"></i>
                    </div>
                    <div className="flex-grow-1 pe-2">
                      <div className="fw-semibold">
                        Update failed, restart server
                      </div>
                      <span className="fw-medium text-muted">26 min ago</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="text-dark d-flex py-2" href="#">
                    <div className="flex-shrink-0 me-2 ms-3">
                      <i className="fa fa-fw fa-plus-circle text-primary"></i>
                    </div>
                    <div className="flex-grow-1 pe-2">
                      <div className="fw-semibold">2 new sales, keep it up</div>
                      <span className="fw-medium text-muted">33 min ago</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="text-dark d-flex py-2" href="#">
                    <div className="flex-shrink-0 me-2 ms-3">
                      <i className="fa fa-fw fa-user-plus text-success"></i>
                    </div>
                    <div className="flex-grow-1 pe-2">
                      <div className="fw-semibold">
                        You have a new subscriber
                      </div>
                      <span className="fw-medium text-muted">41 min ago</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="text-dark d-flex py-2" href="#">
                    <div className="flex-shrink-0 me-2 ms-3">
                      <i className="fa fa-fw fa-check-circle text-success"></i>
                    </div>
                    <div className="flex-grow-1 pe-2">
                      <div className="fw-semibold">You have a new follower</div>
                      <span className="fw-medium text-muted">42 min ago</span>
                    </div>
                  </a>
                </li>
              </ul>
              <div className="p-2 border-top text-center">
                <a className="d-inline-block fw-medium" href="#">
                  <i className="fa fa-fw fa-arrow-down me-1 opacity-50"></i>{" "}
                  Load More..
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <button
            type="button"
            className="btn btn-sm btn-alt-secondary d-sm-none"
            data-toggle="layout"
            data-action="header_search_on"
          >
            <i className="si si-magnifier"></i>
          </button>

          <form className="d-none d-sm-inline-block" method="POST">
            <div className="input-group input-group-sm">
              <input
                type="text"
                className="form-control form-control-alt"
                placeholder="Search.."
                id="page-header-search-input2"
                name="page-header-search-input2"
              />
              <span className="input-group-text bg-body border-0">
                <i className="si si-magnifier"></i>
              </span>
            </div>
          </form>

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
                src="assets/media/avatars/avatar10.jpg"
                alt="Header Avatar"
                style={{ width: "21px" }}
              />
              <span className="d-none d-sm-inline-block ms-1">John</span>
              <i className="fa fa-fw fa-angle-down d-none d-sm-inline-block"></i>
            </button>
            <div
              className="dropdown-menu dropdown-menu-md dropdown-menu-end p-0 border-0"
              aria-labelledby="page-header-user-dropdown"
            >
              <div className="p-3 text-center bg-body-light border-bottom rounded-top">
                <img
                  className="img-avatar img-avatar48 img-avatar-thumb"
                  src="assets/media/avatars/avatar10.jpg"
                  alt=""
                />
                <p className="mt-2 mb-0 fw-medium">John Smith</p>
                <p className="mb-0 text-muted fs-sm fw-medium">Web Developer</p>
              </div>
              <div className="p-2">
                <a
                  className="dropdown-item d-flex align-items-center justify-content-between"
                  href="be_pages_generic_inbox.html"
                >
                  <span className="fs-sm fw-medium">Inbox</span>
                  <span className="badge rounded-pill bg-primary ms-2">3</span>
                </a>
                <a
                  className="dropdown-item d-flex align-items-center justify-content-between"
                  href="be_pages_generic_profile.html"
                >
                  <span className="fs-sm fw-medium">Profile</span>
                  <span className="badge rounded-pill bg-primary ms-2">1</span>
                </a>
                <a
                  className="dropdown-item d-flex align-items-center justify-content-between"
                  href="#"
                >
                  <span className="fs-sm fw-medium">Settings</span>
                </a>
              </div>
              <div role="separator" className="dropdown-divider m-0"></div>
              <div className="p-2">
                <a
                  className="dropdown-item d-flex align-items-center justify-content-between"
                  href="op_auth_lock.html"
                >
                  <span className="fs-sm fw-medium">Lock Account</span>
                </a>
                <a
                  className="dropdown-item d-flex align-items-center justify-content-between"
                  href="op_auth_signin.html"
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
