import React, { useState } from 'react';

const PackageInstaller = () => {
    const [packageName, setPackageName] = useState('');
    const [message, setMessage] = useState('');

    const installPackage = async () => {
        try {
            const response = await fetch('https://react-editor-app-backend.onrender.com/install', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ packageName }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className='package-manager'>
            <input
                type="text"
                placeholder="Enter package name"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
            />
            <button onClick={installPackage}>Install</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PackageInstaller;
