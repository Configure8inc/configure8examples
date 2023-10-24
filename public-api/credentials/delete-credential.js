import https from "https";

function deleteCredential(id, apiKey) {
  const options = {
    hostname: "app.configure8.io",
    path: `/public/v1/credentials/${id}`,
    method: "DELETE",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      "User-Agent": "Configure8",
    },
  };

  const req = https.request(options, (res) => {
    let response = "";

    res.on("data", (d) => {
      response += d;
    });

    res.on("end", () => {
      // if there's no response, (i.e, no json parseable data), then the credential was deleted successfully
      try {
        const result = JSON.parse(response);
        if (result.error) {
          console.error("Error deleting credential: ", result.message);
        }
      } catch (e) {
        console.log("-".repeat(50));
        console.log("Successfully deleted credential ", id);
        console.log("-".repeat(50));
      }
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.end();
}

/**
 * @param {string} id - Credential ID
 * @param {string} apiKey - API Key
 */
deleteCredential("CREDENTIAL_ID", "YOUR_API_KEY");
