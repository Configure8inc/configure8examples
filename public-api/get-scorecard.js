import https from "https";
import { stringify } from "querystring";

function getScorecard(serviceId, name, apiKey) {
  const data = stringify({
    name,
    serviceId,
  });

  const options = {
    hostname: "app.configure8.io",
    path: `/public/v1/scorecards?${data}`,
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
      const result = JSON.parse(response);
      if (result.error) {
        console.error("Error getting results: ", result.message);
      } else {
        for (const item of result.items) {
          console.log("-".repeat(50))
          console.log(`Scorecard ID: ${item.id}`);
          console.log(`Name: ${item.name}`);
          console.log(`Status: ${item.isEvaluating ? "Evaluating" : "Evaluated"}`);
          console.log(`Evaluated At: ${item.evaluatedAt}`);
          console.log(`Evaluated Total: ${item.evaluateTotal}`);
          console.log(`Evaluated Passed: ${item.evaluatePassed}`);
          console.log(`Evaluated Failed: ${item.evaluateFailed}`);
          console.log(`Evaluated Percentage: ${item.evaluatePercentage}`);
          console.log(`Evaluate Services Percentage: ${item.evaluateServicesPercentage}`);
          console.log(`Metric ids: ${item.metrics}`);
          console.log(`Service ids: ${item.services}`);
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

/**
 * @param {string} serviceId - Filter scorecards by service id (optional)
 * @param {string} name - Filter scorecards by name (optional)
 * @param {string} apiKey - API Key
 */
getScorecard("SERVICE_ID", "SCORECARD_NAME", "YOUR_API_KEY");
