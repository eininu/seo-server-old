const NotFound = () => {
  return (
    <>
      <main id="main-container">
        <div className="content">
          <div className="block block-rounded">
            <div className="block-header bg-danger"></div>
            <div className="block-content text-center">
              <h1>Error 404</h1>
              <p>Page not Found!</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
