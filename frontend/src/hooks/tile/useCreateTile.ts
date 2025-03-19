import { useMutation } from "@apollo/client";
import React from "react";
import { graphql } from "../../utils/graphql";
import { Tile } from "../dashboard/useDashboardQuery";
import { Variable } from "../template/useCreateTemplate";
import { err, ok } from "neverthrow";

export interface CreateTileData {
  id?: number;
  name: string;
  dashboardId: number;
  row: number;
  col: number;
  width: number;
  height: number;
  templateId: number;
  variables: Omit<Variable, "id">[];
}

export interface CreateTileResult {
  createTile: Tile;
}

const useCreateTile = () => {
  const [createTileGQL, other] = useMutation<CreateTileResult>(
    graphql(`
      mutation createTile($input: NewTile!) {
        createTile(input: $input) {
          id
          name
          row
          col
          width
          height
          template {
            id
          }
          variables {
            id
          }
        }
      }
    `)
  );

  const createTile = React.useCallback(
    async (createData: CreateTileData) => {
      const res = await createTileGQL({
        variables: { input: createData },
      });

      if (res.errors) return err(res.errors.map((e) => e.message).join(","));

      return ok(res);
    },
    [createTileGQL]
  );

  return [createTile, other] as const;
};

export default useCreateTile;
