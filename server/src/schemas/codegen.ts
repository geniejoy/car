/**
 * help to generate typescript models from the graphql schema
 * hand pick the gened-models to the models/xxx.ts file
 * usage: ts-node codegen.ts
 * pre-requiste: npm install -g typescript; npm install -g ts-node
 */
import { importSchema } from 'graphql-import';
import { buildSchemaFromTypeDefinitions } from 'graphql-tools';

import { generateTypeScriptTypes, GenerateTypescriptOptions } from 'graphql-schema-typescript';

const typeDefs = importSchema('./schema.gql');
const schema = buildSchemaFromTypeDefinitions(typeDefs);
const options: GenerateTypescriptOptions = {
  customScalarType: { StrDateTime: 'string', JsDateTime: 'Date' },
  typePrefix: ''
};

generateTypeScriptTypes(schema, './gened-models.ts', options)
  .then(() => {
    console.log('DONE');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
