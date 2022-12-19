const InstallPage = () => {
  return (
    <main id="main-container">
      <div className="row g-0 justify-content-center">
        <div className="hero-static col-lg-7">
          <div className="content content-full overflow-hidden">
            <div className="py-5 text-center">
              <a href="index.html">
                <i className="fa fa-2x fa-circle-notch text-primary"></i>
              </a>
              <h1 className="h3 fw-bold mt-3 mb-2">Welcome to your web app</h1>
              <h2 className="fs-base fw-medium text-muted mb-0">
                Let's get it installed, it will only take a few seconds!
              </h2>
            </div>

            <form
              className="js-validation-installation"
              action="op_installation.html"
              method="POST"
              noValidate="novalidate"
            >
              <div className="block block-rounded">
                <div className="block-header block-header-default">
                  <h3 className="block-title">1. Database</h3>
                </div>
                <div className="block-content">
                  <div className="row items-push">
                    <div className="col-lg-4">
                      <p className="fs-sm text-muted">
                        Please pay extra attention because adding the correct
                        database info is vital for a successful app
                        installation.
                      </p>
                    </div>
                    <div className="col-lg-6 offset-lg-1">
                      <div className="mb-4">
                        <label className="form-label" htmlFor="install-db-name">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="install-db-name"
                          name="install-db-name"
                          placeholder="What's the name of your database?"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label" htmlFor="install-db-host">
                          Host
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="install-db-host"
                          name="install-db-host"
                          placeholder="Leave empty for 'localhost'"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="form-label"
                          htmlFor="install-db-prefix"
                        >
                          Table Prefix
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="install-db-prefix"
                          name="install-db-prefix"
                          placeholder="Leave empty for 'app_'"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="form-label"
                          htmlFor="install-db-username"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="install-db-username"
                          name="install-db-username"
                          placeholder="Database username"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="form-label"
                          htmlFor="install-db-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          id="install-db-password"
                          name="install-db-password"
                          placeholder="Database password"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="block block-rounded">
                <div className="block-header block-header-default">
                  <h3 className="block-title">2. Administrator</h3>
                </div>
                <div className="block-content">
                  <div className="row items-push">
                    <div className="col-lg-4">
                      <p className="fs-sm text-muted">
                        Please add your email and a strong password to create
                        the administrator account.
                      </p>
                    </div>
                    <div className="col-lg-6 offset-lg-1">
                      <div className="mb-4">
                        <label
                          className="form-label"
                          htmlFor="install-admin-email"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="install-admin-email"
                          name="install-admin-email"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="form-label"
                          htmlFor="install-admin-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          id="install-admin-password"
                          name="install-admin-password"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="form-label"
                          htmlFor="install-admin-password-confirm"
                        >
                          Password Confirmation
                        </label>
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          id="install-admin-password-confirm"
                          name="install-admin-password-confirm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="block block-transparent">
                <div className="block-content">
                  <div className="row items-push">
                    <div className="col-lg-7 offset-lg-5">
                      <button type="submit" className="btn btn-primary mb-2">
                        <i className="fa fa-terminal opacity-50 me-1"></i>{" "}
                        Install
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default InstallPage;
