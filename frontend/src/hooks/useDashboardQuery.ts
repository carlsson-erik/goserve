import { gql } from "@apollo/client";
import { Tile } from "./useTileQuery";

export interface Dashboard {
  id: string;
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
    }
  }
`;

export interface GetDashboardsResult {
  dashboards: Dashboard[];
}
