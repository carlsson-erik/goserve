import React from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";

const TileCreateScreen: React.FC = () => {
  return (
    <div className="p-2 h-full flex flex-col overflow-hidden">
      <h1>Create Tile</h1>
      {/* <Editor /> */}
      <LiveProvider code="<strong>Hello World!</strong>" noInline>
        <div className="h-full grid grid-cols-2 gap-4">
          <div className="">
            <LiveEditor className="h-2/3 bg-gray-900" />
            <LiveError />
          </div>
          <LivePreview class="border rounded h-2/3 bg-gray-700" />
        </div>
      </LiveProvider>
    </div>
  );
};

export default TileCreateScreen;
