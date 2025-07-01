"use client";
import React, { useState, useEffect } from "react";
import Notification from "./components/Notification";
import Link from "next/link";
// Define ApiKey type
interface ApiKey {
  id: string;
  name: string;
  usage: number;
  key: string;
  monthly_limit?: number;
}

const Sidebar = ({ onHide }: { onHide?: () => void }) => (
  <aside className="w-64 bg-white border-r min-h-screen flex flex-col justify-between">
    <div>
      <div className="flex items-center justify-between px-8 py-6 text-2xl font-bold tracking-tight">
        Claire <span className="font-light">AI</span>
        {onHide && (
          <button
            className="ml-4 w-14 h-14 flex items-center justify-center bg-white border shadow rounded-full hover:bg-gray-100 transition"
            onClick={onHide}
            aria-label="Hide sidebar"
            type="button"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="7"
                y="10"
                width="18"
                height="2.5"
                rx="1.25"
                fill="#222"
              />
              <rect
                x="7"
                y="15"
                width="18"
                height="2.5"
                rx="1.25"
                fill="#222"
              />
              <rect
                x="7"
                y="20"
                width="18"
                height="2.5"
                rx="1.25"
                fill="#222"
              />
            </svg>
          </button>
        )}
      </div>
      <nav className="mt-8">
        <ul className="space-y-2">
          <li>
            <a
              className="flex items-center px-8 py-2 font-medium text-gray-900 bg-gray-100 rounded"
              href="#"
            >
              {" "}
              <span className="mr-3">🏠</span> Overview
            </a>
          </li>
          <li>
            <a
              className="flex items-center px-8 py-2 text-gray-700 hover:bg-gray-100 rounded"
              href="#"
            >
              {" "}
              <span className="mr-3">🧑‍💻</span> Research Assistant
            </a>
          </li>
          <li>
            <a
              className="flex items-center px-8 py-2 text-gray-700 hover:bg-gray-100 rounded"
              href="#"
            >
              {" "}
              <span className="mr-3">📄</span> Research Reports
            </a>
          </li>
          <li>
            <Link
              className="flex items-center px-8 py-2 text-gray-700 hover:bg-gray-100 rounded"
              href="/playground"
            >
              <span className="mr-3">🧪</span> API Playground
            </Link>
          </li>
          <li>
            <a
              className="flex items-center px-8 py-2 text-gray-700 hover:bg-gray-100 rounded"
              href="#"
            >
              {" "}
              <span className="mr-3">🧾</span> Invoices
            </a>
          </li>
          <li>
            <a
              className="flex items-center px-8 py-2 text-gray-700 hover:bg-gray-100 rounded"
              href="#"
            >
              {" "}
              <span className="mr-3">📚</span> Documentation
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div className="flex items-center px-8 py-6 border-t">
      <img
        // src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="avatar"
        className="w-8 h-8 rounded-full mr-3"
      />
      <span className="text-gray-700 font-medium">Claire Poon</span>
      <span className="ml-auto">⚙️</span>
    </div>
  </aside>
);

const Topbar = () => (
  <header className="flex items-center justify-between px-8 py-6 bg-white border-b">
    <div>
      <div className="text-xs text-gray-400">Pages / Overview</div>
      <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
    </div>
    <div className="flex items-center space-x-3">
      <span className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
        ● Operational
      </span>
      <button className="p-2 rounded-full hover:bg-gray-100">🌐</button>
      <button className="p-2 rounded-full hover:bg-gray-100">🐦</button>
      <button className="p-2 rounded-full hover:bg-gray-100">✉️</button>
      <button className="p-2 rounded-full hover:bg-gray-100">⚙️</button>
    </div>
  </header>
);

const PlanCard = () => (
  <div className="rounded-xl p-8 mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-white shadow-lg relative overflow-hidden">
    <div className="absolute right-8 top-8">
      <button className="bg-white/20 border border-white/30 px-4 py-2 rounded-lg text-white font-medium hover:bg-white/30">
        Manage Plan
      </button>
    </div>
    <div className="text-xs font-semibold mb-2">CURRENT PLAN</div>
    <div className="text-3xl font-bold mb-4">Researcher</div>
    <div className="text-sm font-medium mb-2">
      API Limit{" "}
      <span className="ml-1" title="API requests used">
        ⓘ
      </span>
    </div>
    <div className="w-full h-2 bg-white/30 rounded-full mb-2">
      <div
        className="h-2 bg-white rounded-full"
        style={{ width: "2.4%" }}
      ></div>
    </div>
    <div className="text-sm">24 / 1,000 Requests</div>
  </div>
);

function maskKey(key: string) {
  return key.slice(0, 4) + "-" + "*".repeat(key.length - 8) + key.slice(-4);
}

export default function DashboardPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [limitMonthly, setLimitMonthly] = useState(false);
  const [monthlyLimit, setMonthlyLimit] = useState("");
  const [revealedKeyId, setRevealedKeyId] = useState<string | null>(null);
  const [editKeyId, setEditKeyId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteKeyId, setDeleteKeyId] = useState<string | null>(null);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; color: string } | null>(
    null
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [creating, setCreating] = useState(false);

  // Fetch API keys from Supabase
  const fetchApiKeys = async () => {
    setLoading(true);
    const res = await fetch("/api/api-keys");
    const data = await res.json();
    setApiKeys(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  // Create
  const handleCreate = async () => {
    if (creating) return; // Prevent double submit
    setCreating(true);
    await fetch("/api/api-keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newKeyName,
        usage: 0,
        key: `dandi-${Date.now()}${Math.random()
          .toString(36)
          .substring(2, 15)}`,
        monthly_limit:
          limitMonthly && monthlyLimit ? parseInt(monthlyLimit) : undefined,
      }),
    });
    setShowCreateModal(false);
    setNewKeyName("");
    setLimitMonthly(false);
    setMonthlyLimit("");
    fetchApiKeys();
    setToast({ message: "API key created successfully", color: "green" });
    setTimeout(() => setToast(null), 4000);
    setCreating(false);
  };

  // Edit
  const handleEdit = (key: ApiKey) => {
    setEditKeyId(key.id);
    setNewKeyName(key.name);
    setLimitMonthly(!!key.monthly_limit);
    setMonthlyLimit(key.monthly_limit ? key.monthly_limit.toString() : "");
  };
  const handleSaveEdit = async () => {
    await fetch("/api/api-keys", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editKeyId,
        name: newKeyName,
        monthly_limit:
          limitMonthly && monthlyLimit ? parseInt(monthlyLimit) : undefined,
      }),
    });
    setEditKeyId(null);
    setNewKeyName("");
    setLimitMonthly(false);
    setMonthlyLimit("");
    fetchApiKeys();
    setToast({ message: "API key updated successfully", color: "green" });
    setTimeout(() => setToast(null), 4000);
  };

  // Delete
  const handleDelete = (id: string) => {
    setDeleteKeyId(id);
    setShowDeleteModal(true);
  };
  const confirmDelete = async () => {
    await fetch("/api/api-keys", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteKeyId }),
    });
    setShowDeleteModal(false);
    setDeleteKeyId(null);
    fetchApiKeys();
    setToast({ message: "API key deleted successfully", color: "red" });
    setTimeout(() => setToast(null), 4000);
  };

  // Reveal
  const handleToggleReveal = (id: string) => {
    setRevealedKeyId(revealedKeyId === id ? null : id);
  };

  // Copy
  const handleCopy = async (key: string, id: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedKeyId(id);
      setTimeout(() => setCopiedKeyId(null), 1200);
    } catch (e) {}
  };

  // Handle Escape key to close modals
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (showCreateModal) setShowCreateModal(false);
        if (editKeyId !== null) {
          setEditKeyId(null);
          setNewKeyName("");
          setLimitMonthly(false);
          setMonthlyLimit("");
        }
        if (showDeleteModal) {
          setShowDeleteModal(false);
        }
      }
    }
    if (showCreateModal || editKeyId !== null || showDeleteModal) {
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [showCreateModal, editKeyId, showDeleteModal]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Toggle Button (when sidebar is hidden) */}
      {!sidebarOpen && (
        <button
          className="fixed top-6 left-4 z-50 w-14 h-14 flex items-center justify-center bg-white border shadow rounded-full hover:bg-gray-100 transition"
          onClick={() => setSidebarOpen(true)}
          aria-label="Show sidebar"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="7" y="10" width="18" height="2.5" rx="1.25" fill="#222" />
            <rect x="7" y="15" width="18" height="2.5" rx="1.25" fill="#222" />
            <rect x="7" y="20" width="18" height="2.5" rx="1.25" fill="#222" />
          </svg>
        </button>
      )}
      {/* Sidebar */}
      <div
        className={`transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-40`}
        style={{ position: "relative" }}
      >
        <Sidebar onHide={() => setSidebarOpen(false)} />
      </div>
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-8 max-w-5xl mx-auto">
          <PlanCard />
          <section className="bg-white rounded-xl shadow p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-lg font-semibold mb-1">API Keys</div>
                <div className="text-gray-500 text-sm">
                  The key is used to authenticate your requests to the Research
                  API. To learn more, see the{" "}
                  <a href="#" className="underline">
                    documentation
                  </a>{" "}
                  page.
                </div>
              </div>
              <button
                className="ml-4 px-4 py-2 bg-gray-100 rounded-lg font-medium text-lg hover:bg-gray-200"
                onClick={() => setShowCreateModal(true)}
              >
                ＋
              </button>
            </div>
            {loading ? (
              <div className="text-center py-8 text-gray-400">Loading...</div>
            ) : (
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
                    <tr
                      key={k.id}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >
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
                            onClick={() => handleToggleReveal(k.id)}
                          >
                            {revealedKeyId === k.id ? "🙈" : "👁️"}
                          </button>
                          <button
                            title="Copy"
                            className="p-1 hover:bg-gray-100 rounded relative"
                            onClick={() => handleCopy(k.key, k.id)}
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
                            onClick={() => handleEdit(k)}
                          >
                            ✏️
                          </button>
                          <button
                            title="Delete"
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={() => handleDelete(k.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </main>
        {showCreateModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30"
            onClick={() => setShowCreateModal(false)}
          >
            <div
              className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-center mb-2">
                Create a new API key
              </h2>
              <div className="text-center text-gray-500 mb-6">
                Enter a name and limit for the new API key.
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newKeyName.trim()) handleCreate();
                }}
              >
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="keyName"
                  >
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
                />
                <div className="text-xs text-gray-400 mb-4">
                  * If the combined usage of all your keys exceeds your plan's
                  limit, all requests will be rejected.
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
                    disabled={!newKeyName.trim()}
                  >
                    Create
                  </button>
                  <button
                    className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {editKeyId !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30"
            onClick={() => {
              setEditKeyId(null);
              setNewKeyName("");
              setLimitMonthly(false);
              setMonthlyLimit("");
            }}
          >
            <div
              className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-center mb-2">
                Edit API key
              </h2>
              <div className="text-center text-gray-500 mb-6">
                Update the name and limit for this API key.
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newKeyName.trim()) handleSaveEdit();
                }}
              >
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="editKeyName"
                  >
                    Key Name{" "}
                    <span className="text-gray-400">
                      — A unique name to identify this key
                    </span>
                  </label>
                  <input
                    id="editKeyName"
                    className="w-full border border-blue-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Key Name"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="mb-2 flex items-center">
                  <input
                    id="editLimitMonthly"
                    type="checkbox"
                    checked={limitMonthly}
                    onChange={(e) => setLimitMonthly(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="editLimitMonthly" className="text-sm">
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
                />
                <div className="text-xs text-gray-400 mb-4">
                  * If the combined usage of all your keys exceeds your plan's
                  limit, all requests will be rejected.
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
                    disabled={!newKeyName.trim()}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200"
                    onClick={() => {
                      setEditKeyId(null);
                      setNewKeyName("");
                      setLimitMonthly(false);
                      setMonthlyLimit("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative text-center">
              <h2 className="text-xl font-bold mb-4">Delete API key</h2>
              <div className="text-gray-600 mb-6">
                Are you sure you want to delete this API key? This action cannot
                be undone.
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {toast && (
          <Notification
            message={toast.message}
            color={toast.color}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}
