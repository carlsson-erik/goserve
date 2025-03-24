import React from "react";
import { LiveError, LivePreview, LiveProvider } from "react-live";
import { Link, generatePath, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/input/Button";
import { tw } from "twind";
import useCreateTile, { CreateTileData } from "../../hooks/tile/useCreateTile";
import paths from "../../utils/paths";
import { useQuery } from "@apollo/client";
import {
  GET_TEMPLATES,
  GetTemplatesResult,
  Template,
} from "../../hooks/template/useTemplateQuery";
import { useForm } from "react-hook-form";
import * as recharts from "recharts";
import useScope, { getVariable } from "../../hooks/useScope";

export interface TileCreateFormProps {
  col: number | undefined;
  row: number | undefined;
  onCancel: () => void;
  onSubmit: () => void;
}

const TileCreateForm: React.FC<TileCreateFormProps> = ({
  col,
  row,
  onCancel,
  onSubmit,
}) => {
  const { data: templates } = useQuery<GetTemplatesResult>(GET_TEMPLATES);

  const form = useForm<CreateTileData>({
    defaultValues: {},
  });

  const variables = form.watch("variables");

  const width = form.watch("width");

  const [template, setTemplate] = React.useState<Template | undefined>();

  const [error, setError] = React.useState<string | undefined>();

  const { dashboardId } = useParams();

  const [createTile] = useCreateTile();

  const navigate = useNavigate();

  const onCreate = React.useCallback(
    async (data: CreateTileData) => {
      if (!template) return;
      const res = await createTile({
        name: data.name,
        col: col ?? 1,
        row: row ?? 1,
        dashboardId: Number(dashboardId) ?? 1,
        templateId: template.id,
        width: 5,
        height: 5,
        variables: (template.variables ?? []).map((t, index) => ({
          name: t.name,
          value: data.variables[index].value ?? t.default ?? "",
          default: "",
        })),
      });

      if (res.isErr()) {
        console.log(res.error);
        setError(res.error);
        return;
      }

      // navigate(generatePath(paths.dashboard.id, { dashboardId }));
      onSubmit();
    },
    [col, createTile, dashboardId, onSubmit, row, template]
  );

  const scope = useScope({
    variables: (template?.variables ?? []).map((t, index) => ({
      name: t.name,
      value: variables[index]?.value ?? t.default ?? "",
      default: "",
    })),
  });

  if (!templates) {
    return <div>Loading...</div>;
  }

  if (!template) {
    return (
      <div className="flex flex-col text-center max-w-2xl m-auto mt-12 p-2 border rounded bg-gray-700">
        <span>Please Select a template</span>
        <div className="p-2 border max-h-80 overflow-y-auto overflow-x-hidden rounded bg-gray-800 flex flex-col gap-2 items-center justify-stretch">
          {templates.templates.map((t) => (
            <Button
              onClick={() => {
                setTemplate(t);
                form.reset({
                  templateId: t.id,
                  col: col,
                  row: row,
                  variables: t.variables ?? [],
                });
              }}
              className="w-full"
            >
              {t.name}
            </Button>
          ))}
        </div>
        <Link to={paths.template.create}>
          <Button className="w-full mt-4">Create template</Button>
        </Link>
      </div>
    );
  }

  console.log(variables);
  return (
    <div className="p-2 bg-gray-800 h-[30rem] flex flex-col">
      {/* <Editor /> */}
      <div className="flex gap-2">
        {templates.templates.map((t) => (
          <Button key={t.id} onClick={() => setTemplate(t)}>
            {t.name}
          </Button>
        ))}
      </div>
      <LiveProvider
        code={template?.data}
        scope={scope as unknown as Record<string, unknown>}
      >
        <div className="grid grid-cols-2 gap-4">
          <form onSubmit={form.handleSubmit(onCreate)}>
            <div className="h-24">
              <h1>Create Tile</h1>
            </div>
            <input
              className="mb-1"
              type="text"
              placeholder="Name..."
              {...form.register("name")}
            />
            <div className="flex flex-col gap-2">
              {(template?.variables ?? []).map((v, index) => (
                <div key={v.id} className="flex gap-2">
                  <span>{v.name}</span>
                  <input
                    type="text"
                    {...form.register(`variables.${index}.value`)}
                  />
                </div>
              ))}
            </div>
          </form>
          <div>
            <span>{error}</span>
            <div className="h-full flex justify-center items-center">
              <LivePreview
                className="h-full border rounded bg-gray-700"
                style={{ aspectRatio: width }}
              />
            </div>
          </div>
          <LiveError />
        </div>
      </LiveProvider>
      <div className="h-full flex justify-end items-end gap-4">
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={form.handleSubmit(onCreate)} variant="primary">
          Create
        </Button>
      </div>
    </div>
  );
};

export default TileCreateForm;
