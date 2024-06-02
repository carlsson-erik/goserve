import React from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/input/Button";
import { tw } from "twind";
import paths from "../../utils/paths";
import useCreateTemplate, {
  CreateTemplateData,
  Variable,
} from "../../hooks/useCreateTemplate";
import { useFieldArray, useForm } from "react-hook-form";

const DefaultCode = `() => {
    const [count, setCount] = React.useState(0)
    
    return(<div className="h-full flex justify-center items-center" onClick={() => setCount(count+1)}> {count}</div>)
}`;

const TemplateCreateScreen = () => {
  const [width, setWidth] = React.useState(2);

  const [error, setError] = React.useState<string | undefined>();

  const { dashboardId, col, row } = useParams();

  const [createTemplate] = useCreateTemplate();

  const navigate = useNavigate();

  const form = useForm<CreateTemplateData>({
    defaultValues: {
      name: "",
      data: DefaultCode,
      height: 1,
      width: 2,
      variables: [],
    },
  });

  const { append, remove, fields } = useFieldArray({
    control: form.control,
    name: "variables",
  });

  const onCreate = React.useCallback(
    async (data: CreateTemplateData) => {
      try {
        const res = await createTemplate({
          ...data,
          width: width,
          height: 1,
        });
        if (res.data) {
          navigate(generatePath(paths.dashboard.id, { dashboardId }));
        }
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    },
    [createTemplate, dashboardId, navigate, width]
  );
  return (
    <div className="p-2 h-full flex flex-col overflow-hidden">
      {/* <Editor /> */}
      <LiveProvider
        code={DefaultCode}
        transformCode={(code) => {
          form.setValue("data", code);
          return code;
        }}
        scope={{
          tw,
        }}
      >
        <div className="h-2/3 grid grid-cols-2 gap-4">
          <form onSubmit={form.handleSubmit(onCreate)}>
            <div className="h-24">
              <h1>Create template</h1>
            </div>
            <input
              className="mb-1"
              type="text"
              placeholder="Name..."
              {...form.register("name")}
            />
            <LiveEditor className="tile-editor h-full" />
            <div className="mt-2 flex flex-col gap-2">
              {fields.map((v, index) => (
                <div className="flex justify-between">
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      {...form.register(`variables.${index}.name`)}
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      {...form.register(`variables.${index}.value`)}
                    />
                  </div>
                  <Button onClick={() => remove(index)}>X</Button>
                </div>
              ))}
              <Button
                onClick={() => {
                  append({ name: "", value: "" });
                }}
              >
                Add variable
              </Button>
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

export default TemplateCreateScreen;
