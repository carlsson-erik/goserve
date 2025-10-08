import React from "react";
import { LiveError, LivePreview, LiveProvider } from "react-live";
import { Tile } from "../../../hooks/dashboard/useDashboardQuery";
import useScope from "../../../hooks/useScope";
import { tw } from "twind";
import Button from "../../input/Button";
import { indexBy } from "ramda";
import { capitalizeFirstLetter } from "../../../utils/text";

export interface TileEditorProps {
  tile: Tile;
  className?: string;
  onUpdate: (id: number, data: Partial<Tile>) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

const TileEditor: React.FC<TileEditorProps> = ({
  tile,
  className,
  onUpdate,
  onCancel,
  onSubmit,
}) => {
  const [formData, setFormData] = React.useState(
    indexBy((v) => v.id, tile.variables ?? [])
  );

  const onSave = React.useCallback(async () => {
    if (!formData) return;
    onUpdate(
      tile.id,

      {
        col: tile.col,
        row: tile.row,
        height: tile.height,
        width: tile.width,
        name: tile.name,
        id: tile.id,
        variables: Object.values(formData).map((v) => ({
          id: v.id,
          name: v.name,
          value: v.value,
          default: v.default,
        })),
      }
    );

    onSubmit();
  }, [
    formData,
    onSubmit,
    onUpdate,
    tile.col,
    tile.height,
    tile.id,
    tile.name,
    tile.row,
    tile.width,
  ]);

  const scope = useScope({ variables: Object.values(formData) });

  return (
    <div className="p-6 bg-gray-800 border-gray-700 rounded-lg border">
      <div className={tw("grid grid-cols-2 gap-8", className)}>
        <div>
          <div className="mb-8 text-lg">Variables</div>
          <div className="flex flex-col gap-4">
            {Object.values(formData).map((v) => (
              <div className="flex flex-col gap-1 items-stretch">
                <div>{capitalizeFirstLetter(v.name)} </div>
                <input
                  className="grow"
                  type="text"
                  onChange={(value) => {
                    setFormData((oldValue) => ({
                      ...oldValue,
                      [v.id]: { ...v, value: value.currentTarget.value },
                    }));
                  }}
                  value={v.value}
                />
              </div>
            ))}
            {Object.entries(formData).length == 0 && (
              <div> No variables available. Add variables to the template.</div>
            )}
          </div>
        </div>
        <div className="h-full">
          <LiveProvider
            code={tile.template.data}
            scope={scope as unknown as Record<string, unknown>}
          >
            <LiveError />
            <LivePreview className="border border-gray-600 rounded bg-gray-900 h-full" />
          </LiveProvider>
        </div>
      </div>
      <div className="mt-8 flex justify-end gap-2">
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default TileEditor;
