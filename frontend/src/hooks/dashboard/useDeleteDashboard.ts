import { useMutation } from "@apollo/client";
import React from "react";
import {
  Dashboard,
  GET_DASHBOARDS,
  GetDashboardsResult,
} from "./useDashboardQuery";
import { graphql } from "../../utils/graphql";
import { err, ok } from "neverthrow";

export interface DeleteDashboardResult {
  deleteDashboard: Dashboard;
}

const useDeleteDashboard = () => {
  const [deleteDashboardGQL, other] = useMutation<DeleteDashboardResult>(
    graphql(`
      mutation DeleteDashboard($id: Int!) {
        deleteDashboard(id: $id) {
          id
        }
      }
    `)
  );

  const deleteDashboard = React.useCallback(
    async (id: number) => {
      const res = await deleteDashboardGQL({
        variables: { id },
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

      if (res.errors) return err(res.errors.map((e) => e.message).join(","));

      return ok(res);
    },
    [deleteDashboardGQL]
  );

  return [deleteDashboard, other] as const;
};

export default useDeleteDashboard;
