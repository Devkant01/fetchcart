import React from "react";
import useApiKey from "../hooks/useApiKey";

import KeyDisplay from "../components/api/KeyDisplay";
import Metadata from "../components/api/Metadata";
import DangerZone from "../components/api/DangerZone";

export default function ApiGenerator() {
  const {
    apiKey,
    hidden,
    loading,
    metadata,
    handleCopy,
    handleToggleHidden,
    generateKey,
    regenerateKey,
    revokeKey,
  } = useApiKey();

  return (
     <div className="w-full flex justify-center py-10">
      {/* Inner content limited to 85% width */}
      <div className="w-[85%] bg-white/90 backdrop-blur-xl shadow-xl rounded-3xl p-8 ">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">API Key Management</h1>
        <p className="text-gray-600 mb-6">
          Generate, manage, and revoke your API key below.
        </p>

        <KeyDisplay
          apiKey={apiKey}
          hidden={hidden}
          loading={loading}
          handleCopy={handleCopy}
          handleToggleHidden={handleToggleHidden}
          generateKey={generateKey}
          regenerateKey={regenerateKey}
        />

        <Metadata metadata={metadata} />

        <DangerZone revokeKey={revokeKey} />
      </div>
    </div>
  );
}
