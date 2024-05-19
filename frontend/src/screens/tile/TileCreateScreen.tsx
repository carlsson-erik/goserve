import React from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import Button from "../../components/input/Button";
import { tw } from "twind";
import useCreateTile from "../../hooks/useCreateTile";
import { useQuery } from "@apollo/client";
import { GET_DASHBOARDS } from "../../hooks/useDashboardQuery";

const DefaultCode = `() => {
    const [count, setCount] = React.useState(0)
    
    return(<div className="h-full flex justify-center items-center" onClick={() => setCount(count+1)}> {count}</div>)
}`;

const TileCreateScreen: React.FC = () => {
  const [width, setWidth] = React.useState(2);

  const [name, setName] = React.useState("");

  const [data, setData] = React.useState(DefaultCode);

  const [dashboard, setDashboard] = React.useState(1);

  const [createTile] = useCreateTile();

  const onCreate = React.useCallback(() => {
    createTile({
      name: name,
      data: data,
      col: 1,
      row: 1,
      dashboard_id: dashboard,
      width: width,
      height: 1,
    });
  }, [createTile, dashboard, data, name, width]);
  return (
    <div className="p-2 h-full flex flex-col overflow-hidden">
      {/* <Editor /> */}
      <LiveProvider
        code={DefaultCode}
        transformCode={(code) => {
          setData(code);
          return code;
        }}
        scope={{
          tw,
        }}
      >
        <div className="h-2/3 grid grid-cols-2 gap-4">
          <div>
            <div className="h-24">
              <h1>Create Tile</h1>
            </div>
            <input
              className="mb-1"
              type="text"
              placeholder="Name..."
              onChange={(v) => setName(v.target.value)}
            />
            <input
              type="number"
              onChange={(v) => setDashboard(Number(v.target.value))}
            />
            <LiveEditor className="tile-editor h-full" />
          </div>
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
              <Button onClick={() => onCreate()} variant="primary">
                Create
              </Button>
            </div>
            <div className="h-full flex justify-center items-center">
              <LivePreview
                class="h-48 border rounded bg-gray-700"
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
