import { graphql } from "../utils/graphql";
import { Variable } from "./useCreateTemplate";

export interface Template {
  id: number;
  name: string;
  width: number;
  height: number;
  data: string;
  variables?: Variable[] | null;
}

export const GET_TEMPLATES = graphql(`
  query Templates {
    templates {
      id
      name
      width
      height
      data
      variables {
        id
        name
        value
        default
      }
    }
  }
`);
export interface GetTemplatesResult {
  templates: Template[];
}
