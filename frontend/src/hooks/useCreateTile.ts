import { useMutation } from "@apollo/client";
import React from "react";
import { Variable } from "./useCreateTemplate";
import { Tile } from "./useDashboardQuery";
import { graphql } from "../utils/graphql";

export interface CreateTileData {
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
    (createData: CreateTileData) => {
      return createTileGQL({
        variables: { input: createData },
      });
    },
    [createTileGQL]
  );

  return [createTile, other] as const;
};

export default useCreateTile;
