import { useState } from "react";
import sendNotification from "../Notification";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Modal from "../Modal";

const AddWebsiteForm = (props) => {
  const [website, setWebsite] = useState("");

  let nginxConfigExample = `server {
  server_name ${website};
  index index.html;
  root /home/ein/jp9.org/websites/${website};

  location / {
    try_files $uri /index.html;  
  }

  location /api/ {
          proxy_pass http://127.0.0.1:3001/public_api;
  }

  listen 80;
  listen [::]:80;
}

server {
  server_name ${website};
  ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
  ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;
  index index.html;
  root /home/ein/jp9.org/websites/${website};

  location / {
    try_files $uri /index.html;  
  }

  location /api/ {
          proxy_pass http://127.0.0.1:3001/public_api;
  }

  listen 443 http2 ssl;
  listen [::]:443 http2 ssl;
}`;

  const [nginxConfig, setNginxConfig] = useState(undefined);
  const [websiteArchive, setWebsiteArchive] = useState();
  const [itNeedsToRestartNginx, setTtNeedsToRestartNginx] = useState(false);

  const AskSudoPassword = () => {
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();

      let body = {
        password,
      };
      const res = await fetch("/api/shell/nginx/reload", {
        method: "POST",
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(body),
      });

      const resJson = await res.json();

      sendNotification([resJson.message, "danger"]);
      setModal(false);
    };

    return (
      <>
        <p>
          Input <b>sudo</b> user password
        </p>
        <form onSubmit={handleSubmit}>
          <div className="row text-center">
            <div className="col-sm-8">
              <div className="block block-transparent">
                <div className="block-content">
                  <input
                    className="form-control"
                    type="text"
                    value={password}
                    placeholder="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="block block-transparent">
                <div className="block-content">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  };

  const addWebsiteHandler = async (e) => {
    e.preventDefault();

    if (website.length === 0) {
      return sendNotification(["Website cannot be blank", "danger"]);
    }
    if (!nginxConfig) {
      return sendNotification(["Nginx Config cannot be blank", "danger"]);
    }

    if (!websiteArchive) {
      return sendNotification(["Website Archive cannot be blank", "danger"]);
    }

    // if (
    //   websiteArchive.target.files[0].type !== "application/x-zip-compressed"
    // ) {
    //   return sendNotification(["Website File should be zip archive", "danger"]);
    // }

    var formData = new FormData();
    formData.append("website", website);
    formData.append("nginx_config", nginxConfig);
    formData.append("files", websiteArchive.target.files[0]);

    let res = await fetch("/api/websites/", {
      method: "POST",
      body: formData,
    });
    let resJson = await res.json();
    resJson.log.map((el) => {
      if (el.split(": ")[1] === `${website} created successfully`) {
        sendNotification(el);
      } else {
        sendNotification([el, "danger"]);
      }
    });
    props.getWebsites();

    itNeedsToRestartNginx ? setModal(true) : setModal(false);

    return sendNotification(`${resJson.message}`, "info");
  };

  const [modal, setModal] = useState();

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="content">
      <div className="block block-rounded">
        <div className="block-header block-header-default">
          <h3 className="block-title">Add website</h3>
        </div>
        <div className="block-content block-content-full">
          <form onSubmit={addWebsiteHandler}>
            <div className="row">
              <div className="col-lg-4">
                <p className="fs-sm text-muted">
                  Be careful with nginx config, because that will broke app.
                </p>
              </div>
              <div className="col-lg-8 col-xl-5">
                <div className="mb-4">
                  <label
                    className="form-label"
                    htmlFor="example-text-input-alt"
                  >
                    Website Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-alt"
                    id="website"
                    name="website"
                    placeholder=""
                    onChange={(e) => {
                      setWebsite(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="form-label"
                    htmlFor="example-textarea-input-alt"
                  >
                    Nginx Config
                  </label>{" "}
                  <small className="text-muted">
                    <CopyToClipboard text={`${nginxConfigExample}`}>
                      <small>copy placeholder</small>
                    </CopyToClipboard>
                  </small>
                  <textarea
                    className="form-control form-control-alt"
                    id="example-textarea-input-alt"
                    name="example-textarea-input-alt"
                    rows="20"
                    placeholder={nginxConfigExample}
                    onChange={(e) => {
                      if (e.target.value.length === 0) {
                        setNginxConfig(undefined);
                      } else {
                        setNginxConfig(e.target.value);
                      }
                    }}
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="form-label" htmlFor="example-file-input">
                    Website Archive
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    // accept="application/x-zip-compressed"
                    accept=".zip"
                    id="website_archive"
                    name="website_archive"
                    onChange={(e) => {
                      setWebsiteArchive(e);
                    }}
                  />
                </div>
                <div className="mb-4">
                  {/*<label className="form-label">Checkboxes</label>*/}
                  <div className="space-y-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={itNeedsToRestartNginx}
                        id="restart_nginx"
                        name="restart_nginx"
                        onChange={() => {
                          setTtNeedsToRestartNginx(!itNeedsToRestartNginx);
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="example-checkbox-default1"
                      >
                        Restart NGINX
                      </label>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-block btn-alt-primary col-12"
                  >
                    Add Website
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {modal && (
        <Modal closeModal={closeModal} modalText={<AskSudoPassword />} />
      )}
    </div>
  );
};

export default AddWebsiteForm;
