import AddWebsiteForm from "./AddWebsiteForm";
import Websites from "./Websites";
import { useEffect, useState } from "react";

const WebsitesPage = () => {
  const [websites, setWebsites] = useState([]);
  const [lostNginxConfigs, setLostNginxConfigs] = useState(false);
  const [lostUploadArchives, setLostUploadArchives] = useState(false);
  const [lostWebsitesDirectories, setLostWebsitesDirectories] = useState(false);

  const getWebsites = async () => {
    let res = await fetch("/api/websites/");
    let resJson = await res.json();
    setWebsites(resJson.websitesFromDb);
    if (resJson.lostNginxConfigs.length > 0) {
      setLostNginxConfigs(resJson.lostNginxConfigs);
    }
    if (resJson.lostUploadArchives.length > 0) {
      setLostUploadArchives(resJson.lostUploadArchives);
    }
    if (resJson.lostWebsitesDirectories.length > 0) {
      setLostWebsitesDirectories(resJson.lostWebsitesDirectories);
    }
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
        lostNginxConfigs={lostNginxConfigs}
        lostUploadArchives={lostUploadArchives}
        lostWebsitesDirectories={lostWebsitesDirectories}
      />
      <AddWebsiteForm getWebsites={getWebsites} />
    </main>
  );
};

export default WebsitesPage;
