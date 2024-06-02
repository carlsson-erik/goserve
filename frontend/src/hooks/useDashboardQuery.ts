import { gql } from "@apollo/client";
import { Tile } from "./useTileQuery";

export interface Dashboard {
  id: number;
  name: string;
  rows: number;
  cols: number;
  tiles: Tile[];
}

export const GET_DASHBOARDS = gql`
  query {
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
`;

export interface GetDashboardsResult {
  dashboards: Dashboard[];
}
