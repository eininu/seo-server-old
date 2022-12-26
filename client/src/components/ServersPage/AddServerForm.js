import { useState } from "react";
import sendNotification from "../Notification";

const AddServerForm = (props) => {
  const [server, setServer] = useState("");

  const addServerHandler = async (e) => {
    e.preventDefault();

    if (server.length === 0) {
      return sendNotification(["Server cannot be blank", "danger"]);
    }

    const res = await fetch("/api/servers/", {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        server_ip: server,
      }),
    });

    let resJson = await res.json();
    props.getServers();

    return sendNotification(`${resJson.message}`, "info");
  };

  return (
    <div className="content">
      <div className="block block-rounded">
        <div className="block-header block-header-default">
          <h3 className="block-title">Add server</h3>
        </div>
        <div className="block-content block-content-full">
          <form onSubmit={addServerHandler}>
            <div className="row">
              <div className="col-lg-4">
                <p className="fs-sm text-muted">
                  Add only remote servers, not your own!
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
                      setServer(e.target.value);
                    }}
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-block btn-alt-primary col-12"
                  >
                    Add Server
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

export default AddServerForm;
