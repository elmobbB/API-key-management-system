import React from "react";
import Link from "next/link";

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
      <span className="text-gray-700 font-medium"> Claire Poon</span>
      <span className="ml-auto">⚙️</span>
    </div>
  </aside>
);

export default Sidebar;
