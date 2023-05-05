import https from "https";

function checkScorecardResults(serviceId, apiKey) {
  const options = {
    hostname: "app.configure8.io",
    path: `/public/v1/scorecards/${serviceId}/results`,
    method: "GET",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
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

  req.end();
}

checkScorecardResults("SCORECARD_ID", "API_KEY");