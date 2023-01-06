import { useEffect, useState } from "react";

const NavBar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const currentPathName = window.location.pathname;

  useEffect(() => {});

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
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            Menu
            <i
              className="fa fa-bars"
              onClick={() => setMobileMenu(!mobileMenu)}
            ></i>
          </button>
        </div>
        <div
          id="main-navigation"
          className={
            mobileMenu
              ? "d-lg-block mt-2 mt-lg-0"
              : "d-none d-lg-block mt-2 mt-lg-0"
          }
        >
          <ul className="nav-main nav-main-dark nav-main-horizontal nav-main-hover">
            <li className="nav-main-item">
              <a
                className={
                  currentPathName === "/"
                    ? "nav-main-link active"
                    : "nav-main-link"
                }
                href="/"
              >
                <i className="nav-main-link-icon si si-speedometer"></i>
                <span className="nav-main-link-name">Dashboard</span>
              </a>
            </li>
            <li className="nav-main-item">
              <a
                className={
                  currentPathName === "/websites"
                    ? "nav-main-link active"
                    : "nav-main-link"
                }
                href="/websites"
              >
                <i className="nav-main-link-icon si si-globe"></i>
                <span className="nav-main-link-name">Websites</span>
              </a>
            </li>
            <li className="nav-main-item">
              <a
                className={
                  currentPathName === "/servers"
                    ? "nav-main-link active"
                    : "nav-main-link"
                }
                href="/servers"
              >
                <i className="nav-main-link-icon fa fa-server"></i>
                <span className="nav-main-link-name">Servers</span>
              </a>
            </li>
            <li className="nav-main-item">
              <a
                className={
                  currentPathName === "/settings"
                    ? "nav-main-link active"
                    : "nav-main-link"
                }
                href="/settings"
              >
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
