import { useMutation } from "@apollo/client";
import React from "react";
import { graphql } from "../utils/graphql";
import { Tile } from "./useDashboardQuery";

export interface DeleteTileResult {
  deleteTile: Tile;
}

const useDeleteTile = () => {
  const [deleteTileGQL, other] = useMutation<DeleteTileResult>(
    graphql(`
      mutation DeleteTile($id: Int!) {
        deleteTile(id: $id) {
          id
        }
      }
    `)
  );

  const deleteTile = React.useCallback(
    (id: number) => {
      return deleteTileGQL({
        variables: { id },
      });
    },
    [deleteTileGQL]
  );

  return [deleteTile, other] as const;
};

export default useDeleteTile;
