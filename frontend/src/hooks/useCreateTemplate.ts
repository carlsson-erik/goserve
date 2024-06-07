import { useMutation } from "@apollo/client";
import {
  GET_TEMPLATES,
  GetTemplatesResult,
  Template,
} from "./useTemplateQuery";
import React from "react";
import { graphql } from "../utils/graphql";

export interface Variable {
  id: number;
  name: string;
  value: string;
  default?: string;
}

export interface CreateTemplateData {
  name: string;
  data: string;
  width: number;
  height: number;
  variables: Omit<Variable, "id">[];
}

export interface CreateTemplateResult {
  createTemplate: Template;
}

const useCreateTemplate = () => {
  const [createTemplateGQL, other] = useMutation<CreateTemplateResult>(
    graphql(`
      mutation createTemplate($input: NewTemplate!) {
        createTemplate(input: $input) {
          id
          name
        }
      }
    `)
  );

  const createTile = React.useCallback(
    (createData: CreateTemplateData) => {
      return createTemplateGQL({
        variables: { input: createData },
        update: (cache, { data: newTemplate }) => {
          if (!newTemplate) return;

          const data: GetTemplatesResult | null = cache.readQuery({
            query: GET_TEMPLATES,
          });

          if (data === null || !newTemplate) return;

          cache.writeQuery<GetTemplatesResult>({
            query: GET_TEMPLATES,
            data: {
              templates: [...data.templates, newTemplate.createTemplate],
            },
          });
        },
      });
    },
    [createTemplateGQL]
  );

  return [createTile, other] as const;
};

export default useCreateTemplate;
