import React from "react";

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

export default Topbar;
