getServerIp = async () => {
  let res = await fetch("https://myipv4.p1.opendns.com/get_my_ip");
  const resJson = await res.json();
  return `${resJson.ip}`;
};

module.exports = { getServerIp };
