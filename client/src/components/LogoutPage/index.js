import { useEffect, useState } from "react";
import sendNotification from "../Notification";

const LogoutPage = () => {
  const [isLoggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    logout();
  }, [isLoggedOut]);

  const logout = async () => {
    let res = await fetch("/api/auth/logout");
    let resJson = await res.json();
    if (resJson.message === "Cookies were cleaned") {
      setLoggedOut(true);
    }
    if (isLoggedOut) {
      sendNotification(["You are logged out", "danger"]);
    }
  };

  return (
    <main id="main-container">
      <div className="content">
        <div className="block block-rounded">
          <div className="block-content text-center">
            <p>You are logged out</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LogoutPage;
