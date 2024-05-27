import { gql } from "@apollo/client";
import { Tile } from "./useTileQuery";

export interface Template {
  id: number;
  name: string;
  width: number;
  height: number;
  data: string;
  variables: Variable[];
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
        description
        row
        col
        width
        height
        data
      }
    }
  }
`;

export interface GetDashboardsResult {
  dashboards: Dashboard[];
}
