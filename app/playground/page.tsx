"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Notification from "../dashboards/components/Notification";

const Playground = () => {
  const [apiKey, setApiKey] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      const res = await fetch("/api/api-keys/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey }),
      });
      const data = await res.json();
      if (data.valid) {
        router.push(`/protected?apiKey=${encodeURIComponent(apiKey)}`);
      } else {
        setShowNotification(true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">API Playground</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium" htmlFor="apiKey">
            Enter your API Key
          </label>
          <input
            id="apiKey"
            type="text"
            className="w-full border rounded-lg px-3 py-2 mb-4"
            placeholder="API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
            disabled={!apiKey.trim()}
          >
            Submit
          </button>
        </form>
        {showNotification && (
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

export default Playground;
