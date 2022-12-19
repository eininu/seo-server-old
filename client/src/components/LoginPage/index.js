const LoginPage = () => {
  return (
    <main id="main-container">
      <div className="hero-static d-flex align-items-center">
        <div className="content">
          <div className="row justify-content-center push">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <div className="block block-rounded mb-0">
                <div className="block-header block-header-default">
                  <h3 className="block-title">Sign In</h3>
                  <div className="block-options">
                    <a
                      className="btn-block-option fs-sm"
                      href="op_auth_reminder.html"
                    >
                      Forgot Password?
                    </a>
                    <a
                      className="btn-block-option js-bs-tooltip-enabled"
                      href="op_auth_signup.html"
                      data-bs-toggle="tooltip"
                      data-bs-placement="left"
                      aria-label="New Account"
                      data-bs-original-title="New Account"
                    >
                      <i className="fa fa-user-plus"></i>
                    </a>
                  </div>
                </div>
                <div className="block-content">
                  <div className="p-sm-3 px-lg-4 px-xxl-5 py-lg-5">
                    <h1 className="h2 mb-1">OneUI</h1>
                    <p className="fw-medium text-muted">
                      Welcome, please login.
                    </p>
                    <form
                      className="js-validation-signin"
                      action="be_pages_auth_all.html"
                      method="POST"
                      noValidate="novalidate"
                    >
                      <div className="py-3">
                        <div className="mb-4">
                          <input
                            type="text"
                            className="form-control form-control-alt form-control-lg"
                            id="login-username"
                            name="login-username"
                            placeholder="Username"
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="password"
                            className="form-control form-control-alt form-control-lg"
                            id="login-password"
                            name="login-password"
                            placeholder="Password"
                          />
                        </div>
                        <div className="mb-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="login-remember"
                              name="login-remember"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="login-remember"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <div className="col-md-6 col-xl-5">
                          <button
                            type="submit"
                            className="btn w-100 btn-alt-primary"
                          >
                            <i className="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i>{" "}
                            Sign In
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fs-sm text-muted text-center">
            <strong>OneUI 5.5</strong> ©{" "}
            <span data-toggle="year-copy" className="js-year-copy-enabled">
              2022
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
