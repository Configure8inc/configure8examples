import { randomUUID } from "crypto";
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
    applications: [],
    links: [
      {
        url: "https://app.configure8.io",
        title: "Configure8",
        icon: "documentation"
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

    let response = "";

    res.on("data", (d) => {
      response += d;
    });

    res.on("end", () => {
      const result = JSON.parse(response);

      if (result.error) {
        console.error("Error creating service: ", result.message.join(", "));
      } else {
        console.info("Service created successfully");
        console.info("Service ID: ", result.id);
        console.info("Service Name: ", result.name);
        // adding simple plugin - embedded view
        const serviceId = result.id;

        const pluginData = JSON.stringify({
          credentialId: randomUUID(),
          configuration: [
            {
              name: 'url',
              value: ['https://docs.configure8.io/configure8-product-docs/reference/api-documentation'],
            },
          ],
          layout: { h: 0, w: 0, x: 0, y: 0 },
          providerName: 'EmbeddedView',
          providerType: 'OTHER',
          serviceId: serviceId, 
          status: 'ACTIVE',
          title: 'EmbeddedViewExample',
          uiPluginName: 'embedded_view',
        });

        const plugin = {
          hostname: "app.configure8.io",
          path: "/public/v1/module-settings",
          method: "POST",
          headers: {
            "api-key": apiKey,
            "Content-Type": "application/json",
            "User-Agent": "Configure8",
            "Content-Length": pluginData.length
          }
        };

        const pluginRequest = https.request(plugin, (res) => {
          let response = ""; 

          res.on("data", (d) => {
            response += d;
          });

          res.on("end", () => {
            const result = JSON.parse(response);

            if (result.error) {
              console.error("Error creating service plugin: ", result.message.join(", "));
            } else {
              console.info("Service plugin created successfully");
              console.info("Service plugin ID: ", result.id);
              console.info("Service plugin Name: ", result.providerName);
            }
          });
        });

        pluginRequest.on("error", (error) => {
          console.error(error);
        });

        pluginRequest.write(pluginData);
        pluginRequest.end();
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