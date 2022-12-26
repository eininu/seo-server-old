import AddWebsiteForm from "./AddWebsiteForm";
import Websites from "./Websites";
import { useEffect, useState } from "react";

const WebsitesPage = () => {
  const [websites, setWebsites] = useState([]);

  const getWebsites = async () => {
    let res = await fetch("/api/websites/");
    let resJson = await res.json();
    setWebsites(resJson);
  };

  useEffect(() => {
    getWebsites();
  }, []);

  return (
    <main id="main-container">
      <Websites
        websites={websites}
        setSetting={setWebsites}
        getWebsites={getWebsites}
      />
      <AddWebsiteForm getWebsites={getWebsites} />
    </main>
  );
};

export default WebsitesPage;
