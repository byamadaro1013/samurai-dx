import { NextResponse, type NextRequest } from "next/server";
import { getFileUrl, getPaidOrder, isPlatform } from "@/lib/bakusoku/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function plain(status: number, message: string) {
  return new NextResponse(message, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

/** 決済済みのセッションIDを確認してから、exe/dmgの実ファイルへリダイレクトする */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string }> }
) {
  const { platform } = await params;
  if (!isPlatform(platform)) return plain(404, "ファイルが見つかりません。");

  const order = await getPaidOrder(
    request.nextUrl.searchParams.get("session_id")
  );
  if (!order)
    return plain(
      403,
      "ご購入を確認できませんでした。購入時のメールに記載のリンクから開いてください。"
    );

  const file = getFileUrl(platform);
  if (!file)
    return plain(
      503,
      "ダウンロードの準備中です。時間をおいてもう一度お試しください。"
    );
  return NextResponse.redirect(file, {
    status: 303,
    headers: { "Cache-Control": "no-store" },
  });
}
