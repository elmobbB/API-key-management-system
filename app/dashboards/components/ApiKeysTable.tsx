import React from "react";
import { ApiKey } from "../hooks/useApiKeys";

interface ApiKeysTableProps {
  apiKeys: ApiKey[];
  loading: boolean;
  revealedKeyId: string | null;
  copiedKeyId: string | null;
  onReveal: (id: string) => void;
  onCopy: (key: string, id: string) => void;
  onEdit: (key: ApiKey) => void;
  onDelete: (id: string) => void;
  maskKey: (key: string) => string;
}

const ApiKeysTable: React.FC<ApiKeysTableProps> = ({
  apiKeys,
  loading,
  revealedKeyId,
  copiedKeyId,
  onReveal,
  onCopy,
  onEdit,
  onDelete,
  maskKey,
}) => {
  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading...</div>;
  }
  return (
    <table className="w-full mt-4 text-left">
      <thead>
        <tr className="text-gray-500 text-xs border-b">
          <th className="py-2">NAME</th>
          <th className="py-2">USAGE</th>
          <th className="py-2">KEY</th>
          <th className="py-2 text-center">OPTIONS</th>
        </tr>
      </thead>
      <tbody>
        {apiKeys.map((k) => (
          <tr key={k.id} className="border-b last:border-0 hover:bg-gray-50">
            <td className="py-2 font-medium">{k.name}</td>
            <td className="py-2">{k.usage}</td>
            <td className="py-2 font-mono">
              {revealedKeyId === k.id ? k.key : maskKey(k.key)}
            </td>
            <td className="py-2 text-center">
              <div className="flex items-center justify-center space-x-2">
                <button
                  title={revealedKeyId === k.id ? "Hide" : "Show"}
                  className="p-1 hover:bg-gray-100 rounded"
                  onClick={() => onReveal(k.id)}
                >
                  {revealedKeyId === k.id ? "🙈" : "👁️"}
                </button>
                <button
                  title="Copy"
                  className="p-1 hover:bg-gray-100 rounded relative"
                  onClick={() => onCopy(k.key, k.id)}
                >
                  {copiedKeyId === k.id ? (
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1">
                      Copied!
                    </span>
                  ) : null}
                  📋
                </button>
                <button
                  title="Edit"
                  className="p-1 hover:bg-gray-100 rounded"
                  onClick={() => onEdit(k)}
                >
                  ✏️
                </button>
                <button
                  title="Delete"
                  className="p-1 hover:bg-gray-100 rounded"
                  onClick={() => onDelete(k.id)}
                >
                  🗑️
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApiKeysTable;
