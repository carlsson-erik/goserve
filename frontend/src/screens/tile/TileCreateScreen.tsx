import React from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/input/Button";
import { tw } from "twind";
import useCreateTile, { CreateTileData } from "../../hooks/useCreateTile";
import paths from "../../utils/paths";
import { useQuery } from "@apollo/client";
import {
  GET_TEMPLATES,
  GetTemplatesResult,
  Template,
} from "../../hooks/useTemplateQuery";
import { useForm } from "react-hook-form";
import { CreateTemplateData } from "../../hooks/useCreateTemplate";

const DefaultCode = `() => {
    const [count, setCount] = React.useState(0)
    
    return(<div className="h-full flex justify-center items-center" onClick={() => setCount(count+1)}> {count}</div>)
}`;

const TileCreateScreen: React.FC = () => {
  //Fetch data

  const { data: templates } = useQuery<GetTemplatesResult>(GET_TEMPLATES);

  const form = useForm<CreateTileData>();

  const [template, setTemplate] = React.useState<Template | undefined>();

  const [width, setWidth] = React.useState(2);

  const [error, setError] = React.useState<string | undefined>();

  const { dashboardId, col, row } = useParams();

  const [createTile] = useCreateTile();

  const navigate = useNavigate();

  const onCreate = React.useCallback(
    async (data: CreateTileData) => {
      if (!template) return;
      try {
        const res = await createTile({
          name: data.name,
          col: Number(col) ?? 1,
          row: Number(row) ?? 1,
          dashboardId: Number(dashboardId) ?? 1,
          templateId: template.id,
          width: width,
          height: 1,
          variables: (template.variables ?? []).map((t, index) => ({
            name: t.name,
            value: data.variables[index].value ?? t.default ?? "",
          })),
        });
        if (res.data) {
          navigate(generatePath(paths.dashboard.id, { dashboardId }));
        }
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    },
    [col, createTile, dashboardId, navigate, row, template, width]
  );

  console.log(template?.variables);

  if (!templates) {
    return <div>Loading...</div>;
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
                  onClick={() => setWidth(1)}
                >
                  1x1
                </Button>
                <Button
                  className="h-full aspect-[2]"
                  onClick={() => setWidth(2)}
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

export default TileCreateScreen;
