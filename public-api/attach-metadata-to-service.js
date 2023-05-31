import https from "https";

function attachMetadataToService(serviceId, apiKey) {
  const data = JSON.stringify({
    metaTags: [
      { name: "test234", type: "Text", value: 2 },
      {
        name: "Sample Json",
        value: JSON.stringify({
          testCoverage: 100
        }),
        type: "JSON"
      },
    ]
  });

  const options = {
    hostname: "app.configure8.io",
    path: `/public/v1/catalog/metadata/${serviceId}`,
    method: "PUT",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      "User-Agent": "Configure8",
      "Content-Length": data.length
    }
  };

  const req = https.request(options, (res) => {
    let response = "";

    res.on("data", (d) => {
      response += d;
    });

    res.on("end", () => {
      const result = JSON.parse(response);
      if (result.error) {
        console.error("Error creating service: ", result.message);
      } else {
        console.log(`Metadata attached successfully`);
        console.log(`Now you can create a scorecard and use the pre-defined metadata tags to add some checks to your scorecard.`);
        console.log(`For creating a scorecard, please visit: https://app.configure8.io/scorecards/create`)
      }
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
}

attachMetadataToService("SERVICE_ID", "API_KEY");