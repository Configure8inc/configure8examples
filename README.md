# Configure8 API Examples

This repository contains examples of how to interact with the Configure8 public APIs. There are seven different examples, each demonstrating a different aspect of the API.

## Installation

To use these examples, you'll need Node.js installed on your machine. Once you have Node.js installed, you can clone this repository:

```bash
git clone https://github.com/Configure8inc/configure8examples.git
cd configure8examples
```

## Usage

This repository contains seven different examples. Each script has a function call at the end, where you need to replace the placeholders with your actual values.

### 1. Attach Metadata to Service

This script demonstrates how to attach metadata to a service. Replace `"SERVICE_ID"` and `"YOUR_API_KEY"` with your actual service ID and API key.

You can run this script with the following command:

```bash
npm run pa:service:metadata
```

Upon successful execution, this script will output:

```
Metadata attached successfully
Now you can create a scorecard and use the pre-defined metadata tags to add some checks to your scorecard.
For creating a scorecard, please visit: https://app.configure8.io/scorecards/create
```

### 2. Create Service

This script demonstrates how to create a new service. Replace `"YOUR_API_KEY"` with your actual API key.
It also adds simple plugin to newly created service

You can run this script with the following command:

```bash
npm run pa:service:create
```

Upon successful execution, this script will output:

```
Service created successfully
Service ID: <service_id>
Service Name: <service_name>
Your service is available at: https://app.configure8.io/services/<service_id>/overview
```

### 3. Get Scorecard

This script demonstrates how to retrieve a scorecard. Replace `"SERVICE_ID"`, `"SCORECARD_NAME"`, and `"YOUR_API_KEY"` with your actual service ID, scorecard name, and API key.

You can run this script with the following command:

```bash
npm run pa:scorecard
```

Upon successful execution, this script will output the details of the scorecards that match the provided service ID and name.

### 4. Reevaluate Scorecard

This script demonstrates how to reevaluate a scorecard. Replace `"SCORECARD_ID"` and `"YOUR_API_KEY"` with your actual scorecard ID and API key.

You can run this script with the following command:

```bash
npm run pa:scorecard:re
```

Upon successful execution, this script will output:

```
Scorecard re-evaluation started successfully
For checking the status of the scorecard, please visit: https://app.configure8.io/scorecards/<scorecard_id>/overview
Also you can wait a couple of minutes and check the scorecard status by running npm run pa:scorecard:status
```

### 5. Check Scorecard Status

This script demonstrates how to check the status of a scorecard. Replace `"SCORECARD_ID"` and `"YOUR_API_KEY"` with your actual scorecard ID and API key.

You can run this script with the following command:

```bash
npm run pa:scorecard:status
```

Upon successful execution, this script will output the status of the specified scorecard.

### 6. Get Catalog Relations

This script retrieves relations from a remote API using HTTPS. It takes three parameters: `YOUR_API_KEY`, `SOURCE_ENTITY_ID`, and `TARGET_ENTITY_ID`. You should replace these parameters with your actual API key, source entity ID, and target entity ID. Except for the API key, the other two parameters are optional. If you don't provide `SOURCE_ENTITY_ID`, the script will retrieve all relations for the specified target entity. If you don't provide `TARGET_ENTITY_ID`, the script will retrieve all relations for the specified source entity. If you don't provide either of these parameters, the script will retrieve all relations for all entities. Also you can provide the `pageSize` and `pageNumber` (starts from 0) parameters to paginate the results.

You can run this script with the following command:

```bash
npm run pa:catalog:relations
```

Upon successful execution, this script will output the relations that match the provided parameters.

### 7. Create Custom Resources

This script demonstrates how to create new custom resources on mock data of VMware VMs. Replace `"YOUR_API_KEY"` with your actual API key.

You can run this script with the following command:

```bash
npm run pa:resource:create
```

Upon successful execution, this script will output similar result:

```
4 resources created successfully
0 resources failed to be created
vm-1 resource created successfully with id 2d5d44ee-9ac9-4056-ac8a-f85ff576454a
vm-2 resource created successfully with id 95c2de3f-4a93-41c4-abd4-1bc45e35b89e
vm-3 resource created successfully with id 065f9533-85e2-45e6-a93a-7e7a6e7bffaf
vm-4 resource created successfully with id d5afb2ba-7eb0-4096-afb9-43b1e7ef0375
```

### 8. Create Deploys and Incidents with relations in DF schemas with service relation

This script demonstrates how to create deploys and incidents with a data flexibility schema and how to related them to each other and a service.

If you haven't already, install the dependencies like this:

```bash
npm install

```

First, add a `.env.local` with your api key like this:

```bash
API_KEY=<YOUR API KEY HERE>
```

Then open up [the script here](public-api/create-df-deploys-incidents-with-service-relation.js), replacing out five fields at the top with your specific cases:

```js
// these should be the identifiers for your created schema
const deploysSchema = "Deploys";
const incidentsSchema = "Incidents";

// these should be the names of the relations
// this one should be the deploy -> incident relation name
const deployIncidentField = "Incidents";
// this one should be the deploy -> service relation name
const deployServiceField = "ServiceDeploys";

// only one service relation is supported in this script, but the idea of deploys being related to services is shown
const relatedService = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
```

Now that everything is configured, you can run the script like this:

```bash
npm run pa:df:deploys-incidents-complex
```
