import { useState } from "react";
import sendNotification from "../Notification";

const AddWebsiteForm = () => {
  const [website, setWebsite] = useState("");

  let nginxConfigExample = `server {
  server_name ${website};
  index index.html;
  root /home/ein/jp9.org/websites/${website};

  location /api/ {
          proxy_pass http://127.0.0.1:3001/public_api;
  }

  listen 80;
  listen [::]:80;
}`;

  const [nginxConfig, setNginxConfig] = useState(undefined);
  const addWebsiteHandler = async (e) => {
    e.preventDefault();

    // if (website.length === 0) {
    //   sendNotification(["Website cannot be blank", "danger"]);
    // }if (!nginxConfig) {
    //   sendNotification(["Nginx Config cannot be blank", "danger"]);
    // } else {
    //   try {
    //     let body = {
    //       website: website,
    //       nginx_config: nginxConfig,
    //     };
    //
    //     let res = await fetch("/api/websites/add", {
    //       method: "POST",
    //       headers: {
    //         "content-type": "application/json; charset=utf-8",
    //       },
    //       body: JSON.stringify(body),
    //     });
    //     let resJson = await res.json();
    //
    //     sendNotification(`${resJson.message}`, "info");
    //   } catch (err) {
    //     sendNotification(`${err}`);
    //   }
    // }
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
                    <a
                      onClick={() => {
                        navigator.clipboard.writeText(nginxConfigExample);
                        sendNotification("Copied");
                      }}
                    >
                      copy placeholder
                    </a>
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
                    id="example-file-input"
                  />
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
    </div>
  );
};

export default AddWebsiteForm;
