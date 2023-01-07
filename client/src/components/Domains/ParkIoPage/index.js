import { useEffect, useState } from "react";

const ParkIoPage = () => {
  const [data, setData] = useState();

  const [auctions, setAuctions] = useState({});
  const [domains, setDomains] = useState({});

  const getData = () =>
    fetch("/api/park.io/")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        data.auctionsJson ? setAuctions(data.auctionsJson) : getAuctions();
        data.domainsJson ? setDomains(data.domainsJson) : getDomains();

        return setData(data);
      });

  const getAuctions = () =>
    fetch("/api/park.io/get_auctions").then(() => getData());
  const getDomains = () =>
    fetch("/api/park.io/get_domains").then(() => getData());

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
            <a
              className="block block-rounded block-link-shadow text-center"
              href="#"
            >
              <div className="block-content block-content-full">
                <div className="fs-2 fw-semibold text-dark">
                  {auctions.count}
                </div>
              </div>
              <div className="block-content py-2 bg-body-light">
                <p className="fw-medium fs-sm text-muted mb-0">Auctions</p>
              </div>
            </a>
          </div>

          <div className="col-6 col-lg-6">
            <a
              className="block block-rounded block-link-shadow text-center"
              href="#"
            >
              <div className="block-content block-content-full">
                <div className="fs-2 fw-semibold text-dark">
                  {domains.count}
                </div>
              </div>
              <div className="block-content py-2 bg-body-light">
                <p className="fw-medium fs-sm text-muted mb-0">Domains</p>
              </div>
            </a>
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
