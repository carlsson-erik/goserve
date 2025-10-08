import { useMutation } from "@apollo/client";
import React from "react";
import { graphql } from "../../utils/graphql";
import { Tile } from "../dashboard/useDashboardQuery";
import { err, ok } from "neverthrow";
import { CreateTileData } from "./useCreateTile";

export interface UpdateTilesResult {
  tiles: Tile[];
}

const useCreateOrUpdateTiles = () => {
  const [createOrUpdateTilesGQL, other] = useMutation<UpdateTilesResult>(
    graphql(`
      mutation CreateOrUpdateTiles($input: [NewTile!]!) {
        createOrUpdateTiles(input: $input)
      }
    `)
  );

  const createOrUpdateTiles = React.useCallback(
    async (tiles: CreateTileData[]) => {
      const res = await createOrUpdateTilesGQL({
        variables: { input: tiles },
      });

      if (res.errors) return err(res.errors.map((e) => e.message).join(","));

      return ok(res);
    },
    [createOrUpdateTilesGQL]
  );

  return [createOrUpdateTiles, other] as const;
};

export default useCreateOrUpdateTiles;
