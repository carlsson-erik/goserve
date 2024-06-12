import React from "react";
import { useMutation } from "@apollo/client";
import { graphql } from "../../utils/graphql";
import { err, ok } from "neverthrow";
import {
  GET_TEMPLATES,
  GetTemplatesResult,
  Template,
} from "./useTemplateQuery";

export interface DeleteTemplateResult {
  deleteTemplate: Template;
}

const useDeleteTemplate = () => {
  const [deleteTemplateGQL, other] = useMutation<DeleteTemplateResult>(
    graphql(`
      mutation DeleteTemplate($id: Int!) {
        deleteTemplate(id: $id) {
          id
        }
      }
    `)
  );

  const deleteTemplate = React.useCallback(
    async (id: number) => {
      const res = await deleteTemplateGQL({
        variables: { id },
        update: (cache, { data: addDashboard }) => {
          const data: GetTemplatesResult | null = cache.readQuery({
            query: GET_TEMPLATES,
          });

          if (data === null || !addDashboard) return;

          cache.writeQuery<GetTemplatesResult>({
            query: GET_TEMPLATES,
            data: {
              templates: [...data.templates.filter((d) => d.id !== id)],
            },
          });
        },
      });

      if (res.errors) return err(res.errors.map((e) => e.message).join(","));

      return ok(res);
    },
    [deleteTemplateGQL]
  );

  return [deleteTemplate, other] as const;
};

export default useDeleteTemplate;
