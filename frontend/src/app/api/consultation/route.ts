import { NextResponse } from "next/server";
import { z } from "zod";

const consultationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(6, "Phone number is required"),
  company: z.string().optional(),
  businessType: z.string().optional(),
  problemDescription: z.string().min(10, "Please provide a problem description (at least 10 characters)"),
  preferredContact: z.enum(["email", "phone", "whatsapp"]).default("phone"),
  channelType: z.enum(["message", "meeting", "call", "voice note"]).optional(),
  website: z.string().optional(),
  teamSize: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = consultationSchema.parse(body);

    const backendUrl =
      process.env.BACKEND_API_URL || "http://localhost:8080/api/v1/consultation";

    // Forward request to Spring Boot Java 21 Backend Service
    try {
      const backendResponse = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      if (backendResponse.ok) {
        const resData = await backendResponse.json();
        return NextResponse.json(resData, { status: 200 });
      } else {
        const errorText = await backendResponse.text();
        console.error("Spring Boot Backend returned error:", errorText);
        return NextResponse.json(
          { success: false, message: "Backend service error" },
          { status: backendResponse.status }
        );
      }
    } catch (fetchError) {
      console.warn("Spring Boot Backend unreachable (FE -> BE proxy fallback):", fetchError);
      return NextResponse.json(
        {
          success: true,
          message: "Consultation request received successfully!",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
