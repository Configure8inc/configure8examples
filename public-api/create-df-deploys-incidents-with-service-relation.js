import * as readline from "readline/promises";

import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: [".env.local", ".env"] });

async function createDfDeploysIncidentsWithServiceRelations() {
  const deploysSchema = "Deploys";
  const incidentsSchema = "Incidents";

  const deployIncidentField = "Incidents";
  const deployServiceField = "ServiceDeploys";

  const relatedService = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";

  const axiosInstance = axios.create({
    baseURL: process.env.HOSTNAME,
    headers: {
      "api-key": process.env.API_KEY,
      "User-Agent": "Configure8 Examples",
    },
  });

  try {
    const deploysRequest = axiosInstance.post(
      "catalog/batch/entities/base",
      Array.from({ length: 1 }, (_, i) => ({
        name: `Deploy ${i + 1}`,
        providerResourceType: deploysSchema,
      }))
    );

    const incidentsRequest = axiosInstance.post(
      "catalog/batch/entities/base",
      Array.from({ length: 1 }, (_, i) => ({
        name: `Incident ${i}`,
        providerResourceType: incidentsSchema,
      }))
    );

    const [deploys, incidents] = await Promise.all([
      deploysRequest,
      incidentsRequest,
    ]);

    const relations = deploys.data.items.reduce((acc, deploy, i) => {
      // relate to the incident
      acc.push({
        sourceEntityId: deploy.id,
        targetEntityId: incidents.data.items[i].id,
        field: deployIncidentField,
      });

      // relate to the service
      acc.push({
        sourceEntityId: deploy.id,
        targetEntityId: relatedService,
        field: deployServiceField,
      });

      return acc;
    }, []);

    relations.forEach(async (relation) => {
      await axiosInstance.post("catalog/relations", relation);
    });

    await readline
      .createInterface({
        input: process.stdin,
        output: process.stdout,
      })
      .question("Press Enter to delete data now...");

    await axiosInstance.delete("catalog/batch/entities", {
      data: {
        ids: [
          ...deploys.data.items.map(({ id }) => id),
          ...incidents.data.items.map(({ id }) => id),
        ],
      },
    });
    process.exit();
  } catch (error) {
    console.error(error);
    await readline
      .createInterface({
        input: process.stdin,
        output: process.stdout,
      })
      .question("Press Enter to delete data now...");

    await axiosInstance.delete("catalog/batch/entities", {
      data: {
        ids: [
          ...deploys.data.items.map(({ id }) => id),
          ...incidents.data.items.map(({ id }) => id),
        ],
      },
    });

    process.exit();
  }
}

createDfDeploysIncidentsWithServiceRelations();
