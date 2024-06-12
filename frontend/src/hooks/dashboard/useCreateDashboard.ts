import { useMutation } from "@apollo/client";
import React from "react";
import {
  Dashboard,
  GET_DASHBOARDS,
  GetDashboardsResult,
} from "./useDashboardQuery";
import { graphql } from "../../utils/graphql";
import { err, ok } from "neverthrow";

export interface CreateDashboardData {
  name: string;
  description?: string;
}

export interface CreateDashboardResult {
  createDashboard: Dashboard;
}

const useCreateDashboard = () => {
  const [createDashboardGQL, other] = useMutation<CreateDashboardResult>(
    graphql(`
      mutation CreateDashboard($name: String!) {
        createDashboard(input: { name: $name }) {
          id
          name
        }
      }
    `)
  );

  const createDashboard = React.useCallback(
    async (createData: CreateDashboardData) => {
      const res = await createDashboardGQL({
        variables: { name: createData.name },
        update: (cache, { data: addDashboard }) => {
          if (!addDashboard) return;

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

      if (res.errors) return err(res.errors.map((e) => e.message).join(","));

      return ok(res);
    },
    [createDashboardGQL]
  );

  return [createDashboard, other] as const;
};

export default useCreateDashboard;
