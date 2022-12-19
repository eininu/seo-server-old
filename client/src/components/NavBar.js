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
              <a
                className="nav-main-link active"
                href="be_pages_dashboard.html"
              >
                <i className="nav-main-link-icon si si-speedometer"></i>
                <span className="nav-main-link-name">Dashboard</span>
              </a>
            </li>
            <li className="nav-main-heading">Heading</li>
            <li className="nav-main-item">
              <a
                className="nav-main-link nav-main-link-submenu"
                data-toggle="submenu"
                aria-haspopup="true"
                aria-expanded="false"
                href="#"
              >
                <i className="nav-main-link-icon si si-puzzle"></i>
                <span className="nav-main-link-name">Dropdown</span>
              </a>
              <ul className="nav-main-submenu">
                <li className="nav-main-item">
                  <a className="nav-main-link" href="#">
                    <span className="nav-main-link-name">Link #1</span>
                  </a>
                </li>
                <li className="nav-main-item">
                  <a className="nav-main-link" href="#">
                    <span className="nav-main-link-name">Link #2</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-main-heading">Extra</li>
            <li className="nav-main-item ms-lg-auto">
              <a
                className="nav-main-link nav-main-link-submenu"
                data-toggle="submenu"
                aria-haspopup="true"
                aria-expanded="false"
                href="#"
              >
                <i className="nav-main-link-icon fa fa-brush"></i>
                <span className="nav-main-link-name d-lg-none">Themes</span>
              </a>
              <ul className="nav-main-submenu nav-main-submenu-right">
                <li className="nav-main-item">
                  <a
                    className="nav-main-link active"
                    data-toggle="theme"
                    data-theme="default"
                    href="#"
                  >
                    <i className="nav-main-link-icon fa fa-square text-default"></i>
                    <span className="nav-main-link-name">Default</span>
                  </a>
                </li>
                <li className="nav-main-item">
                  <a
                    className="nav-main-link"
                    data-toggle="theme"
                    data-theme="assets/css/themes/amethyst.min.css"
                    href="#"
                  >
                    <i className="nav-main-link-icon fa fa-square text-amethyst"></i>
                    <span className="nav-main-link-name">Amethyst</span>
                  </a>
                </li>
                <li className="nav-main-item">
                  <a
                    className="nav-main-link"
                    data-toggle="theme"
                    data-theme="assets/css/themes/city.min.css"
                    href="#"
                  >
                    <i className="nav-main-link-icon fa fa-square text-city"></i>
                    <span className="nav-main-link-name">City</span>
                  </a>
                </li>
                <li className="nav-main-item">
                  <a
                    className="nav-main-link"
                    data-toggle="theme"
                    data-theme="assets/css/themes/flat.min.css"
                    href="#"
                  >
                    <i className="nav-main-link-icon fa fa-square text-flat"></i>
                    <span className="nav-main-link-name">Flat</span>
                  </a>
                </li>
                <li className="nav-main-item">
                  <a
                    className="nav-main-link"
                    data-toggle="theme"
                    data-theme="assets/css/themes/modern.min.css"
                    href="#"
                  >
                    <i className="nav-main-link-icon fa fa-square text-modern"></i>
                    <span className="nav-main-link-name">Modern</span>
                  </a>
                </li>
                <li className="nav-main-item">
                  <a
                    className="nav-main-link"
                    data-toggle="theme"
                    data-theme="assets/css/themes/smooth.min.css"
                    href="#"
                  >
                    <i className="nav-main-link-icon fa fa-square text-smooth"></i>
                    <span className="nav-main-link-name">Smooth</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
