import Chart from "chart.js/auto";
import {useEffect} from "react";

/*
 *  Document   : be_pages_dashboard.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Dashboard Page
 */

// Chart.js Charts, for more examples you can check out http://www.chartjs.org/docs
class pageDashboard {
    /*
     * Init Charts
     *
     */
    static initCharts() {
        // Set Global Chart.js configuration
        Chart.defaults.color = '#818d96';
        Chart.defaults.scale.grid.lineWidth = 0;
        Chart.defaults.scale.beginAtZero = true;
        Chart.defaults.datasets.bar.maxBarThickness = 45;
        Chart.defaults.elements.bar.borderRadius = 4;
        Chart.defaults.elements.bar.borderSkipped = false;
        Chart.defaults.elements.point.radius = 0;
        Chart.defaults.elements.point.hoverRadius = 0;
        Chart.defaults.plugins.tooltip.radius = 3;
        Chart.defaults.plugins.legend.labels.boxWidth = 10;

        // Get Chart Containers
        let chartEarningsCon = document.getElementById('js-chartjs-earnings');
        let chartTotalOrdersCon = document.getElementById('js-chartjs-total-orders');
        let chartTotalEarningsCon = document.getElementById('js-chartjs-total-earnings');
        let chartNewCustomersCon = document.getElementById('js-chartjs-new-customers');

        // Set Chart and Chart Data variables
        let chartEarnings, chartTotalOrders, chartTotalEarnings, chartNewCustomers;

        // Init Chart Earnings
        if (chartEarningsCon !== null) {
            chartEarnings = new Chart(chartEarningsCon, {
                type: 'bar',
                data: {
                    labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
                    datasets: [
                        {
                            label: 'This Week',
                            fill: true,
                            backgroundColor: 'rgba(100, 116, 139, .7)',
                            borderColor: 'transparent',
                            pointBackgroundColor: 'rgba(100, 116, 139, 1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(100, 116, 139, 1)',
                            data: [716, 628, 1056, 560, 956, 890, 790]
                        },
                        {
                            label: 'Last Week',
                            fill: true,
                            backgroundColor: 'rgba(100, 116, 139, .15)',
                            borderColor: 'transparent',
                            pointBackgroundColor: 'rgba(100, 116, 139, 1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(100, 116, 139, 1)',
                            data: [1160, 923, 1052, 1300, 880, 926, 963]
                        }
                    ]
                },
                options: {
                    scales: {
                        x: {
                            display: false,
                            grid: {
                                drawBorder: false
                            }
                        },
                        y: {
                            display: false,
                            grid: {
                                drawBorder: false
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                    },
                    plugins: {
                        legend: {
                            labels: {
                                boxHeight: 10,
                                font: {
                                    size: 14
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': $' + context.parsed.y;
                                }
                            }
                        }
                    }
                }
            });
        }

        // Init Chart Total Orders
        if (chartTotalOrdersCon !== null) {
            chartTotalOrders = new Chart(chartTotalOrdersCon, {
                type: 'line',
                data: {
                    labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
                    datasets: [
                        {
                            label: 'Total Orders',
                            fill: true,
                            backgroundColor: 'rgba(220, 38, 38, .15)',
                            borderColor: 'transparent',
                            pointBackgroundColor: 'rgba(220, 38, 38, 1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(220, 38, 38, 1)',
                            data: [33, 29, 32, 37, 38, 30, 34, 28, 43, 45, 26, 45, 49, 39],
                        }
                    ]
                },
                options: {
                    maintainAspectRatio: false,
                    tension: .4,
                    scales: {
                        x: {
                            display: false
                        },
                        y: {
                            display: false
                        }
                    },
                    interaction: {
                        intersect: false,
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return ' ' + context.parsed.y + ' Orders';
                                }
                            }
                        }
                    }
                }
            });
        }

        // Init Chart Total Earnings
        if (chartTotalEarningsCon !== null) {
            chartTotalEarnings = new Chart(chartTotalEarningsCon, {
                type: 'line',
                data: {
                    labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
                    datasets: [
                        {
                            label: 'Total Earnings',
                            fill: true,
                            backgroundColor: 'rgba(101, 163, 13, .15)',
                            borderColor: 'transparent',
                            pointBackgroundColor: 'rgba(101, 163, 13, 1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(101, 163, 13, 1)',
                            data: [716, 1185, 750, 1365, 956, 890, 1200, 968, 1158, 1025, 920, 1190, 720, 1352],
                        }
                    ]
                },
                options: {
                    maintainAspectRatio: false,
                    tension: .4,
                    scales: {
                        x: {
                            display: false
                        },
                        y: {
                            display: false
                        }
                    },
                    interaction: {
                        intersect: false,
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return ' $' + context.parsed.y;
                                }
                            }
                        }
                    }
                }
            });
        }

        // Init Chart New Customers
        if (chartNewCustomersCon !== null) {
            chartNewCustomers = new Chart(chartNewCustomersCon, {
                type: 'line',
                data: {
                    labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
                    datasets: [
                        {
                            label: 'Total Orders',
                            fill: true,
                            backgroundColor: 'rgba(101, 163, 13, .15)',
                            borderColor: 'transparent',
                            pointBackgroundColor: 'rgba(101, 163, 13, 1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(101, 163, 13, 1)',
                            data: [25, 15, 36, 14, 29, 19, 36, 41, 28, 26, 29, 33, 23, 41],
                        }
                    ]
                },
                options: {
                    maintainAspectRatio: false,
                    tension: .4,
                    scales: {
                        x: {
                            display: false
                        },
                        y: {
                            display: false
                        }
                    },
                    interaction: {
                        intersect: false,
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return ' ' + context.parsed.y + ' Customers';
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    /*
     * Init functionality
     *
     */
    static init() {
        this.initCharts();
    }
}


const IndexPage = () => {
    // Initialize when page loads
    useEffect(() => {
        /* global One:readonly */
        One.onLoad(() => pageDashboard.init());
    })

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

                          <canvas id="js-chartjs-earnings"
                                  style={{
                                      display: "block",
                                      boxSizing: "border-box",
                                      height: "511px",
                                      width: "1023px"
                                  }}
                                  width="1023" height="511"></canvas>
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
                                  
                                  <canvas id="js-chartjs-total-orders"
                                          style={{
                                              height: "90px",
                                              display: "block",
                                              boxSizing: "border-box",
                                              width: "327px"
                                          }}
                                          width="327" height="90"></canvas>
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
                                  
                                  <canvas id="js-chartjs-total-earnings"
                                          style={{
                                              height: "90px",
                                              display: "block",
                                              boxSizing: "border-box",
                                              width: "327px",
                                          }}
                                          width="327" height="90"></canvas>
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
                                  
                                  <canvas id="js-chartjs-new-customers"
                                          style={{
                                              height: "90px",
                                              display: "block",
                                              boxSizing: "border-box",
                                              width: "327px",
                                          }}
                                          width="327" height="90"></canvas>
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
