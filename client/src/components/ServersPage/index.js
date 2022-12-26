import AddServerForm from "./AddServerForm";
import Servers from "./Servers";
import { useEffect, useState } from "react";

const ServersPage = () => {
  const [servers, setServers] = useState([]);

  const getServers = async () => {
    let res = await fetch("/api/servers/");

    let resJson = await res.json();
    setServers(resJson);
  };

  useEffect(() => {
    getServers();
  }, []);

  return (
    <main id="main-container">
      <Servers servers={servers} getServers={getServers} />
      <AddServerForm getServers={getServers} />
    </main>
  );
};

export default ServersPage;
