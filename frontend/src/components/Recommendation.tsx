export const Recommendation = ({ content }: { content: string }) => (
  <div className="mt-6 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg shadow-sm">
    <h3 className="text-blue-800 font-bold uppercase tracking-wider text-xs mb-2">Primary Recommendation</h3>
    <p className="text-gray-800 text-lg leading-relaxed italic">
      {content || "Waiting for agent analysis..."}
    </p>
  </div>
);