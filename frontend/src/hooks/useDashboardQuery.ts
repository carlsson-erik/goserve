import { gql } from "@apollo/client";
import { Tile } from "./useTileQuery";

export interface Dashboard {
  id: number;
  name: string;
  description: string;
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
    }
  }
`;

export interface GetDashboardsResult {
  dashboards: Dashboard[];
}
