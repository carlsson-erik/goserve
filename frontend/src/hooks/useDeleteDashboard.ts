import { FetchResult, MutationResult, gql, useMutation } from "@apollo/client";
import React from "react";
import {
  Dashboard,
  GET_DASHBOARDS,
  GetDashboardsResult,
} from "./useDashboardQuery";

export interface DeleteDashboardResult {
  deleteDashboard: Dashboard;
}

const useDeleteDashboard = (): [
  (id: number) => Promise<FetchResult<DeleteDashboardResult>>,
  MutationResult<DeleteDashboardResult>
] => {
  const [deleteDashboardGQL, other] = useMutation<DeleteDashboardResult>(gql`
    mutation DeleteDashboard($id: Int!) {
      deleteDashboard(id: $id) {
        id
      }
    }
  `);

  const deleteDashboard = React.useCallback(
    (id: number) => {
      return deleteDashboardGQL({
        variables: { id: id },
        update: (cache, { data: addDashboard }) => {
          const data: GetDashboardsResult | null = cache.readQuery({
            query: GET_DASHBOARDS,
          });

          if (data === null || !addDashboard) return;

          cache.writeQuery<GetDashboardsResult>({
            query: GET_DASHBOARDS,
            data: {
              dashboards: [...data.dashboards.filter((d) => d.id !== id)],
            },
          });
        },
      });
    },
    [deleteDashboardGQL]
  );

  return [deleteDashboard, other];
};

export default useDeleteDashboard;
