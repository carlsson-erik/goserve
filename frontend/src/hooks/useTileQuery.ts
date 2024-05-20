import { ApolloQueryResult, gql } from "@apollo/client";
import React from "react";
import { FetchContext } from "../App";

export interface Tile {
  id: string;
  name: string;
  description: string;
  dashboard_id: number;
  data: string;
  row: number;
  col: number;
  width: number;
  height: number;
}

export const GET_TILES = gql`
  query {
    tiles {
      id
      name
      dashboard {
        id
      }
      row
      col
      width
      height
      data
    }
  }
`;

export interface GetTilesResult {
  tiles: Tile[];
}

const useTileQuery = () => {
  const client = React.useContext(FetchContext);

  const [data, setData] = React.useState<ApolloQueryResult<Tile[]>>();

  client
    .query({
      query: gql`
        query {
          tiles {
            id
            name
          }
        }
      `,
    })
    .then((res) => {
      setData(res);
    });

  return data;
};

export default useTileQuery;
