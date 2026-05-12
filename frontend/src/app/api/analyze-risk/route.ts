export async function POST(request: Request) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
    const body = await request.json();
    
    const response = await fetch(`${backendUrl}/analyze-risk`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Analyze risk error:", error);
    return Response.json({ error: "Backend request failed" }, { status: 500 });
  }
}
