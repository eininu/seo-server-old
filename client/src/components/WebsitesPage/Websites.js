import sendNotification from "../Notification";
import { useEffect, useState } from "react";
import Modal from "../Modal";

const Websites = (props) => {
  const [appState, setAppState] = useState(undefined);

  useEffect(() => {
    checkStatus();
  }, [appState]);

  const [modal, setModal] = useState();

  const closeModal = () => {
    setModal(false);
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

  return (
    <>
      <div className="content">
        {modal && (
          <Modal closeModal={closeModal} modalText={<AskSudoPassword />} />
        )}

        <div className="row">
          <div className="col-12">
            <div className="block block-rounded">
              <div className="block-header block-header-default">
                <h1 className="block-title">Websites</h1>

                <div className="block-options">
                  <button
                    type="reset"
                    className="btn btn-sm btn-alt-primary mx-1"
                    onClick={() => {
                      setModal(true);
                    }}
                  >
                    Restart Nginx
                  </button>
                </div>
              </div>

              <div className="block-content">
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
