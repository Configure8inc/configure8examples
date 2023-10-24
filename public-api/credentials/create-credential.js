import https from "https";

function createCredential(credential, apiKey) {
  const options = {
    hostname: "app.configure8.io",
    path: `/public/v1/credentials`,
    method: "POST",
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
      console.log({ response });
      if (result.error) {
        console.error("Error getting results: ", result.message);
      } else {
        console.log("-".repeat(50));
        console.log(`Credential ID: ${result.id}`);
        console.log(`Name: ${result.name}`);
        console.log(`Provider Name: ${result.providerName}`);
        console.log(`Provider Type: ${result.providerType}`);
        console.log(`Status: ${result.status}`);
        console.log(`Created by: ${result.createdBy}`);
        console.log("-".repeat(50));
      }
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(JSON.stringify(credential));

  req.end();
}

/**
 * @param {object} credential - Credential object
 * @param {string} apiKey - API Key
 */
createCredential(
  {
    name: "datadog test public api credential create",
    providerName: "Datadog",
    providerType: "OTHER",
    configuration: [
      {
        name: "apiKey",
        value: "YOUR_DATADOG_API_KEY",
      },
      {
        name: "appKey",
        value: "YOUR_DATADOG_APP_KEY",
      },
    ],
  },
  "YOUR_API_KEY"
);
