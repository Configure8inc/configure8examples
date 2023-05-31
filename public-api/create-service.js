import https from "https";

function createServiceExample(apiKey) {
  const data = JSON.stringify({
    name: "exampleServiceName6",
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
    hostname: "qa.configure8.io",
    path: "/public/v1/catalog/entities/service",
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
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
        console.log(`Your service is available at: https://qa.configure8.io/services/${result.id}/overview`)
      }
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
}

createServiceExample("c8ak_6efb3071a5a64217872415497db92649_5e69ce7")