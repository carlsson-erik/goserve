import { gql, useMutation } from "@apollo/client";
import React from "react";
import {
  Dashboard,
  GET_DASHBOARDS,
  GetDashboardsResult,
} from "./useDashboardQuery";
import { GET_TILES, GetTilesResult, Tile } from "./useTileQuery";

export interface DeleteTileResult {
  deleteTile: Tile;
}

const useDeleteTile = () => {
  const [deleteTileGQL, other] = useMutation<DeleteTileResult>(gql`
    mutation DeleteTile($id: Int!) {
      deleteTile(id: $id) {
        id
      }
    }
  `);

  const deleteTile = React.useCallback(
    (id: number) => {
      return deleteTileGQL({
        variables: { id },
        update: (cache, { data: addTile }) => {
          const data: GetTilesResult | null = cache.readQuery({
            query: GET_TILES,
          });

          if (data === null || !addTile) return;

          cache.writeQuery<GetTilesResult>({
            query: GET_TILES,
            data: {
              tiles: [...data.tiles.filter((d) => d.id !== id)],
            },
          });
        },
      });
    },
    [deleteTileGQL]
  );

  return [deleteTile, other] as const;
};

export default useDeleteTile;
