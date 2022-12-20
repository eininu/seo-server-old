import { useEffect, useState } from "react";
import sendNotification from "../Notification";

const WebsitesPage = () => {
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

  return (
    <main id="main-container">
      <div className="content">
        <div className="row">
          <div className="col-12">
            <div className="block block-rounded">
              <div className="block-header block-header-default">
                <h1 className="block-title">Websites</h1>
              </div>
              <div className="block-content">
                {appState === "configured" && (
                  <p className="text-muted">Here you can see your websites.</p>
                )}
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
    </main>
  );
};

export default WebsitesPage;
