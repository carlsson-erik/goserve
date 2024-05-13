import React from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";

const TileEditor: React.FC = () => {
  return (
    <LiveProvider code="<strong>Hello World!</strong>">
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  );
};

export default TileEditor;
