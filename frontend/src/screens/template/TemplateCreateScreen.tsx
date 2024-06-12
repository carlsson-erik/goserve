import React from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/input/Button";
import { tw } from "twind";
import paths from "../../utils/paths";
import { useFieldArray, useForm } from "react-hook-form";
import { getVariable } from "../../components/TileCard";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../../components/FormField";
import useCreateTemplate from "../../hooks/template/useCreateTemplate";
import { useQuery } from "@apollo/client";
import { GET_TEMPLATES } from "../../hooks/template/useTemplateQuery";
import useUpdateTemplate from "../../hooks/template/useUpdateTemplate";

const DefaultCode = `() => {
    const [count, setCount] = React.useState(0)
    
    return(<div className="h-full flex justify-center items-center" onClick={() => setCount(count+1)}> {count}</div>)
}`;

const schema = z.object({
  name: z.string().min(1),
  data: z.string(),
  width: z.number().min(1).max(2),
  height: z.number().min(1).max(1),
  variables: z.array(
    z.object({
      name: z.string().min(1),
      value: z.string().optional(),
      default: z.string().nullable(),
    })
  ),
});

export type TemplateCreateFormData = z.infer<typeof schema>;

const TemplateCreateScreen = () => {
  const [width, setWidth] = React.useState(2);

  const [error, setError] = React.useState<string | undefined>();

  const { templateId } = useParams();

  const { data: templates } = useQuery(GET_TEMPLATES);

  const template = templates?.templates.find(
    (t) => t.id === Number(templateId)
  );

  const [createTemplate] = useCreateTemplate();
  const [updateTemplate] = useUpdateTemplate();

  const navigate = useNavigate();

  const form = useForm<TemplateCreateFormData>({
    defaultValues: {
      name: "",
      data: DefaultCode,
      height: 1,
      width: 2,
      variables: [],
    },
    resolver: zodResolver(schema),
  });

  const variables = form.watch("variables");

  const { append, remove, fields } = useFieldArray({
    control: form.control,
    name: "variables",
  });

  const onSubmit = React.useCallback(
    async (formData: TemplateCreateFormData) => {
      if (template) {
        const res = await updateTemplate({
          name: formData.name,
          data: formData.data,
          width: formData.height,
          height: formData.height,
          variables: formData.variables.map((v) => ({
            name: v.name,
            value: "",
            default: v.default,
          })),
        });

        if (res.isErr()) {
          console.log(error);
          setError(error);
          return;
        }
        navigate(
          generatePath(paths.template.id, {
            templateId: res.value.data?.updateTemplate.id,
          })
        );
      }
      const res = await createTemplate({
        name: formData.name,
        data: formData.data,
        width: formData.height,
        height: formData.height,
        variables: formData.variables.map((v) => ({
          name: v.name,
          value: "",
          default: v.default,
        })),
      });

      if (res.isErr()) {
        console.log(error);
        setError(error);
        return;
      }
      navigate(
        generatePath(paths.template.id, {
          templateId: res.value.data?.createTemplate.id,
        })
      );
    },
    [createTemplate, error, navigate, template, updateTemplate]
  );

  React.useEffect(() => {
    console.log("reset");
    if (template)
      form.reset({
        name: template?.name ?? "",
        data: template?.data ?? DefaultCode,
        height: template?.height ?? 1,
        width: template?.width ?? 2,
        variables: template?.variables ?? [],
      });
  }, [form, template]);

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
          getVariable: getVariable({
            variables: variables.map((v) => ({
              name: v.name,
              default: v.default,
              value: "",
            })),
          }),
        }}
      >
        <div className="h-2/3 grid grid-cols-2 gap-4">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="h-24">
              <h1>{template ? "Update template" : "Create template"}</h1>
            </div>
            <FormField error={form.formState.errors.name?.message}>
              <input
                className="mb-1"
                type="text"
                placeholder="Name..."
                {...form.register("name")}
              />
            </FormField>
            <LiveEditor className="tile-editor h-full" />
            <div className="mt-2 flex flex-col gap-2">
              {fields.map((_, index) => (
                <div key={index} className="flex gap-2 overflow-hidden">
                  <FormField
                    className="overflow-hidden"
                    error={
                      form.formState.errors.variables?.[index]?.name?.message
                    }
                  >
                    <input
                      type="text"
                      placeholder="Name"
                      {...form.register(`variables.${index}.name`)}
                    />
                  </FormField>
                  <FormField
                    className="overflow-hidden"
                    error={
                      form.formState.errors.variables?.[index]?.default?.message
                    }
                  >
                    <input
                      type="text"
                      placeholder="Value"
                      {...form.register(`variables.${index}.default`)}
                    />
                  </FormField>
                  <Button
                    className="shrink-0 self-start"
                    onClick={() => remove(index)}
                  >
                    X
                  </Button>
                </div>
              ))}
              <Button
                onClick={() => {
                  append({ name: "", default: "" });
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
              <Button onClick={form.handleSubmit(onSubmit)} variant="primary">
                {template ? "Update" : "Create"}
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
