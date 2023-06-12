import https from "https";

function checkScorecardStatus(scorecardId, apiKey) {
  const options = {
    hostname: "app.configure8.io",
    path: `/public/v1/scorecards/${scorecardId}/results`,
    method: "GET",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      "User-Agent": "Configure8"
    }
  };

  const req = https.request(options, (res) => {
    let response = "";

    res.on("data", (d) => {
      response += d;
    });

    res.on("end", () => {
      const results = JSON.parse(response);
      if (results.error) {
        console.error("Error getting results: ", results.message);
      } else {
        for (const result of results) {
          console.log("-".repeat(50))
          console.log(`Metric id: ${result.metricId}`);
          console.log(`Evaluated At: ${result.updatedAt}`);
          console.log(`Evaluated threshold: ${result.threshold}`);
          console.log(`Evaluated raw result: ${result.rawResult}`);
          console.log(`Evaluated passed: ${result.pass ? "Passed" : "Failed"}`);
          console.log(`Evaluated comparision type: ${result.comparisonType}`);
          console.log(`Evaluate comparision operator: ${result.comparisonOperator}`);
          console.log(`Service id: ${result.serviceId}`);
          console.log(`Scorecard ID: ${result.scorecardId}`);
          console.log("-".repeat(50))
        }
      }
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.end();
}

checkScorecardStatus("SCORECARD_ID", "YOUR_API_KEY");
