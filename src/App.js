import React, { useState } from "react";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import PackageManager from "./components/PackageManager";
import "./App.css";

function App() {
  const [code, setCode] = useState("ReactDOM.render(<h1>Hello, World!</h1>, document.getElementById('root'));");
  const [packages, setPackages] = useState([]);

  const addPackage = (packageName) => {
    if (!packages.includes(packageName)) {
      setPackages([...packages, packageName]); // Add package to the list
    }
  };

  return (
    <div id="root">
      <header>React Code Editor Clone</header>
      <PackageManager onPackageInstall={addPackage} />
      <div className="main">
        <div className="editor-preview-container">
          <div className="editor-container">
            <Editor code={code} setCode={setCode} />
          </div>
          <div className="preview-container">
            <Preview code={code} packages={packages} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
