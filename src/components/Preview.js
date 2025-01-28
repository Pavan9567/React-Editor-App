import React, { useRef, useEffect } from "react";
import * as Babel from "@babel/standalone";

const Preview = ({ code, packages }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const transpileCode = (code) => {
      try {
        return Babel.transform(code, { presets: ["react", "env"] }).code;
      } catch (err) {
        return `console.error(${JSON.stringify(err.message)})`;
      }
    };

    const generatePackageScripts = () => {
      return packages
        .map((pkg) => `<script src="https://cdn.skypack.dev/${pkg}/global"></script>`)
        .join("\n");
    };

    const html = `
      <html>
        <head>
          <!-- Load React and ReactDOM from CDN -->
          <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
          ${generatePackageScripts()}
        </head>
        <body>
          <div id="root"></div>
          <script>
            try {
              const React = window.React;
              const ReactDOM = window.ReactDOM;
              ${transpileCode(code)}
            } catch (err) {
              document.body.innerHTML = '<p style="color: red;">' + err.message + '</p>';
            }
          </script>
        </body>
      </html>`;

    iframeRef.current.srcdoc = html;
  }, [code, packages]);

  return (
    <iframe
      ref={iframeRef}
      title="Preview"
      style={{ width: "100%", height: "50vh", border: "none" }}
      sandbox="allow-scripts"
    />
  );
};

export default Preview;
