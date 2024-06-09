import { graphql } from "../utils/graphql";
import { Variable } from "./useCreateTemplate";
import { Template } from "./useTemplateQuery";

export interface Dashboard {
  id: number;
  name: string;
  rows: number;
  cols: number;
  tiles: Tile[];
}

export interface Tile {
  id: number;
  name: string;
  row: number;
  col: number;
  width: number;
  height: number;
  template: Template;
  variables?: Variable[];
}

export const GET_DASHBOARDS = graphql(`
  query Dashboards {
    dashboards {
      id
      name
      rows
      cols
      tiles {
        id
        name
        row
        col
        width
        height
        template {
          id
          name
          data
          width
          height
        }
        variables {
          id
          name
          value
          default
        }
      }
    }
  }
`);

export interface GetDashboardsResult {
  dashboards: Dashboard[];
}
