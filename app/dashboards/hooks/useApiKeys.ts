import { useState, useCallback } from "react";

export interface ApiKey {
  id: string;
  name: string;
  usage: number;
  key: string;
  monthly_limit?: number;
}

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch API keys
  const fetchApiKeys = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/api-keys");
    const data = await res.json();
    setApiKeys(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  // Create API key
  const createApiKey = useCallback(
    async (keyData: {
      name: string;
      usage?: number;
      key?: string;
      monthly_limit?: number;
    }) => {
      await fetch("/api/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...keyData,
          usage: keyData.usage ?? 0,
          key: keyData.key ?? "tvly-" + Math.random().toString(36).slice(2, 18),
        }),
      });
      fetchApiKeys();
    },
    [fetchApiKeys]
  );

  // Update API key
  const updateApiKey = useCallback(
    async (keyData: { id: string; name: string; monthly_limit?: number }) => {
      await fetch("/api/api-keys", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(keyData),
      });
      fetchApiKeys();
    },
    [fetchApiKeys]
  );

  // Delete API key
  const deleteApiKey = useCallback(
    async (id: string) => {
      await fetch("/api/api-keys", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchApiKeys();
    },
    [fetchApiKeys]
  );

  return {
    apiKeys,
    loading,
    fetchApiKeys,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    setApiKeys,
  };
}
