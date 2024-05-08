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

const useDashboardQuery = (dashboardId?: string) => {
  const client = React.useContext(FetchContext);
  const [data, setData] = React.useState<{
    data: Dashboard[] | undefined;
    loading: boolean;
  }>({
    data: undefined,
    loading: true,
  });

  React.useMemo(() => {
    if (dashboardId === "skip") return;
    if (dashboardId) {
      client
        .query<{ dashboards: Dashboard[] }>({
          query: gql`
            query {
              dashboards {
                id
                name
              }
            }
          `,
        })
        .then((res) => {
          setData({ data: res.data.dashboards, loading: res.loading });
        });
    } else {
      client
        .query<{ dashboards: Dashboard[] }>({
          query: gql`
            query {
              dashboards {
                id
                name
              }
            }
          `,
        })
        .then((res) => {
          setData({ data: res.data.dashboards, loading: res.loading });
        });
    }
  }, [client, dashboardId]);

  return data;
};

export default useDashboardQuery;
