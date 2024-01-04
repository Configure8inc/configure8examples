import readline from "readline";
import https from "https";

function deleteServicesExample(apiKey) {
  const options = {
    hostname: "app.configure8.io",
    path: "/public/v1/catalog/entities",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      "User-Agent": "Configure8",
    },
  };

  const getBody = JSON.stringify({ types: ["service"] });

  const getReq = https.request(
    {
      ...options,
      headers: { ...options.headers, "Content-Length": getBody.length },
      method: "POST",
    },
    (res) => {
      let response = "";

      res.on("data", (d) => {
        response += d;
      });

      res.on("end", () => {
        const services = JSON.parse(response).items;

        services.forEach((service) => {
          const deleteReq = https.request(
            {
              ...options,
              method: "DELETE",
              path: `${options.path}/${service.id}`,
            },
            (res) => {
              let response = "";

              res.on("data", (d) => {
                response += d;
              });

              res.on("end", () => {
                if (res.statusCode === 200) {
                  console.log(`Deleted service ${service.id}`);
                } else {
                  console.log(
                    `Failed to delete service ${service.id}: ${response}`
                  );
                }
              });
            }
          );

          deleteReq.on("error", (error) => {
            console.error(error);
          });

          deleteReq.end();
        });
      });
    }
  );

  getReq.on("error", (error) => {
    console.error(error);
  });

  getReq.write(getBody);

  getReq.end();
}

function confirmDeleteServicesExample(apiKey) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "Are you sure you want to delete all services?\n ⚠️ THIS CHANGE IS IRREVERSIBLE!⚠️ (y/n) ",
    (answer) => {
      if (answer === "y") {
        deleteServicesExample(apiKey);
      } else {
        console.log("Aborted");
      }

      rl.close();
    }
  );
}

confirmDeleteServicesExample("YOUR_API_KEY");
