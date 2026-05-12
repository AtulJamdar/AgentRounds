"use client";
type WorkflowStep = {
  label: string;
  status: "done" | "loading" | "pending";
};
import { PatientCard } from "@/components/PatientCard";
import { ActivityPanel } from "@/components/ActivityPanel";
import { WorkflowTimeline } from "@/components/WorkflowTimeline";
import { Recommendation } from "@/components/Recommendation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const mockLogs = ["Initializing Agent Mesh...", "Searching medical records...", "Comparing with clinical guidelines..."];
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);

  // Define dynamic steps based on state
const dynamicSteps: WorkflowStep[] = [
  { 
    label: "Data Ingestion", 
    status: isAnalyzing ? "loading" : (analysisResult ? "done" : "done") 
  },
  { 
    label: "Risk Scan", 
    status: isAnalyzing ? "loading" : (analysisResult ? "done" : "pending") 
  },
  { 
    label: "Final Report", 
    status: analysisResult ? "done" : "pending" 
  },
];

  const mockPatient = {
    name: "John Doe",
    age: 67,
    conditions: ["diabetes", "hypertension"],
    medications: ["metformin", "lisinopril"]
  };

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch("/api/health");
        const data = await response.json();
        setBackendStatus(data.status === "ok" ? "Connected ✅" : "Error ❌");
      } catch (error) {
        console.error("Backend unreachable:", error);
        setBackendStatus("Disconnected 🔌");
      }
    };

    checkHealth();
  }, []);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setLogs(["[SYSTEM]: Initializing Agent Mesh...", "[DB]: Fetching John Doe's records..."]);

    // Artificial delay 1: Simulate Data Fetching
    await new Promise(r => setTimeout(r, 1200));
    setLogs(prev => [...prev, "[RISK_AGENT]: Analyzing condition correlations..."]);
    
    try {
        const response = await fetch("/api/analyze-risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockPatient)
      });
      
      const data = await response.json();
      
      // Artificial delay 2: Simulate Reasoning
      await new Promise(r => setTimeout(r, 1000)); 
      setLogs(prev => [...prev, "[SYSTEM]: Analysis complete. Generating recommendation."]);
      setAnalysisResult(data);
    } catch (err) {
      setLogs(prev => [...prev, "[ERROR]: Connection to Risk Agent failed."]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
        {/* Add a status indicator at the top */}
      <div className="mb-4 text-sm font-medium">
        Backend Status: <span className={backendStatus === "Connected ✅" ? "text-green-600" : "text-red-600"}>{backendStatus}</span>
      </div>
      <PatientCard 
  name={mockPatient.name} 
  age={mockPatient.age} 
  condition={mockPatient.conditions.join(", ")} 
/>
      <button 
          onClick={runAnalysis}
          disabled={isAnalyzing}
          className={`px-8 py-4 rounded-xl font-bold transition-all ${
            isAnalyzing ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
          }`}
        >
          {isAnalyzing ? "Analyzing..." : "Run Risk Agent"}
        </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 border p-4 rounded-xl bg-white shadow-sm">
          <h3 className="font-bold mb-4">Workflow State</h3>
          <WorkflowTimeline steps={dynamicSteps} />
        </div>
        
        <div className="md:col-span-2">
          <ActivityPanel logs={logs} />
        </div>
      </div>

      {analysisResult && (
        <Recommendation content={`RISK: ${analysisResult?.risk?.toUpperCase() || "UNKNOWN"} - ${analysisResult?.reason || ""}`} />
      )}
    </div>
  );
}