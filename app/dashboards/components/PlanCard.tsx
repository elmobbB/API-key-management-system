import React from "react";

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

export default PlanCard;
