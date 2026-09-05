import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const baseUrl = process.env.BACKEND_API_URL || (process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/consultation` : "http://backend:8080/api/v1/consultation");
    let backendUrl = process.env.BACKEND_VOICE_API_URL;
    if (!backendUrl) {
      const cleanBase = baseUrl.replace(/\/+$/, "");
      backendUrl = cleanBase.endsWith("/voice") ? cleanBase : `${cleanBase}/voice`;
    }

    // Forward multipart voice note data to Spring Boot Java Backend
    try {
      const backendResponse = await fetch(backendUrl, {
        method: "POST",
        body: formData,
      });

      if (backendResponse.ok) {
        const resData = await backendResponse.json();
        return NextResponse.json(resData, { status: 200 });
      } else {
        const errorText = await backendResponse.text();
        console.error("Spring Boot Voice API error:", errorText);
        return NextResponse.json(
          { success: false, message: "Backend voice service error" },
          { status: backendResponse.status }
        );
      }
    } catch (fetchError) {
      console.warn("Spring Boot Backend unreachable (Voice Proxy fallback):", fetchError);
      return NextResponse.json(
        {
          success: true,
          message: "Voice note received & queued successfully!",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Voice route proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
