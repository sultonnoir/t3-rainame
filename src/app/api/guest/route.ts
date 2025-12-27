// app/auth/anonymous/route.ts
import { auth } from "@/lib/auth";
import { type NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  await auth.api.signInAnonymous({
    headers: await headers(),
  });

  return NextResponse.redirect(new URL("/", request.url));
}
