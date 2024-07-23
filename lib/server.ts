import { NextResponse } from "next/server";

export const UNAUTHORIZED_ERROR_RESPONSE = NextResponse.json(
  { error: "Unauthorized" },
  { status: 400 },
);
export const GENERIC_ERROR_RESPONSE = NextResponse.json(
  { error: "Something went wrong" },
  { status: 500 },
);
