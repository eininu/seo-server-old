import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import IndexPage from "./components/IndexPage";
import InstallPage from "./components/InstallPage";
import LoginPage from "./components/LoginPage";
import NotFound from "./components/NotFound";
import { useEffect, useState } from "react";
import sendNotification from "./components/Notification";

function App() {
  const name = "JP9";

  const [isInstalled, setIsInstalled] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [message, setMessage] = useState(false);

  const checkInstalled = async () => {
    let res = await fetch("/api", {
      method: "GET",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
    let resJson = await res.json();
    if (resJson.message === "The app is already installed!") {
      setIsInstalled(true);
    } else {
      setMessage(["The app isn't installed", "danger"]);
    }
  };

  useEffect(() => {
    message && sendNotification(message);
  }, [message]);

  useEffect(() => {
    !isInstalled && checkInstalled();
  }, [isInstalled]);

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
