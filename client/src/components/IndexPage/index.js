import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
    labels: labels,
    datasets: [
        {
            label: "My First dataset",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [0, 10, 5, 2, 20, 30, 45],
        },
    ],
};

const options = {
    datasetIdKey: "js-chartjs-total-orders",
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            display: false,
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },
    },
};

const data2 = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Dataset 2',
            data: [0, 10, 5, 2, 20, 30, 45],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

const IndexPage = () => {
  return (
    <main id="main-container">

      <div className="content">
          <div className="row">
              <div className="col-6 col-md-3 col-lg-6 col-xl-3">
                  <a className="block block-rounded block-link-pop" href="#">
                      <div className="block-content block-content-full">
                          <div className="fs-sm fw-semibold text-uppercase text-muted">Something</div>
                          <div className="fs-2 fw-normal text-dark">0</div>
                      </div>
                  </a>
              </div>
              <div className="col-6 col-md-3 col-lg-6 col-xl-3">
                  <a className="block block-rounded block-link-pop" href="#">
                      <div className="block-content block-content-full">
                          <div className="fs-sm fw-semibold text-uppercase text-muted">Something</div>
                          <div className="fs-2 fw-normal text-dark">0</div>
                      </div>
                  </a>
              </div>
              <div className="col-6 col-md-3 col-lg-6 col-xl-3">
                  <a className="block block-rounded block-link-pop" href="#">
                      <div className="block-content block-content-full">
                          <div className="fs-sm fw-semibold text-uppercase text-muted">Something</div>
                          <div className="fs-2 fw-normal text-dark">0</div>
                      </div>
                  </a>
              </div>
              <div className="col-6 col-md-3 col-lg-6 col-xl-3">
                  <a className="block block-rounded block-link-pop" href="#">
                      <div className="block-content block-content-full">
                          <div className="fs-sm fw-semibold text-uppercase text-muted">Something</div>
                          <div className="fs-2 fw-normal text-dark">0</div>
                      </div>
                  </a>
              </div>
          </div>
          <div className="row">
              <div className="col-xl-8 col-xxl-9 d-flex flex-column">
                  
                  <div className="block block-rounded flex-grow-1 d-flex flex-column">
                      <div className="block-header block-header-default">
                          <h3 className="block-title">Something</h3>
                          <div className="block-options">
                              <button type="button" className="btn-block-option" data-toggle="block-option"
                                      data-action="state_toggle" data-action-mode="demo">
                                  <i className="si si-refresh"></i>
                              </button>
                              <button type="button" className="btn-block-option">
                                  <i className="si si-settings"></i>
                              </button>
                          </div>
                      </div>
                      <div className="block-content block-content-full flex-grow-1 d-flex align-items-center">

                          <Line options={options} data={data2} />
                          {/*<Line data={data} />*/}

                          {/*<canvas id="js-chartjs-earnings"*/}
                          {/*        // style="display: block; box-sizing: border-box; height: 511px; width: 1023px;"*/}
                          {/*        width="1023" height="511"></canvas>*/}
                      </div>
                      <div className="block-content bg-body-light">
                          <div className="row items-push text-center w-100">
                              <div className="col-sm-4">
                                  <dl className="mb-0">
                                      <dt className="fs-3 fw-bold d-inline-flex align-items-center space-x-2">
                                          <i className="fa fa-caret-up fs-base text-success"></i>
                                          <span>0</span>
                                      </dt>
                                      <dd className="fs-sm fw-medium text-muted mb-0">Something</dd>
                                  </dl>
                              </div>
                              <div className="col-sm-4">
                                  <dl className="mb-0">
                                      <dt className="fs-3 fw-bold d-inline-flex align-items-center space-x-2">
                                          <i className="fa fa-caret-up fs-base text-success"></i>
                                          <span>0</span>
                                      </dt>
                                      <dd className="fs-sm fw-medium text-muted mb-0">Something</dd>
                                  </dl>
                              </div>
                              <div className="col-sm-4">
                                  <dl className="mb-0">
                                      <dt className="fs-3 fw-bold d-inline-flex align-items-center space-x-2">
                                          <i className="fa fa-caret-down fs-base text-danger"></i>
                                          <span>0</span>
                                      </dt>
                                      <dd className="fs-sm fw-medium text-muted mb-0">Something</dd>
                                  </dl>
                              </div>
                          </div>
                      </div>
                  </div>
                  
              </div>
              <div className="col-xl-4 col-xxl-3 d-flex flex-column">
                  
                  
                  
                  <div className="row items-push flex-grow-1">
                      <div className="col-md-6 col-xl-12">
                          <div className="block block-rounded d-flex flex-column h-100 mb-0">
                              <div className="block-content flex-grow-1 d-flex justify-content-between">
                                  <dl className="mb-0">
                                      <dt className="fs-3 fw-bold">0</dt>
                                      <dd className="fs-sm fw-medium text-muted mb-0">Something</dd>
                                  </dl>
                                  <div>
                                      <div
                                          className="d-inline-block px-2 py-1 rounded-3 fs-xs fw-semibold text-danger bg-danger-light">
                                          <i className="fa fa-caret-down me-1"></i>
                                          0
                                      </div>
                                  </div>
                              </div>
                              <div className="block-content p-1 text-center overflow-hidden">
                                  
                                  {/*<canvas id="js-chartjs-total-orders"*/}
                                  {/*        // style="height: 90px; display: block; box-sizing: border-box; width: 327px;"*/}
                                  {/*        width="327" height="90"></canvas>*/}
                              </div>
                          </div>
                      </div>
                      <div className="col-md-6 col-xl-12">
                          <div className="block block-rounded d-flex flex-column h-100 mb-0">
                              <div className="block-content flex-grow-1 d-flex justify-content-between">
                                  <dl className="mb-0">
                                      <dt className="fs-3 fw-bold">0</dt>
                                      <dd className="fs-sm fw-medium text-muted mb-0">Something</dd>
                                  </dl>
                                  <div>
                                      <div
                                          className="d-inline-block px-2 py-1 rounded-3 fs-xs fw-semibold text-success bg-success-light">
                                          <i className="fa fa-caret-up me-1"></i>
                                          0
                                      </div>
                                  </div>
                              </div>
                              <div className="block-content p-1 text-center overflow-hidden">
                                  
                                  {/*<canvas id="js-chartjs-total-earnings"*/}
                                  {/*        // style="height: 90px; display: block; box-sizing: border-box; width: 327px;"*/}
                                  {/*        width="327" height="90"></canvas>*/}
                              </div>
                          </div>
                      </div>
                      <div className="col-xl-12">
                          <div className="block block-rounded d-flex flex-column h-100 mb-0">
                              <div className="block-content flex-grow-1 d-flex justify-content-between">
                                  <dl className="mb-0">
                                      <dt className="fs-3 fw-bold">0</dt>
                                      <dd className="fs-sm fw-medium text-muted mb-0">Something</dd>
                                  </dl>
                                  <div>
                                      <div
                                          className="d-inline-block px-2 py-1 rounded-3 fs-xs fw-semibold text-success bg-success-light">
                                          <i className="fa fa-caret-up me-1"></i>
                                          0
                                      </div>
                                  </div>
                              </div>
                              <div className="block-content p-1 text-center overflow-hidden">
                                  
                                  {/*<canvas id="js-chartjs-new-customers"*/}
                                  {/*        // style="height: 90px; display: block; box-sizing: border-box; width: 327px;"*/}
                                  {/*        width="327" height="90"></canvas>*/}
                              </div>
                          </div>
                      </div>
                  </div>
                  
              </div>
          </div>
      </div>
    </main>
  );
};

export default IndexPage;
