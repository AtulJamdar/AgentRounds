"use client"; // Ensure this is at the top
import { useEffect, useState } from "react";

export const ActivityPanel = ({ logs }: { logs: string[] }) => {
  const [mounted, setMounted] = useState(false);

  // This only runs on the client after the page loads
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder that matches the server's initial empty state
    return <div className="bg-slate-900 h-64 rounded-lg"></div>;
  }

  return (
    <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto shadow-inner">
      <div className="flex items-center gap-2 mb-2 border-b border-slate-700 pb-1">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-slate-400 ml-2 text-xs font-sans">Agent Activity Logs</span>
      </div>
      {logs.map((log, i) => (
        <p key={i} className="mb-1">
          <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span> $ {log}
        </p>
      ))}
    </div>
  );
};