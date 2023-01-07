import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ParkIoPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [domains, setDomains] = useState([]);
  const [auctionsBuffer, setAuctionsBuffer] = useState("");
  const [domainsBuffer, setDomainsBuffer] = useState("");

  const createAuctionBuffer = () => {
    const result = auctions.join("\n");
    setAuctionsBuffer((data) => data + result);
  };
  const createDomainsBuffer = () => {
    const result = domains.join("\n");
    setDomainsBuffer((data) => data + result);
  };

  const getData = () => {
    fetch("/api/park.io")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        getAuctions(data);
        getDomains(data);
      });
  };
  const getAuctions = async (data) => {
    if (!data.auctionsJson) {
      const req = await fetch("/api/park.io/get_auctions");
      const reqJson = await req.json();

      reqJson.auctions.map((el) => {
        setAuctions((auc) => [...auc, el.name]);
      });
    } else {
      data.auctionsJson.auctions.map((el) => {
        setAuctions((auc) => [...auc, el.name]);
      });
    }
  };

  const getDomains = async (data) => {
    if (!data.domainsJson) {
      const req = await fetch("/api/park.io/get_domains");
      const reqJson = await req.json();

      reqJson.domains.map((el) => {
        setDomains((dom) => [...dom, el.name]);
      });
    } else {
      data.domainsJson.domains.map((el) => {
        setDomains((dom) => [...dom, el.name]);
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main id="main-container">
      <div className="bg-body-light">
        <div className="content content-full">
          <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center py-2">
            <div className="flex-grow-1">
              <h1 className="h3 fw-bold mb-2">park.io</h1>
              <h2 className="fs-base lh-base fw-medium text-muted mb-0">
                Domains
              </h2>
            </div>
            <nav
              className="flex-shrink-0 mt-3 mt-sm-0 ms-sm-3"
              aria-label="breadcrumb"
            >
              <ol className="breadcrumb breadcrumb-alt">
                <li className="breadcrumb-item">
                  <a className="link-fx" href="/">
                    Dashboard
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a className="link-fx" href="/domains">
                    Domains
                  </a>
                </li>
                <li className="breadcrumb-item" aria-current="page">
                  park.io
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="row">
          <div className="col-6 col-lg-6">
            <div
              className={
                auctions.length === 0
                  ? "block block-rounded block-link-shadow text-center block-mode-loading"
                  : "block block-rounded block-link-shadow text-center ribbon"
              }
            >
              <CopyToClipboard text={`${auctionsBuffer}`}>
                <div className="ribbon-box" style={{ cursor: "pointer" }}>
                  <i
                    className={
                      auctionsBuffer.length === 0
                        ? "fa fa-fw fa-file"
                        : "fa fa-check"
                    }
                    onClick={createAuctionBuffer}
                  ></i>{" "}
                  <i
                    className={
                      auctions.length === 0
                        ? "si si-refresh animated flash"
                        : "si si-refresh"
                    }
                    onClick={async () => {
                      await setAuctions([]);
                      await fetch("/api/park.io/get_auctions");
                      await getData();
                    }}
                  ></i>
                </div>
              </CopyToClipboard>

              <div className="block-content block-content-full">
                <div className="fs-2 fw-semibold text-dark">
                  {auctions.length === 0 ? "..." : auctions.length}
                </div>
              </div>
              <div className="block-content py-2 bg-body-light">
                <p className="fw-medium fs-sm text-muted mb-0">Auctions</p>
              </div>
            </div>
          </div>

          <div className="col-6 col-lg-6">
            <div
              className={
                domains.length === 0
                  ? "block block-rounded block-link-shadow text-center block-mode-loading"
                  : "block block-rounded block-link-shadow text-center ribbon"
              }
            >
              <CopyToClipboard text={`${domainsBuffer}`}>
                <div className="ribbon-box" style={{ cursor: "pointer" }}>
                  <i
                    className={
                      domainsBuffer.length === 0
                        ? "fa fa-fw fa-file"
                        : "fa fa-check"
                    }
                    onClick={createDomainsBuffer}
                  ></i>{" "}
                  <i
                    className={
                      domains.length === 0
                        ? "si si-refresh animated flash"
                        : "si si-refresh"
                    }
                    onClick={async () => {
                      await setDomains([]);
                      await fetch("/api/park.io/get_domains");
                      await getData();
                    }}
                  ></i>
                </div>
              </CopyToClipboard>
              <div className="block-content block-content-full">
                <div className="fs-2 fw-semibold text-dark">
                  {domains.length === 0 ? "..." : domains.length}
                </div>
              </div>
              <div className="block-content py-2 bg-body-light">
                <p className="fw-medium fs-sm text-muted mb-0">Domains</p>
              </div>
            </div>
          </div>
        </div>
        <div className="block block-rounded">
          <div className="block-content text-center">
            <p>Left Sidebar, right Side Overlay and a fixed Header.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ParkIoPage;
