import { useMutation } from "@apollo/client";
import React from "react";
import { graphql } from "../../utils/graphql";
import { Tile } from "../dashboard/useDashboardQuery";
import { err, ok } from "neverthrow";

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
    async (id: number) => {
      const res = await deleteTileGQL({
        variables: { id },
      });

      if (res.errors) return err(res.errors.map((e) => e.message).join(","));

      return ok(res);
    },
    [deleteTileGQL]
  );

  return [deleteTile, other] as const;
};

export default useDeleteTile;
