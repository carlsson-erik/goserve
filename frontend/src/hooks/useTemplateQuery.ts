import { gql } from "@apollo/client";
import { Variable } from "./useCreateTemplate";

export interface Template {
  id: number;
  name: string;
  width: number;
  height: number;
  data: string;
  variables: Variable[];
}

export const GET_TEMPLATES = gql`
  query {
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
`;

export interface GetTemplatesResult {
  templates: Template[];
}
