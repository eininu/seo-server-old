import sendNotification from "../Notification";

const Servers = (props) => {
  return (
    <>
      <div className="content">
        <div className="row">
          <div className="col-12">
            <div className="block block-rounded">
              <div className="block-header block-header-default">
                <h1 className="block-title">Servers</h1>
              </div>

              <div className="block-content">
                {/*<p className="text-muted">Here you can see your websites.</p>*/}

                <div className="block block-rounded">
                  <div className="block-content">
                    <table className="table table-vcenter">
                      <thead>
                        <tr>
                          <th>Server IP</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.servers.map((param, index) => {
                          return (
                            <tr key={index}>
                              <td>{param}</td>
                              <td className="text-center">
                                <div className="btn-group">
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      fetch("/api/servers/", {
                                        method: "DELETE",
                                        headers: {
                                          "content-type":
                                            "application/json; charset=utf-8",
                                        },
                                        body: JSON.stringify({
                                          server_ip: param,
                                        }),
                                      }).then((r) => {
                                        if (r.status === 200) {
                                          sendNotification(
                                            `Server ${param} deleted successfully`
                                          );
                                          props.getServers();
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

export default Servers;
