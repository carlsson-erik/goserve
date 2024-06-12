import { useMutation } from "@apollo/client";
import React from "react";
import {
  Dashboard,
  GET_DASHBOARDS,
  GetDashboardsResult,
} from "./useDashboardQuery";
import { graphql } from "../../utils/graphql";
import { CreateDashboardData } from "./useCreateDashboard";
import { err, ok } from "neverthrow";

export interface UpdateDashboardResult {
  updateDashboard: Dashboard;
}

const useUpdateDashboard = () => {
  const [updateDashboardGQL, other] = useMutation<UpdateDashboardResult>(
    graphql(`
      mutation UpdateDashboard($name: String!) {
        updateDashboard(input: { name: $name }) {
          id
          name
        }
      }
    `)
  );

  const updateDashboard = React.useCallback(
    async (updateData: CreateDashboardData) => {
      const res = await updateDashboardGQL({
        variables: { name: updateData.name },
        update: (cache, { data: updatedDashboard }) => {
          if (!updatedDashboard) return;

          const data: GetDashboardsResult | null = cache.readQuery({
            query: GET_DASHBOARDS,
          });

          if (data === null || !updatedDashboard) return;

          cache.writeQuery<GetDashboardsResult>({
            query: GET_DASHBOARDS,
            data: {
              dashboards: [
                ...data.dashboards,
                updatedDashboard.updateDashboard,
              ],
            },
          });
        },
      });

      if (res.errors) return err(res.errors.map((e) => e.message).join(","));

      return ok(res);
    },
    [updateDashboardGQL]
  );

  return [updateDashboard, other] as const;
};

export default useUpdateDashboard;
