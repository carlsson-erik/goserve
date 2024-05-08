import { gql } from "@apollo/client";
import React from "react";
import { Tile } from "./useTileQuery";
import { FetchContext } from "../App";

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  rows: number;
  cols: number;
  tiles: Tile[];
}

export interface CreateDashboardData {
  name: string;
  description?: string;
}

const useCreateDashboard = () => {
  const client = React.useContext(FetchContext);

  const createDashboard = React.useCallback(
    (createData: CreateDashboardData) => {
      return client.mutate<Dashboard>({
        mutation: gql`
            mutation {
              createDashboard(input: { name: "${createData.name}"  }) {
                id
              }
            }
          `,
      });
    },
    [client]
  );

  return createDashboard;
};

export default useCreateDashboard;
