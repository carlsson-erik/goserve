import { tw } from "twind";
import * as recharts from "recharts";
import { Tile } from "./dashboard/useDashboardQuery";
import { Variable } from "./template/useCreateTemplate";
import React from "react";

export function getVariable(
  data?: Tile | { variables: Omit<Variable, "id">[] }
): (name: string) => string {
  return (name: string) => {
    if (!data || !data.variables) return "";

    return data.variables.find((v) => v.name === name)?.value ?? "";
  };
}
export interface Scope {
  tw: typeof tw;
  getVariable: (name: string) => string;
  recharts: typeof recharts;
}

const useScope = (tile: Tile | { variables: Omit<Variable, "id">[] }) => {
  const getVariableMemo = React.useMemo(() => getVariable(tile), [tile]);
  return { tw, getVariable: getVariableMemo, recharts } as Scope;
};

export default useScope;
