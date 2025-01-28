import React from "react";
import MonacoEditor from "react-monaco-editor";

const Editor = ({ code, setCode }) => {
  return (
    <div style={{ height: "50vh" }}>
      <MonacoEditor
        width="100%"
        height="100%"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={setCode}
      />
    </div>
  );
};

export default Editor;
