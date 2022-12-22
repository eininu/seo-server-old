import sendNotification from "../Notification";
import { useEffect, useState } from "react";

const Websites = () => {
  const [appState, setAppState] = useState(undefined);

  useEffect(() => {
    checkStatus();
  }, [appState]);

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

  const createTableHandler = async () => {
    let res = await fetch("/api/websites/create_table");
    const resJson = await res.json();

    if (resJson.message === "Database table created successfully") {
      setAppState("configured");
      sendNotification(resJson.message);
    }

    if (resJson.message === "App currently configured") {
      setAppState("configured");
      sendNotification(resJson.message);
    }
  };

  const dropTableHandler = async () => {
    let res = await fetch("/api/websites/drop_table");
    const resJson = await res.json();

    if (resJson.message === "Good!") {
      setAppState("not configured");
      sendNotification(resJson.message);
    }
  };
  const [settings, setSettings] = useState([]);

  const getSettings = async () => {
    let res = await fetch("/api/websites/list");
    let resJson = await res.json();
    setSettings(resJson);
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <div className="content">
      <div className="row">
        <div className="col-12">
          <div className="block block-rounded">
            <div className="block-header block-header-default">
              <h1 className="block-title">Websites</h1>
              {appState === "configured" && (
                <div className="block-options">
                  <button
                    type="submit"
                    className="btn btn-sm btn-alt-primary mx-1"
                    onClick={dropTableHandler}
                  >
                    Drop Table
                  </button>
                  <button
                    type="reset"
                    className="btn btn-sm btn-alt-primary mx-1"
                  >
                    Restart Nginx
                  </button>
                </div>
              )}
            </div>
            <div className="block-content">
              {appState === "configured" && (
                <p className="text-muted">Here you can see your websites.</p>
              )}
              <div className="block block-rounded">
                <div className="block-content">
                  <table className="table table-vcenter">
                    <thead>
                      <tr>
                        <th>Param</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {settings.map((param, index) => {
                        return (
                          <tr key={index}>
                            <td>{param.website}</td>
                            <td className="text-center">
                              <div className="btn-group">
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    fetch(
                                      "/api/websites/delete/" + param.website
                                    ).then((r) => {
                                      if (r.status === 200) {
                                        sendNotification(
                                          `Website ${param.website} deleted successfully`
                                        );
                                        getSettings();
                                      }
                                    });
                                  }}
                                >
                                  <button
                                    type="submit"
                                    className="btn btn-sm btn-alt-secondary js-bs-tooltip-enabled"
                                    data-bs-toggle="tooltip"
                                    aria-label="Remove Client"
                                    data-bs-original-title="Remove Client"
                                    name={param.key}
                                    onClick={(e) => {
                                      // deleteSettingHandler();
                                      console.log(param.key);
                                    }}
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
              {appState === "not configured" && (
                <div className="row">
                  <div className="col-md-12">
                    <div
                      className="alert alert-light d-flex align-items-center justify-content-between"
                      role="alert"
                    >
                      <div className="flex-grow-1 me-3">
                        <p className="mb-0">
                          This app isn't configured. Create tables in database
                          for start using it.
                        </p>
                      </div>
                      <div>
                        <div className="col-sm">
                          <button
                            type="button"
                            className="btn btn-success js-click-ripple-enabled"
                            data-toggle="click-ripple"
                            onClick={createTableHandler}
                          >
                            Create table
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Websites;
