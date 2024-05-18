import { FetchResult, MutationResult, gql, useMutation } from "@apollo/client";
import React from "react";
import {
  Dashboard,
  GET_DASHBOARDS,
  GetDashboardsResult,
} from "./useDashboardQuery";

export interface CreateDashboardData {
  name: string;
  description?: string;
}

export interface CreateDashboardResult {
  createDashboard: Dashboard;
}

const useCreateDashboard = (): [
  (
    createData: CreateDashboardData
  ) => Promise<FetchResult<CreateDashboardResult>>,
  MutationResult<{ createDashboard: Dashboard }>
] => {
  const [createDashboardGQL, other] = useMutation<CreateDashboardResult>(gql`
    mutation CreateDashboard($name: String!) {
      createDashboard(input: { name: $name }) {
        id
        name
      }
    }
  `);

  const createDashboard = React.useCallback(
    (createData: CreateDashboardData) => {
      return createDashboardGQL({
        variables: { name: createData.name },
        update: (cache, { data: addDashboard }) => {

          console.log(addDashboard)
          if (!addDashboard) return

          console.log(addDashboard)

          const data: GetDashboardsResult | null = cache.readQuery({
            query: GET_DASHBOARDS,
          });

          if (data === null || !addDashboard) return;

          cache.writeQuery<GetDashboardsResult>({
            query: GET_DASHBOARDS,
            data: {
              dashboards: [...data.dashboards, addDashboard.createDashboard],
            },
          });
        },
      });
    },
    [createDashboardGQL]
  );

  return [createDashboard, other];
};

export default useCreateDashboard;
