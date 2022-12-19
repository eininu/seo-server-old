import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import IndexPage from "./components/IndexPage";

function App() {
  return (
    <div id="page-container" className="page-header-dark main-content-boxed">
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
