import sendNotification from "../Notification";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import EditWebsiteForm from "./EditWebsiteForm";

const Websites = (props) => {
  const [appState, setAppState] = useState(undefined);
  const [backupArchive, setBackupArchive] = useState();

  useEffect(() => {
    checkStatus();
  }, [appState]);

  const [nginxReloadModal, setNginxReloadModal] = useState();
  const [importWebsitesModal, setImportWebsitesModal] = useState(false);

  const closeNginxReloadModal = () => {
    setNginxReloadModal(false);
  };
  const closeImportWebsitesModal = () => {
    setImportWebsitesModal(false);
  };

  const checkStatus = async () => {
    let res = await fetch("/api/websites/");
    const resJson = await res.json();

    if (resJson.message === "The websites api isn't configured") {
      setAppState("not configured");
    }

    if (resJson.message === "ok") {
      setAppState("configured");
    }
  };

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
      setNginxReloadModal(false);
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
  const deleteWebsiteHandler = async (e) => {
    e.preventDefault();
    const website = e.target.website.value;

    const requestToDelete = await fetch("/api/websites/", {
      method: "DELETE",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        website: website,
      }),
    });
    const responseToDelete = await requestToDelete.json();
    sendNotification(responseToDelete.message);
    responseToDelete.log.map((el) => {
      if (el.split(": ")[1] === `${website} deleted successfully`) {
        sendNotification(el);
      } else {
        sendNotification([el, "danger"]);
      }
    });
    props.getWebsites();
  };

  const loadBackupHandler = async (e) => {
    e.preventDefault();

    if (!backupArchive) {
      return sendNotification(["Backup Archive cannot be blank", "danger"]);
    }
    var formData = new FormData();
    formData.append("files", backupArchive.target.files[0]);

    let res = await fetch("/api/websites/import", {
      method: "POST",
      body: formData,
    });
    let resJson = await res.json();
    sendNotification(resJson.message);
    props.getWebsites();
    setImportWebsitesModal(false);
  };

  const createBackupHandler = async (e) => {
    e.preventDefault();
    const request = await fetch("/api/websites/backup");
    const requestJson = await request.json();
    sendNotification(requestJson.message);
  };

  const [websiteToEdit, setWebsiteToEdit] = useState();
  const [modalToEdit, setModalToEdit] = useState();
  const [nginxConfigToEdit, setNginxConfigToEdit] = useState();
  const editWebsiteHandler = async (e) => {
    e.preventDefault();
    const website = e.target.website.value;
    const request = await fetch("/api/websites/config/" + website);
    const requestJson = await request.json();
    setWebsiteToEdit(website);
    setNginxConfigToEdit(requestJson.nginxConfig);
    setModalToEdit(true);
    console.log();
  };

  return (
    <>
      <div className="content">
        {modalToEdit && (
          <Modal
            modalText={
              <EditWebsiteForm
                website={websiteToEdit}
                nginxConfig={nginxConfigToEdit}
                setModalToEdit={setModalToEdit}
              />
            }
          />
        )}
        {nginxReloadModal && (
          <Modal
            closeModal={closeNginxReloadModal}
            modalText={<AskSudoPassword />}
          />
        )}
        {importWebsitesModal && (
          <Modal
            closeModal={closeImportWebsitesModal}
            modalText={
              <form onSubmit={loadBackupHandler}>
                <div className="mb-4">
                  <label className="form-label" htmlFor="example-file-input">
                    Backup Archive
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    // accept="application/x-zip-compressed"
                    accept=".zip"
                    id="backup_archive"
                    name="backup_archive"
                    onInput={(e) => {
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      setBackupArchive(e);
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-block btn-alt-primary col-12"
                >
                  Import Websites
                </button>
              </form>
            }
          />
        )}

        <div className="row">
          <div className="col-12">
            <div className="block block-rounded">
              <div className="block-header block-header-default">
                <h1 className="block-title">Websites</h1>

                <div className="block-options">
                  <button
                    type="reset"
                    className="btn  btn-outline-light btn-sm mx-1"
                    onClick={createBackupHandler}
                  >
                    <i className="fa fa-fw si si-cloud-upload"></i>
                  </button>
                  <button
                    type="reset"
                    className="btn  btn-outline-light btn-sm mx-1"
                    onClick={() => {
                      window.open("/api/websites/export");
                    }}
                  >
                    <i className="fa fa-fw fa fa-download"></i>
                  </button>
                  <button
                    type="reset"
                    className="btn  btn-outline-light btn-sm mx-1"
                    onClick={() => {
                      setImportWebsitesModal(true);
                    }}
                  >
                    <i className="fa fa-fw fa fa-upload"></i>
                  </button>
                  <button
                    type="reset"
                    className="btn btn-sm btn-alt-primary mx-1"
                    onClick={() => {
                      setNginxReloadModal(true);
                    }}
                  >
                    Restart Nginx
                  </button>
                </div>
              </div>

              <div className="block-content">
                {props.differenceBetweenWebsites && (
                  <>
                    <p>
                      <span className="text-danger">Caution</span>: Remote
                      servers have something that you don't have locally
                    </p>
                    {/*<p>{JSON.stringify(props.differenceBetweenWebsites)}</p>*/}
                    <ul>
                      {props.differenceBetweenWebsites.map((el) => {
                        let server;
                        let websites;
                        Object.entries(el).map(([key, value]) => {
                          server = key;
                          websites = value;
                          // return el;
                        });
                        return (
                          <li>
                            {server}: {websites.toString()}
                          </li>
                        );
                        // return el;
                      })}
                    </ul>
                  </>
                )}

                {props.lostNginxConfigs && (
                  <p>
                    <span className="text-danger">Lost Nginx Configs</span>:{" "}
                    {`${props.lostNginxConfigs}`}
                  </p>
                )}
                {props.lostUploadArchives && (
                  <p>
                    <span className="text-danger">Lost Upload Archives</span>:{" "}
                    {`${props.lostUploadArchives}`}
                  </p>
                )}

                {props.lostWebsitesDirectories && (
                  <p>
                    <span className="text-danger">
                      Lost Website Directories
                    </span>
                    : {`${props.lostWebsitesDirectories}`}
                  </p>
                )}

                {/*<p className="text-muted">Here you can see your websites.</p>*/}

                <div className="block block-rounded">
                  <div className="block-content">
                    <table className="table table-vcenter">
                      <thead>
                        <tr>
                          <th>Website</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.websites.map((param, index) => {
                          return (
                            <tr key={index}>
                              <td>{param}</td>
                              <td className="text-center">
                                <div className="btn-group">
                                  <form onSubmit={editWebsiteHandler}>
                                    <input
                                      type={"hidden"}
                                      name={"website"}
                                      value={param}
                                    />
                                    <button
                                      type="submit"
                                      className="btn btn-sm btn-alt-secondary js-bs-tooltip-enabled mx-2"
                                      data-bs-toggle="tooltip"
                                      aria-label="Edit Website"
                                      data-bs-original-title="Edit Website"
                                      name={param.key}
                                    >
                                      <i className="fa fa-fw fa-edit"></i>
                                    </button>
                                  </form>
                                  <form onSubmit={deleteWebsiteHandler}>
                                    <input
                                      type={"hidden"}
                                      name={"website"}
                                      value={param}
                                    />
                                    <button
                                      type="submit"
                                      className="btn btn-sm btn-alt-secondary js-bs-tooltip-enabled"
                                      data-bs-toggle="tooltip"
                                      aria-label="Remove Client"
                                      data-bs-original-title="Remove Client"
                                      name={param.key}
                                      // onClick={(e) => {
                                      //   // deleteSettingHandler();
                                      //   console.log(param.key);
                                      // }}
                                    >
                                      <i className="fa fa-fw fa-times"></i>
                                    </button>
                                  </form>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Websites;
