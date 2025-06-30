"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Notification from "../dashboards/components/Notification";

const ProtectedPage = () => {
  const searchParams = useSearchParams();
  const apiKey = searchParams.get("apiKey") || "";
  const [valid, setValid] = useState<null | boolean>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (!apiKey) return;
    fetch("/api/api-keys/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey }),
    })
      .then((res) => res.json())
      .then((data) => {
        setValid(data.valid);
        setShowNotification(true);
      });
  }, [apiKey]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Protected Page</h1>
        <p className="mb-4">API Key validation result will appear below.</p>
        {valid === true && (
          <div className="mb-4 text-green-600 font-semibold">
            Valid API key, /protected can be accessed
          </div>
        )}
        {valid === false && (
          <div className="mb-4 text-red-600 font-semibold">Invalid API Key</div>
        )}
        {showNotification && valid === true && (
          <Notification
            message="Valid API key, /protected can be accessed"
            color="green"
            onClose={() => setShowNotification(false)}
          />
        )}
        {showNotification && valid === false && (
          <Notification
            message="Invalid API Key"
            color="red"
            onClose={() => setShowNotification(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProtectedPage;
