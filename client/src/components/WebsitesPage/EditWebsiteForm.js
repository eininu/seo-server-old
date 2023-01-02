import { useState } from "react";
import sendNotification from "../Notification";
import { CopyToClipboard } from "react-copy-to-clipboard";

const EditWebsiteForm = (props) => {
  const [website, setWebsite] = useState(props.website);
  const [nginxConfig, setNginxConfig] = useState(props.nginxConfig);
  const [websiteArchive, setWebsiteArchive] = useState("edit");
  const [blockLoader, setBlockLoader] = useState(false);

  const editWebsiteHandler = async (e) => {
    e.preventDefault();
    setBlockLoader(true);

    var formData = new FormData();
    formData.append("website", website);
    formData.append("nginx_config", nginxConfig);
    formData.append("is_edit", "yes");
    if (websiteArchive !== "edit") {
      formData.append("files", websiteArchive.target.files[0]);
    }
    var randomNumber = Math.floor(1000 + Math.random() * 9000);

    let allowAction;
    let question = prompt(
      `If you really wanna backup websites write ${randomNumber} in this form:`,
      "no"
    );

    if (question === `${randomNumber}`) {
      allowAction = true;
    } else {
      allowAction = false;
    }

    if (allowAction) {
      try {
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

        sendNotification(`${resJson.message}`, "info");
      } catch (err) {
        sendNotification(["Something went wrong with api request", "danger"]);
      }
      props.setModalToEdit(false);
    } else {
      sendNotification([`Action isn't allowed by client`, "danger"]);
    }

    setBlockLoader(false);
  };

  return (
    <div className="content">
      <div
        className={
          blockLoader
            ? "block block-rounded block-mode-loading"
            : "block block-rounded"
        }
      >
        <div className="block-header block-header-default">
          <h3 className="block-title">Edit website</h3>
        </div>
        <div className="block-content block-content-full">
          <form onSubmit={editWebsiteHandler}>
            <div className="row">
              <div className="mb-12">
                <label className="form-label" htmlFor="example-text-input-alt">
                  Website Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="website"
                  value={website}
                  name="website"
                  placeholder=""
                  onChange={(e) => {
                    setWebsite(e.target.value);
                  }}
                  disabled
                />
              </div>
              <div className="mb-12">
                <label
                  className="form-label"
                  htmlFor="example-textarea-input-alt"
                >
                  Nginx Config
                </label>{" "}
                <small className="text-muted">
                  <CopyToClipboard text={props.nginxConfig}>
                    <small>copy placeholder</small>
                  </CopyToClipboard>
                </small>
                <textarea
                  className="form-control form-control-alt"
                  id="example-textarea-input-alt"
                  name="example-textarea-input-alt"
                  rows="20"
                  value={nginxConfig}
                  // value={props.nginxConfig}
                  placeholder={props.nginxConfig}
                  onChange={(e) => {
                    e.preventDefault();
                    if (e.target.value.length === 0) {
                      setNginxConfig(undefined);
                    } else {
                      setNginxConfig(e.target.value);
                    }
                  }}
                ></textarea>
              </div>
              <div className="mb-12">
                <label className="form-label" htmlFor="example-file-input">
                  Website Archive
                </label>{" "}
                <small className="text-muted">
                  <small
                    onClick={() => {
                      window.open("/api/websites/download/" + website);
                    }}
                  >
                    download source
                  </small>
                </small>
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
              <div className="mb-12">
                {/*<label className="form-label">Checkboxes</label>*/}
                <div className="space-y-2">
                  <div className="form-check"></div>
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-block btn-alt-primary col-12"
                >
                  Edit Website
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditWebsiteForm;
