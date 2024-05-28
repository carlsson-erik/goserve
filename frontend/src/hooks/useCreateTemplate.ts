import { gql, useMutation } from "@apollo/client";
import {
  GET_TEMPLATES,
  GetTemplatesResult,
  Template,
} from "./useTemplateQuery";
import React from "react";

export interface Variable {
  name: string;
  value: string;
  default?: string;
}

export interface CreateTemplateData {
  name: string;
  data: string;
  width: number;
  height: number;
  variables: Variable[];
}

export interface CreateTemplateResult {
  createTemplate: Template;
}

const useCreateTemplate = () => {
  const [createTemplateGQL, other] = useMutation<CreateTemplateResult>(gql`
    mutation createTemplate($input: NewTemplate!) {
      createTile(input: $input) {
        id
        name
      }
    }
  `);

  const createTile = React.useCallback(
    (createData: CreateTemplateData) => {
      return createTemplateGQL({
        variables: { input: createData },
        update: (cache, { data: addTemplate }) => {
          const data: GetTemplatesResult | null = cache.readQuery({
            query: GET_TEMPLATES,
          });

          if (data === null || !addTemplate) return;

          cache.writeQuery<GetTemplatesResult>({
            query: GET_TEMPLATES,
            data: {
              templates: [...data.templates, addTemplate.createTemplate],
            },
          });
        },
      });
    },
    [createTemplateGQL]
  );

  return [createTile, other];
};

export default useCreateTemplate;
