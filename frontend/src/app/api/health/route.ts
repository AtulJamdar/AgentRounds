export async function GET() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
    const response = await fetch(`${backendUrl}/health`);
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ status: "error", message: "Backend unreachable" }, { status: 500 });
  }
}
