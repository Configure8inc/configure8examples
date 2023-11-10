import https from "https";

function createDeploymentExample(apiKey) {
  const data = JSON.stringify({
        "name": "[XXX-1234]: Create a new deployment",
        "description": "Added a new GA flow",
        "repositoryId": "8c2ce201-daff-4ba6-a067-ee95e37a9e6a",
        "environment": "QA",
        "status": "SUCCESS",
        "sha": "e2d2632d3ae5b9e3d1ae332c03f4566e858b3a65",
        "ref": "main",
        "version": "1.31.0",
        "login": "username",
        "url": "https://circleci.com/deployment/pipelines/12",
        "ownerEmail": "user@yourcompanydomain.io",
        "startedAt": "2023-11-10T03:11:11.813Z",
        "finishedAt": "2023-11-10T03:12:12.813Z"
      });

  const options = {
    hostname: "app.configure8.io",
    path: "/public/v1/deployments",
    method: "POST",
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
        console.error("Error creating deployment: ", result.message.join(", "));
      } else {
        console.info("Deployment created successfully");
        console.info("Deployment ID: ", result.id);
        console.info("Deployment Name: ", result.name);
      }
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
}

createDeploymentExample("YOUR_API_KEY")