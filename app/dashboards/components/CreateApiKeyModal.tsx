import React from "react";

interface CreateApiKeyModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
  newKeyName: string;
  setNewKeyName: (v: string) => void;
  limitMonthly: boolean;
  setLimitMonthly: (v: boolean) => void;
  monthlyLimit: string;
  setMonthlyLimit: (v: string) => void;
}

const CreateApiKeyModal: React.FC<CreateApiKeyModalProps> = ({
  open,
  onClose,
  onCreate,
  newKeyName,
  setNewKeyName,
  limitMonthly,
  setLimitMonthly,
  monthlyLimit,
  setMonthlyLimit,
}) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter" && newKeyName.trim()) onCreate();
        }}
        tabIndex={0}
      >
        <h2 className="text-xl font-bold text-center mb-2">
          Create a new API key
        </h2>
        <div className="text-center text-gray-500 mb-6">
          Enter a name and limit for the new API key.
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="keyName">
            Key Name{" "}
            <span className="text-gray-400">
              — A unique name to identify this key
            </span>
          </label>
          <input
            id="keyName"
            className="w-full border border-blue-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Key Name"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && newKeyName.trim()) onCreate();
            }}
          />
        </div>
        <div className="mb-2 flex items-center">
          <input
            id="limitMonthly"
            type="checkbox"
            checked={limitMonthly}
            onChange={(e) => setLimitMonthly(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="limitMonthly" className="text-sm">
            Limit monthly usage<span className="text-gray-400">*</span>
          </label>
        </div>
        <input
          className="w-full border rounded-lg px-3 py-2 mb-2 disabled:bg-gray-100"
          type="number"
          placeholder="1000"
          value={monthlyLimit}
          onChange={(e) => setMonthlyLimit(e.target.value)}
          disabled={!limitMonthly}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newKeyName.trim()) onCreate();
          }}
        />
        <div className="text-xs text-gray-400 mb-4">
          * If the combined usage of all your keys exceeds your plan's limit,
          all requests will be rejected.
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
            onClick={onCreate}
            disabled={!newKeyName.trim()}
          >
            Create
          </button>
          <button
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateApiKeyModal;
