const NavBar = () => {
  return (
    <div className="bg-primary-darker">
      <div className="content py-3">
        <div className="d-lg-none">
          <button
            type="button"
            className="btn w-100 btn-alt-secondary d-flex justify-content-between align-items-center"
            data-toggle="class-toggle"
            data-target="#main-navigation"
            data-class="d-none"
          >
            Menu
            <i className="fa fa-bars"></i>
          </button>
        </div>
        <div id="main-navigation" className="d-none d-lg-block mt-2 mt-lg-0">
          <ul className="nav-main nav-main-dark nav-main-horizontal nav-main-hover">
            <li className="nav-main-item">
              <a className="nav-main-link active" href="/">
                <i className="nav-main-link-icon si si-speedometer"></i>
                <span className="nav-main-link-name">Dashboard</span>
              </a>
            </li>
            <li className="nav-main-item">
              <a className="nav-main-link" href="/settings">
                <i className="nav-main-link-icon si si-settings"></i>
                <span className="nav-main-link-name">Settings</span>
              </a>
            </li>
            <li className="nav-main-heading">Heading</li>
            <li className="nav-main-item">
              <a
                className="nav-main-link"
                target="_blank"
                href="/be_pages_dashboard.html"
              >
                <i className="nav-main-link-icon si si-puzzle"></i>
                <span className="nav-main-link-name">Example</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
