import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").slice(0, 120);
  const email = String(formData.get("email") ?? "").slice(0, 120);
  const message = String(formData.get("message") ?? "").slice(0, 1000);

  if (!name || !email) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  const backendUrl = process.env.BACKEND_URL ?? "http://localhost:4001/api/contact";

  let backendStatus: "ok" | "error" = "ok";

  try {
    await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message }),
      cache: "no-store"
    });
  } catch (error) {
    backendStatus = "error";
    console.error("Mock backend unreachable", error);
  }

  return NextResponse.json(
    {
      ok: true,
      received: { name, email },
      backend: backendStatus
    },
    { status: 200 }
  );
}
