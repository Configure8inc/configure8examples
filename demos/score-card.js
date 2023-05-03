import https from "https";

function scoreCardExample(serviceId, apiKey) {
  const data = JSON.stringify({
    metaTags: [
      { name: "test234", type: "Text", value: 2 },
      {
        name: "Sample Json",
        value: {
          testCoverage: 100
        },
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
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
      "Content-Length": data.length
    }
  };

  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
}

scoreCardExample("SERVICE_ID", "API_KEY")