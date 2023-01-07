const express = require("express");
const router = express.Router();
const { JSDOM } = require("jsdom");

// const demoData = {
//   awesomeDomains: [
//     "za.je",
//     "thewire.co",
//     "manager.red",
//     "source.sc",
//     "bbs.sh",
//     "grow.co",
//     "mvs.ac",
//     "pcdi.ly",
//     "f0.gg",
//     "skyexpress.us",
//     "61.vc",
//     "twp.io",
//     "tinypic.info",
//     "occident.us",
//     "benfordslaw.io",
//     "60s.red",
//     "nine.mn",
//     "3x3.us",
//     "calculator.pro",
//     "text.lc",
//     "ara.bz",
//     "youare.info",
//     "2013.pro",
//     "collage.info",
//     "ybf.me",
//     "1a.ag",
//     "chesapeake.co",
//   ],
//   domainsJson: {
//     page: 1,
//     current: 10,
//     count: 1000,
//     prevPage: false,
//     nextPage: true,
//     pageCount: 100,
//     limit: 10,
//     success: true,
//     domains: [
//       {
//         id: "28714082",
//         name: "hi5.info",
//         date_available: "2023-01-07",
//         date_registered: "2018-10-20",
//         tld: "info",
//       },
//       {
//         id: "23567244",
//         name: "consolidatedebt.co",
//         date_available: "2023-01-07",
//         date_registered: "2021-10-25",
//         tld: "co",
//       },
//       {
//         id: "15966491",
//         name: "watchmovieonline.co",
//         date_available: "2023-01-07",
//         date_registered: "2021-10-25",
//         tld: "co",
//       },
//       {
//         id: "612952",
//         name: "iphone.vc",
//         date_available: "2023-01-07",
//         date_registered: "2020-12-02",
//         tld: "vc",
//       },
//       {
//         id: "15682468",
//         name: "jasonthompson.co",
//         date_available: "2023-01-07",
//         date_registered: "2020-10-28",
//         tld: "co",
//       },
//       {
//         id: "28970522",
//         name: "infowars.cc",
//         date_available: "2023-01-07",
//         date_registered: "2018-10-20",
//         tld: "cc",
//       },
//       {
//         id: "16514871",
//         name: "stickgames.co",
//         date_available: "2023-01-07",
//         date_registered: "2020-10-27",
//         tld: "co",
//       },
//       {
//         id: "22476031",
//         name: "gameone.me",
//         date_available: "2023-01-07",
//         date_registered: "2021-10-21",
//         tld: "me",
//       },
//       {
//         id: "28767795",
//         name: "delmarvapower.co",
//         date_available: "2023-01-07",
//         date_registered: "2020-10-27",
//         tld: "co",
//       },
//       {
//         id: "24085565",
//         name: "chaolong1.tv",
//         date_available: "2023-01-07",
//         date_registered: "2021-10-19",
//         tld: "tv",
//       },
//     ],
//   },
//   auctionsJson: {
//     page: 1,
//     current: 27,
//     count: 27,
//     prevPage: false,
//     nextPage: false,
//     pageCount: 1,
//     limit: 200,
//     success: true,
//     auctions: [
//       {
//         id: "10859",
//         name: "35.ag",
//         num_bids: "2",
//         price: "99",
//         close_date: "2023-07-01UTC12:41:016",
//         created: "2022-27-12UTC20:55:02360",
//       },
//       {
//         id: "10857",
//         name: "airbru.sh",
//         num_bids: "4",
//         price: "150",
//         close_date: "2023-08-01UTC12:41:017",
//         created: "2022-26-12UTC9:45:03359",
//       },
//       {
//         id: "10853",
//         name: "dog.mn",
//         num_bids: "2",
//         price: "99",
//         close_date: "2023-08-01UTC12:41:017",
//         created: "2022-23-12UTC20:55:22356",
//       },
//       {
//         id: "10850",
//         name: "adpay.io",
//         num_bids: "3",
//         price: "104",
//         close_date: "2023-09-01UTC12:41:018",
//         created: "2022-22-12UTC20:55:12355",
//       },
//       {
//         id: "10856",
//         name: "whatismyip.io",
//         num_bids: "12",
//         price: "1000",
//         close_date: "2023-10-01UTC12:41:019",
//         created: "2022-26-12UTC9:45:02359",
//       },
//       {
//         id: "10858",
//         name: "veneer.co",
//         num_bids: "5",
//         price: "116",
//         close_date: "2023-10-01UTC12:41:019",
//         created: "2022-26-12UTC20:55:03359",
//       },
//       {
//         id: "10867",
//         name: "viewing.co",
//         num_bids: "2",
//         price: "99",
//         close_date: "2023-10-01UTC12:41:019",
//         created: "2022-31-12UTC20:55:12364",
//       },
//       {
//         id: "10866",
//         name: "haptix.io",
//         num_bids: "2",
//         price: "99",
//         close_date: "2023-10-01UTC12:41:019",
//         created: "2022-31-12UTC20:55:04364",
//       },
//       {
//         id: "10865",
//         name: "blur.ly",
//         num_bids: "2",
//         price: "99",
//         close_date: "2023-10-01UTC12:41:019",
//         created: "2022-31-12UTC20:55:02364",
//       },
//       {
//         id: "10861",
//         name: "tech.sc",
//         num_bids: "2",
//         price: "99",
//         close_date: "2023-11-01UTC12:41:0110",
//         created: "2022-28-12UTC20:55:29361",
//       },
//       {
//         id: "10873",
//         name: "delta.vc",
//         num_bids: "11",
//         price: "811",
//         close_date: "2023-12-01UTC12:41:0111",
//         created: "2023-02-01UTC20:55:061",
//       },
//       {
//         id: "10860",
//         name: "control.gg",
//         num_bids: "4",
//         price: "155",
//         close_date: "2023-12-01UTC12:41:0111",
//         created: "2022-28-12UTC9:45:13361",
//       },
//       {
//         id: "10868",
//         name: "islamicbank.io",
//         num_bids: "3",
//         price: "104",
//         close_date: "2023-12-01UTC12:41:0111",
//         created: "2023-02-01UTC20:55:021",
//       },
//       {
//         id: "10872",
//         name: "lo.lc",
//         num_bids: "3",
//         price: "104",
//         close_date: "2023-12-01UTC12:41:0111",
//         created: "2023-02-01UTC20:55:041",
//       },
//       {
//         id: "10869",
//         name: "lil.ag",
//         num_bids: "2",
//         price: "99",
//         close_date: "2023-12-01UTC12:41:0111",
//         created: "2023-02-01UTC20:55:021",
//       },
//       {
//         id: "10870",
//         name: "aptian.io",
//         num_bids: "2",
//         price: "99",
//         close_date: "2023-12-01UTC12:41:0111",
//         created: "2023-02-01UTC20:55:031",
//       },
//       {
//         id: "10862",
//         name: "map.ac",
//         num_bids: "2",
//         price: "99",
//         close_date: "2023-12-01UTC12:41:0111",
//         created: "2022-30-12UTC9:45:02363",
//       },
//       {
//         id: "10871",
//         name: "video.mn",
//         num_bids: "2",
//         price: "99",
//         close_date: "2023-12-01UTC12:41:0111",
//         created: "2023-02-01UTC20:55:031",
//       },
//       {
//         id: "10863",
//         name: "betonweather.io",
//         num_bids: "2",
//         price: "99",
//         close_date: "2023-13-01UTC12:41:0112",
//         created: "2022-30-12UTC9:45:04363",
//       },
//       {
//         id: "10874",
//         name: "cryptogodz.io",
//         num_bids: "2",
//         price: "99",
//         close_date: "2023-13-01UTC12:41:0112",
//         created: "2023-03-01UTC20:55:022",
//       },
//       {
//         id: "10875",
//         name: "somatic.co",
//         num_bids: "2",
//         price: "99",
//         close_date: "2023-14-01UTC12:41:0113",
//         created: "2023-04-01UTC20:55:013",
//       },
//       {
//         id: "10848",
//         name: "cricket.bz",
//         num_bids: "2",
//         price: "99",
//         close_date: "2023-14-01UTC12:41:0113",
//         created: "2022-22-12UTC20:55:02355",
//       },
//       {
//         id: "10854",
//         name: "topit.me",
//         num_bids: "2",
//         price: "99",
//         close_date: "2023-15-01UTC12:41:0114",
//         created: "2022-24-12UTC9:45:03357",
//       },
//       {
//         id: "10844",
//         name: "pencil.ly",
//         num_bids: "2",
//         price: "99",
//         close_date: "2023-15-01UTC12:41:0114",
//         created: "2022-21-12UTC20:55:18354",
//       },
//       {
//         id: "10855",
//         name: "motivate.ly",
//         num_bids: "3",
//         price: "104",
//         close_date: "2023-16-01UTC12:41:0115",
//         created: "2022-24-12UTC9:45:07357",
//       },
//       {
//         id: "10864",
//         name: "spout.co",
//         num_bids: "6",
//         price: "140",
//         close_date: "2023-17-01UTC12:41:0116",
//         created: "2022-30-12UTC20:55:11363",
//       },
//       {
//         id: "10843",
//         name: "chf.to",
//         num_bids: "3",
//         price: "104",
//         close_date: "2023-17-01UTC12:41:0116",
//         created: "2022-21-12UTC20:55:18354",
//       },
//     ],
//   },
// };

// let { awesomeDomains, domainsJson, auctionsJson } = demoData;

let awesomeDomains;
let domainsJson;
let auctionsJson;

router.get("/", async (req, res) => {
  res.send({ awesomeDomains, domainsJson, auctionsJson });
});

router.get("/awesome_domains", async (req, res) => {
  const indexPage = await fetch("https://park.io/");
  const { document } = new JSDOM(await indexPage.text()).window;
  const awesomeDomainsNode = document.getElementsByClassName(
    "col-sm-12 park-module domain-list"
  )[0];
  const awesomeDomainsNodeElements = Array.from(
    awesomeDomainsNode.getElementsByTagName("li")
  );

  let tempAwesomeDomains = [];

  awesomeDomainsNodeElements.map((el) => {
    tempAwesomeDomains = [...tempAwesomeDomains, el.textContent];
  });

  awesomeDomains = tempAwesomeDomains;

  res.send({ awesome_domains: awesomeDomains });
});

router.get("/auctions", async (req, res) => {
  const auctionsFetch = await fetch("https://park.io/auctions.json");
  auctionsJson = await auctionsFetch.json();
  res.send(auctionsJson);
});

router.get("/domains", async (req, res) => {
  const domainsFetch = await fetch(
    "https://park.io/domains/index/all.json?limit=10"
  );
  domainsJson = await domainsFetch.json();
  res.send(domainsJson);
});

module.exports = router;
