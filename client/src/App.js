import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import IndexPage from "./components/IndexPage";
import InstallPage from "./components/InstallPage";
import LoginPage from "./components/LoginPage";
import NotFound from "./components/NotFound";
import { useEffect, useState } from "react";
// import sendNotification from "./components/Notification";
import LogoutPage from "./components/LogoutPage";
import SettingsPage from "./components/SettingsPage";
import WebsitesPage from "./components/WebsitesPage";
import Loader from "./components/Loader";
import ServersPage from "./components/ServersPage";

function App() {
  const name = "JP9";

  const [appStatus, setAppStatus] = useState(undefined);

  const checkAppStatus = async () => {
    // sendNotification(`${appStatus}`);

    let res = await fetch("/api", {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: "",
    });
    let resJson = await res.json();

    if (resJson.message === "The app isn't installed!") {
      return setAppStatus("not installed");
    }

    if (
      resJson.message === "Unauthorized!" ||
      resJson.message === "No token provided!"
    ) {
      return setAppStatus("not authorized");
    }

    if (resJson.message === "hi") {
      return setAppStatus("ok");
    }
  };

  useEffect(() => {
    if (appStatus === undefined) {
      checkAppStatus();
    }
  }, []);

  if (appStatus === undefined) {
    console.log(appStatus);
    return <Loader />;
  }

  if (appStatus === "not installed") {
    return <InstallPage />;
  }

  if (appStatus === "not authorized") {
    return <LoginPage is_auth={{ status: false }} />;
  }

  if (appStatus === "ok") {
    return (
      <>
        <div
          id="page-container"
          className="page-header-dark main-content-boxed"
        >
          <Header params={{ name }} />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/websites" element={<WebsitesPage />} />
              <Route path="/servers" element={<ServersPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Footer params={{ name }} />
        </div>
      </>
    );
  }
}

export default App;
