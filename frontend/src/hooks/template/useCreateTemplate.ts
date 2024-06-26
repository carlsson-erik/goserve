import { useMutation } from "@apollo/client";
import {
  GET_TEMPLATES,
  GetTemplatesResult,
  Template,
} from "./useTemplateQuery";
import React from "react";
import { graphql } from "../../utils/graphql";
import { err, ok } from "neverthrow";

export interface Variable {
  id: number;
  name: string;
  value: string;
  default: string | null;
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

  const createTemplate = React.useCallback(
    async (createData: CreateTemplateData) => {
      const res = await createTemplateGQL({
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

      if (res.errors) return err(res.errors.map((e) => e.message).join(","));

      return ok(res);
    },
    [createTemplateGQL]
  );

  return [createTemplate, other] as const;
};

export default useCreateTemplate;
