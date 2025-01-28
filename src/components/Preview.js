import React, { useRef, useEffect } from "react";
import * as Babel from "@babel/standalone";

const Preview = ({ code, packages }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const transpileCode = (code) => {
      try {
        // Replace imports with Skypack CDN links
        const transformedCode = code.replace(
          /import\s+(\w+)\s+from\s+['"](.+)['"];/g,
          (_, variable, pkg) =>
            `const ${variable} = await import('https://cdn.skypack.dev/${pkg}');`
        );

        return Babel.transform(transformedCode, { presets: ["react", "env"] }).code;
      } catch (err) {
        return `console.error(${JSON.stringify(err.message)})`;
      }
    };

    const generatePackageScripts = () => {
      if (!packages || packages.length === 0) return "";
      return packages
        .map((pkg) => `<script crossorigin="anonymous" src="https://cdn.skypack.dev/${pkg}"></script>`)
        .join("\n");
    };

    const html = `
      <html>
        <head>
          <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/framer-motion/dist/framer-motion.umd.min.js"></script>
          ${generatePackageScripts()}
        </head>
        <body>
          <div id="root"></div>
          <script type="module">
            try {
              const React = window.React;
              const ReactDOM = window.ReactDOM;
              const motion = window.FramerMotion;
              
              // Run transpiled user code
              ${transpileCode(code)}
            } catch (err) {
              document.body.innerHTML = '<p style="color: red;">' + err.message + '</p>';
            }
          </script>
        </body>
      </html>
    `;

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
