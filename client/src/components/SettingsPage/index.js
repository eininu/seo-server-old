import { useEffect, useState } from "react";

const SettingsPage = () => {
  const [settings, setSettings] = useState([]);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const getSettings = async () => {
    let res = await fetch("/api/settings");
    let resJson = await res.json();
    setSettings(resJson);
  };

  const deleteSetting = async (key) => {
    let body = {
      key,
    };
    await fetch("/api/settings", {
      method: "DELETE",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    });
    window.location.reload();
  };

  useEffect(() => {
    getSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = {
      key,
      value,
    };
    fetch("/api/settings", {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    });
    window.location.reload();
  };

  return (
    <main id="main-container">
      <div className="content">
        <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center py-2 text-center text-md-start">
          <div className="flex-grow-1 mb-1 mb-md-0">
            <h1 className="h3 fw-bold mb-2">Settings</h1>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="block block-rounded">
          <div className="block-content">
            <table className="table table-vcenter">
              <thead>
                <tr>
                  <th>Param</th>
                  <th>Value</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {settings.map((param, index) => {
                  return (
                    <tr key={index}>
                      <td>{param.key}</td>
                      <td>{param.value}</td>
                      <td className="text-center">
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-sm btn-alt-secondary js-bs-tooltip-enabled"
                            data-bs-toggle="tooltip"
                            aria-label="Remove Client"
                            data-bs-original-title="Remove Client"
                            onClick={() => {
                              deleteSetting(param.key);
                            }}
                          >
                            <i className="fa fa-fw fa-times"></i>
                          </button>
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
      <div className="content">
        <div className="row">
          <div className="col">
            <form onSubmit={handleSubmit}>
              <div className="row text-center">
                <div className="col-sm-4">
                  <div className="block block-transparent">
                    <div className="block-content">
                      <input
                        className="form-control"
                        type="text"
                        value={key}
                        placeholder="key"
                        onChange={(e) => {
                          setKey(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="block block-transparent">
                    <div className="block-content">
                      <input
                        className="form-control"
                        type="text"
                        value={value}
                        placeholder="value"
                        onChange={(e) => {
                          setValue(e.target.value);
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
