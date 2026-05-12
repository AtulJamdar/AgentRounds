export const WorkflowTimeline = ({ steps }: { steps: { label: string; status: 'done' | 'loading' | 'pending' }[] }) => (
  <div className="space-y-4">
    {steps.map((step, i) => (
      <div key={i} className="flex items-center gap-3">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
          step.status === 'done' ? 'bg-green-500 text-white' : step.status === 'loading' ? 'bg-blue-500 animate-pulse text-white' : 'bg-gray-200'
        }`}>
          {step.status === 'done' ? '✓' : i + 1}
        </div>
        <span className={`text-sm ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-800 font-medium'}`}>
          {step.label}
        </span>
      </div>
    ))}
  </div>
);