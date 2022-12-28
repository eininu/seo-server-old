import AddWebsiteForm from "./AddWebsiteForm";
import Websites from "./Websites";
import { useEffect, useState } from "react";

const WebsitesPage = () => {
  const [websites, setWebsites] = useState([]);
  const [lostNginxConfigs, setLostNginxConfigs] = useState(false);
  const [lostUploadArchives, setLostUploadArchives] = useState(false);
  const [lostWebsitesDirectories, setLostWebsitesDirectories] = useState(false);
  const [remoteWebsites, setRemoteWebsites] = useState([]);
  const [differenceBetweenWebsites, setDifferenceBetweenWebsites] = useState();

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

    let requestRemoteWebsites = await fetch("/api/websites/remote");
    const remoteWebsitesJson = await requestRemoteWebsites.json();
    setRemoteWebsites([...remoteWebsitesJson]);
    checkDifferencesWithRemoteWebsites();
  };

  const checkDifferencesWithRemoteWebsites = () => {
    const localWebsites = websites;
    // const localWebsites = ["2", "3"];
    // const remoteWebsites = [
    //   {
    //     "xxx.com": ["1", "4", "5"],
    //   },
    //   {
    //     "ccc.com": ["6"],
    //   },
    // ];

    const differences = [];

    remoteWebsites.map((el) => {
      Object.entries(el).map(([server, websites]) => {
        // console.log(props.websites, server, websites);
        if (localWebsites.toString() === websites.toString()) {
          setDifferenceBetweenWebsites(false);
        } else {
          let difference = websites.filter((x) => !localWebsites.includes(x));
          const diffObj = {};
          diffObj[server] = difference;
          differences.push(diffObj);
        }
      });
    });

    if (differences.length > 0) {
      setDifferenceBetweenWebsites(differences);
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
        remoteWebsites={remoteWebsites}
        differenceBetweenWebsites={differenceBetweenWebsites}
      />
      <AddWebsiteForm getWebsites={getWebsites} />
    </main>
  );
};

export default WebsitesPage;
