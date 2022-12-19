import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import IndexPage from "./components/IndexPage";

const name = 'JP9'

function App() {
  return (
    <div id="page-container" className="page-header-dark main-content-boxed">
      <Header params={{ name }} />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
        </Routes>
      </BrowserRouter>

      <Footer params={{ name }}/>
    </div>
  );
}

export default App;
