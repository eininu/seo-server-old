import { useEffect, useState } from "react";
import sendNotification from "../Notification";

const InstallPage = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);
  const [tgToken, setTgToken] = useState("");
  const [tgUserId, setTgUserId] = useState("");
  const [tgAuthCode, setTgAuthCode] = useState("");
  const [authCodeSent, setAuthCodeSent] = useState(false);

  useEffect(() => {
    message && sendNotification(message);
  }, [message]);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let body = {
        password,
        tgToken,
        tgUserId,
        tgAuthCode,
      };

      let res = await fetch("/api/setup", {
        method: "POST",
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(body),
      });
      let resJson = await res.json();
      if (resJson.message === "Auth code sent") {
        setAuthCodeSent(true);
      }
      if (resJson.message === "Successfully configured!") {
        window.location.reload();
      }
      setMessage([resJson.message, "info"]);
    } catch (err) {
      console.log(err);
    }
  };

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
              onSubmit={handleSubmit}
            >
              <div className="block block-rounded">
                <div className="block-header block-header-default">
                  <h3 className="block-title">1. Administrator</h3>
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
                          htmlFor="install-admin-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          id="install-admin-password"
                          name="install-admin-password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="block block-rounded">
                <div className="block-header block-header-default">
                  <h3 className="block-title">2. Telegram</h3>
                </div>
                <div className="block-content">
                  <div className="row items-push">
                    <div className="col-lg-4">
                      <p className="fs-sm text-muted">
                        It helps to get OTG keys and another useful information
                        from app
                      </p>
                    </div>
                    <div className="col-lg-6 offset-lg-1">
                      {!authCodeSent && (
                        <>
                          <div className="mb-4">
                            <label
                              className="form-label"
                              htmlFor="install-db-name"
                            >
                              tgToken
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="install-db-name"
                              name="install-db-name"
                              value={tgToken}
                              placeholder="tgToken"
                              onChange={(e) => {
                                setTgToken(e.target.value);
                              }}
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              className="form-label"
                              htmlFor="install-db-host"
                            >
                              tgUserId
                            </label>
                            <input
                              type="text"
                              value={tgUserId}
                              placeholder="tgUserId"
                              onChange={(e) => {
                                setTgUserId(e.target.value);
                              }}
                              className="form-control form-control-lg"
                              id="install-db-host"
                              name="install-db-host"
                            />
                          </div>
                        </>
                      )}
                      {authCodeSent && (
                        <div className="mb-4">
                          <label
                            className="form-label"
                            htmlFor="install-db-host"
                          >
                            AuthCode
                          </label>
                          <input
                            className="form-control form-control-lg"
                            id="install-db-host"
                            name="install-db-host"
                            type="text"
                            value={tgAuthCode}
                            placeholder="tgAuthCode"
                            onChange={(e) => {
                              setTgAuthCode(e.target.value);
                            }}
                          />
                        </div>
                      )}
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
