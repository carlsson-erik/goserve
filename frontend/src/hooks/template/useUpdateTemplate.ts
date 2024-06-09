import { useMutation } from "@apollo/client";
import {
  GET_TEMPLATES,
  GetTemplatesResult,
  Template,
} from "./useTemplateQuery";
import React from "react";
import { graphql } from "../../utils/graphql";
import { CreateTemplateData } from "./useCreateTemplate";

export interface UpdateTemplateResult {
  updateTemplate: Template;
}

const useUpdateTemplate = () => {
  const [updateTemplateGQL, other] = useMutation<UpdateTemplateResult>(
    graphql(`
      mutation UpdateTemplate($input: NewTemplate!) {
        updateTemplate(input: $input) {
          id
          name
        }
      }
    `)
  );

  const updateTemplate = React.useCallback(
    (updateData: CreateTemplateData) => {
      return updateTemplateGQL({
        variables: { input: updateData },
        update: (cache, { data: updatedTemplate }) => {
          if (!updatedTemplate) return;

          const data: GetTemplatesResult | null = cache.readQuery({
            query: GET_TEMPLATES,
          });

          if (data === null || !updatedTemplate) return;

          cache.writeQuery<GetTemplatesResult>({
            query: GET_TEMPLATES,
            data: {
              templates: [...data.templates, updatedTemplate.updateTemplate],
            },
          });
        },
      });
    },
    [updateTemplateGQL]
  );

  return [updateTemplate, other] as const;
};

export default useUpdateTemplate;
