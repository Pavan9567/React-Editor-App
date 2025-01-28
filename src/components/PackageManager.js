import React, { useState } from "react";

const PackageManager = ({ onPackageInstall }) => {
  const [packageName, setPackageName] = useState("");

  const installPackage = async () => {
    if (!packageName.trim()) return;

    try {
      const response = await fetch(`https://cdn.skypack.dev/${packageName}/global`);
      if (response.ok) {
        onPackageInstall(packageName.trim());
        setPackageName(""); // Clear input after installation
      } else {
        alert(`Failed to load package: ${packageName}. Check the package name.`);
        console.error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      alert(`An error occurred while loading the package: ${error.message}`);
      console.error(error);
    }
  };

  return (
    <div className="package-manager">
      <input
        type="text"
        value={packageName}
        placeholder="Enter NPM package name (e.g., lodash)"
        onChange={(e) => setPackageName(e.target.value)}
      />
      <button onClick={installPackage}>Install</button>
    </div>
  );
};

export default PackageManager;
