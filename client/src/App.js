import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import IndexPage from "./components/IndexPage";
import InstallPage from "./components/InstallPage";
import LoginPage from "./components/LoginPage";
import NotFound from "./components/NotFound";
import { useEffect, useState } from "react";
import sendNotification from "./components/Notification";
import LogoutPage from "./components/LogoutPage";
import SettingsPage from "./components/SettingsPage";
import WebsitesPage from "./components/WebsitesPage";

function App() {
  const name = "JP9";

  const [isInstalled, setIsInstalled] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [message, setMessage] = useState(false);

  const checkInstalled = async () => {
    let res = await fetch("/api/setup", {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: "",
    });
    let resJson = await res.json();
    if (resJson.message === "The app is already installed!") {
      setIsInstalled(true);
    } else {
      // setMessage(["The app isn't installed", "danger"]);
    }
  };

  const checkAuth = async () => {
    let res = await fetch("/api/");
    let resJson = await res.json();
    if (resJson.message === "hi") {
      setIsAuth(true);
    }
  };

  useEffect(() => {
    message && sendNotification(message);
  }, [message]);

  useEffect(() => {
    isInstalled ? checkAuth() : checkInstalled();
  }, [isAuth, isInstalled]);

  return (
    <div
      id="page-container"
      className={`page-header-dark ${isAuth ? "main-content-boxed" : ""}`}
    >
      {isInstalled && isAuth && <Header params={{ name }} />}
      {!isInstalled && <InstallPage />}
      {isInstalled && !isAuth && <LoginPage is_auth={{ status: isAuth }} />}
      {isInstalled && isAuth && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/websites" element={<WebsitesPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
      {isInstalled && isAuth && <Footer params={{ name }} />}
    </div>
  );
}

export default App;
