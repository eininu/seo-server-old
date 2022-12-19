const Footer = (props) => {
  return (
    <footer id="page-footer" className="bg-body-extra-light">
      <div className="content py-3">
        <div className="row fs-sm">
          <div className="col-sm-6 order-sm-2 py-1 text-center text-sm-end">
            <i className="fa fa-heart text-danger"></i>
          </div>
          <div className="col-sm-6 order-sm-1 py-1 text-center text-sm-start">
            <a
              className="fw-semibold"
              href="/"
              target="_blank"
            >
              { props.params.name }
            </a>{" "}
            ©{" "}
            <span data-toggle="year-copy" className="js-year-copy-enabled">
              2022
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
