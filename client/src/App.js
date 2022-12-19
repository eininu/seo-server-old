import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <div id="page-container" className="page-header-dark main-content-boxed">
      <Header />
      <main id="main-container">
        <NavBar />
        <div className="content">
          <div className="block block-rounded">
            <div className="block-content text-center">
              <p>Hello World!</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
