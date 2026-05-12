"use client";
import { PatientCard } from "@/components/PatientCard";
import { ActivityPanel } from "@/components/ActivityPanel";
import { WorkflowTimeline } from "@/components/WorkflowTimeline";
import { Recommendation } from "@/components/Recommendation";

export default function DashboardPage() {
  const mockLogs = ["Initializing Agent Mesh...", "Searching medical records...", "Comparing with clinical guidelines..."];
  const mockSteps = [
    { label: "Data Ingestion", status: "done" as const },
    { label: "Clinical Analysis", status: "loading" as const },
    { label: "Final Report", status: "pending" as const },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <PatientCard name="Atul Jamdar" age={23} condition="Routine Checkup" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 border p-4 rounded-xl bg-white shadow-sm">
          <h3 className="font-bold mb-4">Workflow State</h3>
          <WorkflowTimeline steps={mockSteps} />
        </div>
        
        <div className="md:col-span-2">
          <ActivityPanel logs={mockLogs} />
        </div>
      </div>

      <Recommendation content="The patient is in excellent health. Continue current regimen." />
    </div>
  );
}