import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import IndexPage from "./components/IndexPage";
import InstallPage from "./components/InstallPage";
import LoginPage from "./components/LoginPage";
import NotFound from "./components/NotFound";

const name = "JP9";
const isInstalled = false;
const isAuth = false;

function App() {
  return (
    <div
      id="page-container"
      className={`page-header-dark ${isAuth ? "main-content-boxed" : ""}`}
    >
      {isInstalled && isAuth && <Header params={{ name }} />}
      {!isInstalled && <InstallPage />}
      {isInstalled && !isAuth && <LoginPage />}
      {isInstalled && isAuth && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
      {isInstalled && isAuth && <Footer params={{ name }} />}
    </div>
  );
}

export default App;
