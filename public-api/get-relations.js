import https from "https";
import { stringify } from "querystring";

function getRelationsExample(apiKey, sourceId, targetId) {
  const data = {
    pageSize: 20,
    pageNumber: 0,
  };

  if (sourceId) {
    data.sourceEntityId = sourceId;
  }

  if (targetId) {
    data.targetEntityId = targetId;
  }

  const options = {
    hostname: "app.configure8.io",
    path: `/public/v1/catalog/relations?${stringify(data)}`,
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
        if (Array.isArray(result.message)) {
          console.error("Error fetching relations: ", result.message.join(", "));
        } else {
          console.error("Error fetching relations: ", result.message);
        }
      } else {
        console.log("Relations fetched successfully");
        console.log("Total found: ", result.totalFound);
        console.log("Per page: ", result.pageSize);
        console.log("Page number: ", result.pageNumber);

        console.log("\nRelations: ");
        result.items.forEach((item) => {
          console.log(`\tSource ${item.sourceEntityId} -> ${item.label} -> ${item.targetEntityId}`);
        });
      }
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.end();
}

getRelationsExample("YOUR_API_KEY", "SOURCE_ENTITY_ID", "TARGET_ENTITY_ID");