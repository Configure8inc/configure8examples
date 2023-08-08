import https from "https";

function createCustomResourceExample(apiKey) {
  // The hostname or IP address of your VMware vCenter Server.
  // A value for resources' provider account id
  const vcenterHost = 'your_vcenter_host';

  // Example of list of VMware VM instances.
  // The retrieving of this data depends on the language and implementation you've chosen.
  // It is important to retrieve MoRefId for instances, since they will be unique key for resources in the catalog.
  const vmResources = [
    {
      moid: "vm-1",
      name: "VM1",
      power_state: "poweredOn",
      cpu_cores: 2,
      memory_gb: 8,
      guest_fullname: "Microsoft Windows Server 2019 (64-bit)"
    },
    {
      moid: "vm-2",
      name: "VM2",
      power_state: "poweredOff",
      cpu_cores: 4,
      memory_gb: 16,
      guest_fullname: "Ubuntu Linux (64-bit)"
    },
    {
      moid: "vm-3",
      name: "VM3",
      power_state: "poweredOn",
      cpu_cores: 1,
      memory_gb: 4,
      guest_fullname: "CentOS Linux (64-bit)"
    },
    {
      moid: "vm-4",
      name: "VM4",
      power_state: "poweredOff",
      cpu_cores: 2,
      memory_gb: 8,
      guest_fullname: "Microsoft Windows 10 (64-bit)"
    }
  ];

  const resources = vmResources.map(({ name, moid, ...vm }) => {
    return {
      name: name,
      providerResourceKey: moid,
      provider: 'VMware',
      providerResourceType: 'VMware:VM',
      providerAccountId: vcenterHost,
      details: vm,
      // parents and metaTags information can be also provided if needed
    };
  });

  const data = JSON.stringify(resources);

  const options = {
    hostname: "app.configure8.io",
    // Using batch api to create resources
    path: "/public/v1/catalog/batch/entities/resource",
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
        console.error(`Error creating resources: ${result.message}`);
      } else {
        console.info(`${result.success} resources created successfully`);
        console.info(`${result.failures} resources failed to be created`);

        for (const createResource of result.items) {
          console.info(`${createResource.providerResourceKey} resource created successfully with id ${createResource.id}`);
        }

        for (const failedResources of result.failed) {
          console.error(`Error creating resource ${failedResources.providerResourceKey}: ${failedResources.error}`);
        }
      }
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
}

createCustomResourceExample("YOUR_API_KEY")