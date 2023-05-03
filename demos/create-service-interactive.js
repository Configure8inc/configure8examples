import axios from 'axios';
import { readFileSync } from 'fs';
import inquirer from 'inquirer';
import { listFilter, undefinedValueFilter } from './utils/filters.js';
import { errorParser } from './utils/parsers.js';
import { requiredFieldValidator } from './utils/validator.js';

async function createServiceExample() {
  const urls = JSON.parse(readFileSync('demos/consts/urls.json').toString())
  const { apiKey } = await inquirer.prompt([
    {
      type: 'password',
      name: 'apiKey',
      message: 'Please provide a valid Configure8 api key',
      validate: requiredFieldValidator,
    }
  ]);

  const { data: templates } = await axios(`${urls.baseUrl}/templates`, {
    headers: {
      'api-key': apiKey,
    }
  }).catch(errorParser);

  const metaTags = [];
  const links = [];

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Please provide a service name',
      validate: requiredFieldValidator,
    },
    {
      type: 'input',
      name: 'repositoryId',
      message: 'Please provide a repository id',
      filter: undefinedValueFilter,
    },
    {
      type: 'input',
      name: 'repositoryPath',
      message: 'Please provide a repository path',
      filter: undefinedValueFilter,
    },
    {
      type: 'input',
      name: 'lifecycle',
      message: 'Please provide a lifecycle',
      filter: undefinedValueFilter,
    },
    {
      type: 'input',
      name: 'tags',
      message: 'Please provide list of tags, separated by comma',
      filter: listFilter,
    },
    {
      type: 'input',
      name: 'languages',
      message: 'Please provide list of languages, separated by comma',
      filter: listFilter,
    },
    {
      type: 'input',
      name: 'owners',
      message: 'Please provide list of service owner ids, separated by comma',
      filter: listFilter,
    },
    {
      type: 'input',
      name: 'applications',
      message: 'Please provide list of service application ids, separated by comma',
      filter: listFilter,
    },
    {
      type: 'input',
      name: 'links',
      message: 'Please provider service links in this format URL,TITLE,ICON',
      validate: (answer) => {
        if (answer.length === 3) {
          const [url, title, icon] = answer;
          links.push({ url, title, icon });
        }

        return answer === 'stop';
      },
      filter: stoppableListFilter,
    },
    {
      type: 'input',
      name: 'metatags',
      message: 'Please provider service metatags in this format NAME,VALUE,TYPE(JSON, Code, Link, Text, AutoMap, Nickname)',
      validate: (answer) => {
        if (answer.length === 3) {
          const [name, value, type] = answer;
          if (['JSON', 'Code', 'Link', 'Text', 'AutoMap', 'Nickname'].includes(type)) {
            metaTags.push({ name, value, type });
          } else {
            console.error(`Invalid format porvided, valid values are: (JSON, Code, Link, Text, AutoMap, Nickname)`)
          }
        }

        return answer === 'stop';
      },
      filter: stoppableListFilter,
    },
    {
      type: 'list',
      name: 'templateId',
      choices: ['NO TEMPLATE', ...templates.map(t => `${t.name} ${t.id}`)],
      filter: (answer) => {
        return answer === 'NO TEMPLATE' ? undefined : answer.split(' ')[answer.split(' ').length - 1];
      }
    }
  ]);

  const { data: service } = await axios({
    method: 'POST',
    url: `${urls.baseUrl}/catalog/entities/service`,
    headers: {
      'api-key': apiKey,
    },
    data: {
      name: answers.name,
      tags: answers.tags,
      links,
      metaTags,
      repositoryId: answers.repositoryId,
      lifecycle: answers.lifecycle,
      owners: answers.owners,
      applications: answers.applications,
      templateId: answers.templateId,
      repositoryPath: answers.repositoryPath,
      languages: answers.languages,
    }
  }).catch(errorParser);

  console.log(`Service ${answers.name} successfully created with id: ${service.id}`)
  process.exit(0);
}

createServiceExample();