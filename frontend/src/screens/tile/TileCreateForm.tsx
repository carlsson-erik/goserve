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
import { getVariable } from "../../components/feature/dashboard/TileCard";
import * as recharts from "recharts";

export interface TileCreateFormProps {
  col: number | undefined;
  row: number | undefined;
}

const TileCreateForm: React.FC<TileCreateFormProps> = ({ col, row }) => {
  const { data: templates } = useQuery<GetTemplatesResult>(GET_TEMPLATES);

  const form = useForm<CreateTileData>({
    defaultValues: {
      width: 2,
      height: 1,
    },
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
        width: data.width,
        height: 1,
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

      navigate(generatePath(paths.dashboard.id, { dashboardId }));
    },
    [col, createTile, dashboardId, navigate, row, template]
  );

  if (!templates) {
    return <div>Loading...</div>;
  }

  if (!template) {
    return (
      <div className="flex flex-col text-center max-w-2xl m-auto mt-12 p-2 border rounded bg-gray-700">
        <span>Please Select a template</span>
        <div className="p-2 border max-h-80 overflow-y-auto overflow-x-hidden rounded bg-gray-800 flex flex-col gap-2 items-center justify-stretch">
          {templates.templates.map((t) => (
            <Button onClick={() => setTemplate(t)} className="w-full">
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

  return (
    <div className="p-2 h-full flex flex-col overflow-hidden">
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
        scope={{
          tw,
          getVariable: getVariable({ variables }),
          recharts,
        }}
      >
        <div className="h-2/3 grid grid-cols-2 gap-4">
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
            <div className="mt-8 flex justify-between">
              <div className="h-16 flex gap-2">
                <Button
                  className="h-full aspect-[1]"
                  onClick={() => form.setValue("width", 1)}
                >
                  1x1
                </Button>
                <Button
                  className="h-full aspect-[2]"
                  onClick={() => form.setValue("width", 2)}
                >
                  1x2
                </Button>
              </div>
              <Button onClick={form.handleSubmit(onCreate)} variant="primary">
                Create
              </Button>
            </div>
            <span>{error}</span>
            <div className="h-full flex justify-center items-center">
              <LivePreview
                className="h-48 border rounded bg-gray-700"
                style={{ aspectRatio: width }}
              />
            </div>
          </div>
          <LiveError />
        </div>
      </LiveProvider>
    </div>
  );
};

export default TileCreateForm;
