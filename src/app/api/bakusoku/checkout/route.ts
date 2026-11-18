import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Deliberate fail-closed boundary for this UI-only export.
 * Do not accept payments before webhook verification, order storage,
 * private file distribution and entitlement checks are implemented together.
 * Complete implementation contract: docs/requirements.md.
 * No request fields are parsed, stored or forwarded in this export.
 */
export async function POST() {
  return NextResponse.json(
    {
      error: {
        code: "CHECKOUT_NOT_READY",
        message: "現在は販売準備中です。購入手続きはまだ開始できません。",
      },
    },
    {
      status: 503,
      headers: { "Cache-Control": "no-store", "Retry-After": "3600" },
    }
  );
}
