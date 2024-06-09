/* eslint-disable */
/* prettier-ignore */

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  name: never;
  query: 'Query';
  mutation: 'Mutation';
  subscription: never;
  types: {
    'Boolean': unknown;
    'Dashboard': { kind: 'OBJECT'; name: 'Dashboard'; fields: { 'cols': { name: 'cols'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'name': { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'rows': { name: 'rows'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'tiles': { name: 'tiles'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Tile'; ofType: null; }; }; }; } }; }; };
    'Int': unknown;
    'Mutation': { kind: 'OBJECT'; name: 'Mutation'; fields: { 'createDashboard': { name: 'createDashboard'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Dashboard'; ofType: null; }; } }; 'createTemplate': { name: 'createTemplate'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Template'; ofType: null; }; } }; 'createTile': { name: 'createTile'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Tile'; ofType: null; }; } }; 'deleteDashboard': { name: 'deleteDashboard'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Dashboard'; ofType: null; }; } }; 'deleteTemplate': { name: 'deleteTemplate'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Template'; ofType: null; }; } }; 'deleteTile': { name: 'deleteTile'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Tile'; ofType: null; }; } }; 'updateDashboard': { name: 'updateDashboard'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Dashboard'; ofType: null; }; } }; 'updateTemplate': { name: 'updateTemplate'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Template'; ofType: null; }; } }; 'updateTile': { name: 'updateTile'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Tile'; ofType: null; }; } }; }; };
    'NewDashboard': { kind: 'INPUT_OBJECT'; name: 'NewDashboard'; isOneOf: false; inputFields: [{ name: 'id'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; defaultValue: null }, { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'rows'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; defaultValue: null }, { name: 'cols'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; defaultValue: null }]; };
    'NewTemplate': { kind: 'INPUT_OBJECT'; name: 'NewTemplate'; isOneOf: false; inputFields: [{ name: 'id'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; defaultValue: null }, { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'data'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'width'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; defaultValue: null }, { name: 'height'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; defaultValue: null }, { name: 'variables'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'INPUT_OBJECT'; name: 'NewVariable'; ofType: null; }; }; }; }; defaultValue: null }]; };
    'NewTile': { kind: 'INPUT_OBJECT'; name: 'NewTile'; isOneOf: false; inputFields: [{ name: 'id'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; defaultValue: null }, { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'row'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; }; defaultValue: null }, { name: 'col'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; }; defaultValue: null }, { name: 'width'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; }; defaultValue: null }, { name: 'height'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; }; defaultValue: null }, { name: 'dashboardId'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; defaultValue: null }, { name: 'templateId'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; defaultValue: null }, { name: 'variables'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'INPUT_OBJECT'; name: 'NewVariable'; ofType: null; }; }; }; }; defaultValue: null }]; };
    'NewVariable': { kind: 'INPUT_OBJECT'; name: 'NewVariable'; isOneOf: false; inputFields: [{ name: 'id'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; defaultValue: null }, { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'value'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'default'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'template_id'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; defaultValue: null }, { name: 'tile_id'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; defaultValue: null }]; };
    'Query': { kind: 'OBJECT'; name: 'Query'; fields: { 'dashboards': { name: 'dashboards'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Dashboard'; ofType: null; }; }; }; } }; 'templates': { name: 'templates'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Template'; ofType: null; }; }; }; } }; }; };
    'String': unknown;
    'Template': { kind: 'OBJECT'; name: 'Template'; fields: { 'data': { name: 'data'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'height': { name: 'height'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'name': { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'variables': { name: 'variables'; type: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Variable'; ofType: null; }; }; } }; 'width': { name: 'width'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; }; };
    'Tile': { kind: 'OBJECT'; name: 'Tile'; fields: { 'col': { name: 'col'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'height': { name: 'height'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'name': { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'row': { name: 'row'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'template': { name: 'template'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Template'; ofType: null; }; } }; 'variables': { name: 'variables'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Variable'; ofType: null; }; }; }; } }; 'width': { name: 'width'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; }; };
    'Variable': { kind: 'OBJECT'; name: 'Variable'; fields: { 'default': { name: 'default'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'name': { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'value': { name: 'value'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
  };
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}