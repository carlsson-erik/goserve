import React from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import Button from "../../components/input/Button";
import { tw } from "twind";

const DefaultCode = `() => {
    const [count, setCount] = React.useState(0)
    
    return(<div className="h-full flex justify-center items-center" onClick={() => setCount(count+1)}> {count}</div>)
}`;

const TileCreateScreen: React.FC = () => {
  const [aspectRatio, setAspectRatio] = React.useState(2);
  return (
    <div className="p-2 h-full flex flex-col overflow-hidden">
      {/* <Editor /> */}
      <LiveProvider
        code={DefaultCode}
        transformCode={(code) => {
          console.log(code);
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
            <LiveEditor className="tile-editor h-full" />
          </div>
          <div>
            <div className="mt-8 flex justify-between">
              <div className="h-16 flex gap-2">
                <Button
                  className="h-full aspect-[1]"
                  onClick={() => setAspectRatio(1)}
                >
                  1x1
                </Button>
                <Button
                  className="h-full aspect-[2]"
                  onClick={() => setAspectRatio(2)}
                >
                  1x2
                </Button>
              </div>
              <Button variant="primary">Create</Button>
            </div>
            <div className="h-full flex justify-center items-center">
              <LivePreview
                class="h-48 border rounded bg-gray-700"
                style={{ aspectRatio: aspectRatio }}
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
