import https from "https";

function reevaluateScorecard(scorecardId, apiKey) {
  const options = {
    hostname: "app.configure8.io",
    path: `/public/v1/scorecards/${scorecardId}/run`,
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      "User-Agent": "Configure8",
      "Content-Length": 0
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
        console.error("Error reevaluating scorecard: ", result.message);
      } else {
        console.log(`Scorecard re-evaluation started successfully`);
        console.log(`For checking the status of the scorecard, please visit: https://app.configure8.io/scorecards/${scorecardId}/overview`);
        console.log(`Also you can wait a couple of minutes and check the scorecard status by running npm run pa:scorecard:status`)
      }
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.end();
}

reevaluateScorecard("SCORECARD_ID", "YOUR_API_KEY");
