import https from "https";
import { stringify } from "querystring";

function getCredentials(apiKey) {
  const data = stringify({
    // filter credentials example
    // searchTerms: "some search terms",
    // providerType: "providerType"
    // providerName: "providerName"
  });

  const options = {
    hostname: "app.configure8.io",
    path: `/public/v1/credentials?${data}`,
    method: "GET",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      "User-Agent": "Configure8",
    },
  };

  const req = https.request(options, (res) => {
    let response = "";

    res.on("data", (d) => {
      response += d;
    });

    res.on("end", () => {
      const result = JSON.parse(response);
      if (result.error) {
        console.error("Error getting results: ", result.message);
      } else {
        for (const item of result.items) {
          console.log("-".repeat(50));
          console.log(`Credential ID: ${item.id}`);
          console.log(`Name: ${item.name}`);
          console.log(`Provider Name: ${item.providerName}`);
          console.log(`Provider Type: ${item.providerType}`);
          console.log(`Status: ${item.status}`);
          console.log(`Created by: ${item.createdBy}`);
          console.log("-".repeat(50));
        }
      }
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.end();
}

/**
 * @param {string} apiKey - API Key
 */
getCredentials("YOUR_API_KEY");
