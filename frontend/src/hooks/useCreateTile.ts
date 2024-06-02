import { FetchResult, MutationResult, gql, useMutation } from "@apollo/client";
import React from "react";
import { GET_TILES, GetTilesResult, Tile } from "./useTileQuery";
import { Variable } from "./useCreateTemplate";

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

const useCreateTile = (): [
  (createData: CreateTileData) => Promise<FetchResult<CreateTileResult>>,
  MutationResult<{ createTile: Tile }>
] => {
  const [createTileGQL, other] = useMutation<CreateTileResult>(gql`
    mutation createTile($input: NewTile!) {
      createTile(input: $input) {
        id
        name
      }
    }
  `);

  const createTile = React.useCallback(
    (createData: CreateTileData) => {
      return createTileGQL({
        variables: { input: createData },
        update: (cache, { data: addTile }) => {
          const data: GetTilesResult | null = cache.readQuery({
            query: GET_TILES,
          });

          if (data === null || !addTile) return;

          cache.writeQuery<GetTilesResult>({
            query: GET_TILES,
            data: {
              tiles: [...data.tiles, addTile.createTile],
            },
          });
        },
      });
    },
    [createTileGQL]
  );

  return [createTile, other];
};

export default useCreateTile;
