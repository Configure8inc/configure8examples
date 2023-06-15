# Configure8 API Examples

This repository contains examples of how to interact with the Configure8 public APIs. There are five different examples, each demonstrating a different aspect of the API.

## Installation

To use these examples, you'll need Node.js installed on your machine. Once you have Node.js installed, you can clone this repository:

```bash
git clone https://github.com/Configure8inc/configure8examples.git
cd configure8examples
```

## Usage

This repository contains five different examples. Each script has a function call at the end, where you need to replace the placeholders with your actual values.

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
