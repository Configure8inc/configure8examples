import https from "https";

function createServiceExample(apiKey) {
  const data = JSON.stringify({
    name: "exampleServiceName",
    lifecycle: "",
    tags: [
      "Production",
      "Service",
      "Example"
    ],
    languages: [
      "js",
      "ts"
    ],
    owners: [],
    applications: [],
    links: [
      {
        url: "https://app.configure8.io",
        title: "Configure8",
        icon: "configure8"
      }
    ],
    metaTags: [
      {
        name: "Sample Text",
        value: "Some text",
        type: "Text"
      },
      {
        name: "Sample Json",
        value: JSON.stringify({
          "key": "value"
        }),
        type: "JSON"
      },
      {
        name: "Sample Code",
        value: "print('Hello world!')",
        type: "Code"
      },
      {
        name: "Sample Link",
        value: "https://configure8.io",
        type: "Link"
      },
      {
        name: "Sample AutoMap",
        value: "map",
        type: "AutoMap"
      },
      {
        name: "Sample Nickname",
        value: "Sample nickname",
        type: "Nickname"
      }
    ]
  });

  const options = {
    hostname: "app.configure8.io",
    path: "/public/v1/catalog/entities/service",
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      "User-Agent": "Configure8",
      "Content-Length": data.length
    }
  };

  const req = https.request(options, (res) => {
    const status = res.statusCode;
    let response = "";

    res.on("data", (d) => {
      response += d;
    });

    res.on("end", () => {
      const result = JSON.parse(response);

      if(result.error) {
        console.error("Error creating service: ", result.message.join(", "));
      } else {
        console.info("Service created successfully");
        console.info("Service ID: ", result.id);
        console.info("Service Name: ", result.name);
        console.log(`Your service is available at: https://app.configure8.io/services/${result.id}/overview`)
      }
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
}

createServiceExample("YOUR_API_KEY")