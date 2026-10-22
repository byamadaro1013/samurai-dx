"""Generate article illustration SVGs for バクソク内容証明 articles.

Usage: python3 scripts/bakusoku-article-images.py public/assets/bakusoku/articles
"""
import os
import sys
from html import escape

OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)

INK = "#1d292c"
MUTED = "#657071"
RED = "#cf3927"
RED_SOFT = "#fbe7dd"
GREEN = "#297162"
GREEN_SOFT = "#e3eee8"
LINE = "#d6d8cd"
SOFT = "#f0eee7"
PAPER = "#f8f6f1"
WHITE = "#ffffff"
FONT = "'Noto Sans JP','Hiragino Kaku Gothic ProN','Yu Gothic',Meiryo,sans-serif"


def svg(w, h, body, title):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" '
        f'role="img" aria-label="{escape(title)}" font-family="{FONT}">\n'
        f"<title>{escape(title)}</title>\n"
        f'<rect width="{w}" height="{h}" rx="16" fill="{PAPER}"/>\n'
        f"{body}\n</svg>\n"
    )


def t(x, y, s, size=22, fill=INK, weight=400, anchor="start"):
    return (
        f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" font-weight="{weight}" '
        f'text-anchor="{anchor}">{escape(s)}</text>'
    )


def r(x, y, w, h, fill=WHITE, stroke=LINE, rx=10, sw=2, extra=""):
    return (
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" '
        f'stroke="{stroke}" stroke-width="{sw}" {extra}/>'
    )


def lines(x, y, w, n, gap=14, color="#c9cdc4"):
    return "".join(
        f'<rect x="{x}" y="{y + i * gap}" width="{w if i % 4 != 3 else w * 0.6}" height="5" rx="2.5" fill="{color}"/>'
        for i in range(n)
    )


def check(cx, cy, ok=True, size=26):
    if ok:
        return (
            f'<circle cx="{cx}" cy="{cy}" r="{size / 2}" fill="{GREEN}"/>'
            f'<path d="M{cx - size * 0.22} {cy} l{size * 0.15} {size * 0.15} l{size * 0.27} -{size * 0.3}" '
            f'stroke="{WHITE}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
        )
    d = size * 0.18
    return (
        f'<circle cx="{cx}" cy="{cy}" r="{size / 2}" fill="{RED}"/>'
        f'<path d="M{cx - d} {cy - d} L{cx + d} {cy + d} M{cx + d} {cy - d} L{cx - d} {cy + d}" '
        f'stroke="{WHITE}" stroke-width="3.5" stroke-linecap="round"/>'
    )


def arrow(x1, y1, x2, y2, color=MUTED):
    import math

    a = math.atan2(y2 - y1, x2 - x1)
    hx1 = x2 - 12 * math.cos(a - 0.5)
    hy1 = y2 - 12 * math.sin(a - 0.5)
    hx2 = x2 - 12 * math.cos(a + 0.5)
    hy2 = y2 - 12 * math.sin(a + 0.5)
    return (
        f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="3" stroke-linecap="round"/>'
        f'<path d="M{hx1:.1f} {hy1:.1f} L{x2} {y2} L{hx2:.1f} {hy2:.1f}" stroke="{color}" stroke-width="3" '
        f'fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    )


def write(name, content):
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as f:
        f.write(content)


HATCH = (
    f'<defs><pattern id="hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">'
    f'<rect width="10" height="10" fill="{RED_SOFT}"/><line x1="0" y1="0" x2="0" y2="10" stroke="#f1b9a6" stroke-width="4"/>'
    f"</pattern></defs>"
)


def dialog(w, _h, message_lines, title):
    """Neutral error message box (an illustration, not a copy of any real screen)."""
    h = 140 + len(message_lines) * 36 + 46 + 70
    body = [r(40, 30, w - 80, h - 60, WHITE, LINE, 14)]
    body.append(f'<rect x="40" y="30" width="{w - 80}" height="52" rx="14" fill="{SOFT}"/>')
    body.append(f'<rect x="40" y="68" width="{w - 80}" height="14" fill="{SOFT}"/>')
    body.append(f'<line x1="40" y1="82" x2="{w - 40}" y2="82" stroke="{LINE}" stroke-width="2"/>')
    body.append(t(66, 64, "エラー表示のイメージ", 18, MUTED, 700))
    body.append(check(92, 130, ok=False, size=40))
    y = 128
    for line in message_lines:
        body.append(t(130, y, line, 23, INK, 700))
        y += 36
    by = y + 4
    body.append(r(w - 210, by, 140, 46, RED, RED, 8, 0))
    body.append(t(w - 140, by + 31, "OK", 20, WHITE, 700, "middle"))
    return svg(w, h, "".join(body), title)


# 01 余白
def yohaku():
    w, h = 720, 470
    b = [HATCH]
    # portrait A4 210x297 at 1px/mm
    px, py, pw, ph = 70, 90, 210, 297
    b.append(t(px + pw / 2, 64, "横書き(A4縦置き)", 22, INK, 700, "middle"))
    b.append(r(px, py, pw, ph, WHITE, LINE, 4))
    b.append(f'<rect x="{px + 2}" y="{py + ph - 70}" width="{pw - 4}" height="68" fill="url(#hatch)"/>')
    b.append(lines(px + 15, py + 18, pw - 30, 14, 13.5))
    b.append(t(px + pw / 2, py + ph - 30, "下 7cm以上", 22, RED, 700, "middle"))
    b.append(t(px + pw + 14, py + 22, "上・左・右", 17, MUTED))
    b.append(t(px + pw + 14, py + 44, "1.5cm以上", 17, MUTED))
    # landscape
    lx, ly, lw, lh = 400, 140, 297, 210
    b.append(t(lx + lw / 2, 64, "縦書き(A4横置き)", 22, INK, 700, "middle"))
    b.append(r(lx, ly, lw, lh, WHITE, LINE, 4))
    b.append(f'<rect x="{lx + 2}" y="{ly + 2}" width="68" height="{lh - 4}" fill="url(#hatch)"/>')
    for i in range(14):
        x = lx + lw - 20 - i * 14.5
        hh = lh - 30 if i % 4 != 3 else (lh - 30) * 0.6
        b.append(f'<rect x="{x}" y="{ly + 15}" width="5" height="{hh}" rx="2.5" fill="#c9cdc4"/>')
    b.append(t(lx + 35, ly + lh / 2 - 6, "左", 22, RED, 700, "middle"))
    b.append(t(lx + 35, ly + lh / 2 + 22, "7cm", 22, RED, 700, "middle"))
    b.append(t(lx + 35, ly + lh / 2 + 46, "以上", 18, RED, 700, "middle"))
    b.append(t(lx + lw / 2, ly + lh + 34, "上・下・右 1.5cm以上", 17, MUTED, 400, "middle"))
    b.append(t(w / 2, h - 22, "赤い部分に文字が1字でも入るとエラーになります", 19, INK, 400, "middle"))
    write("yohaku-margins.svg", svg(w, h, "".join(b), "e内容証明の余白の決まり。横書きは下7cm以上、縦書きは左7cm以上、ほかは1.5cm以上"))


# 共通: メモ帳経由で作り直す3ステップ
def rebuild_flow():
    w, h = 720, 300
    b = []
    steps = [
        ("1", ["雛形を", "ダウンロードし直す"]),
        ("2", ["本文をメモ帳に貼り", "書式を消す"]),
        ("3", ["雛形に貼って", ".docxで保存"]),
    ]
    bw, gap, top = 196, 36, 70
    left = (w - (bw * 3 + gap * 2)) / 2
    b.append(t(w / 2, 46, "迷ったら、雛形から作り直す", 23, INK, 700, "middle"))
    for i, (n, ls) in enumerate(steps):
        x = left + i * (bw + gap)
        b.append(r(x, top, bw, 170, WHITE, LINE, 14))
        b.append(f'<circle cx="{x + bw / 2}" cy="{top + 42}" r="22" fill="{RED}"/>')
        b.append(t(x + bw / 2, top + 50, n, 22, WHITE, 700, "middle"))
        for j, line in enumerate(ls):
            b.append(t(x + bw / 2, top + 104 + j * 32, line, 20, INK, 700, "middle"))
        if i < 2:
            b.append(arrow(x + bw + 6, top + 85, x + bw + gap - 6, top + 85))
    b.append(t(w / 2, h - 22, "どのエラーでも、最後はこれで直ることが多い", 17, MUTED, 400, "middle"))
    write("rebuild-flow.svg", svg(w, h, "".join(b), "エラーが直らないときの作り直し手順。雛形をダウンロードし直し、本文をメモ帳に貼って書式を消し、雛形に貼って.docxで保存する"))


# 11 使えない文字の置き換え
def moji_replace():
    w, h = 720, 400
    pairs = [("①", "(1)"), ("㈱", "(株)"), ("㎡", "平方メートル"), ("Ⅱ", "II"), ("髙", "高"), ("﨑", "崎")]
    b = [t(w / 2, 46, "使えない文字は、こう置き換える", 23, INK, 700, "middle")]
    cw, ch, gx, gy = 300, 82, 40, 20
    left = (w - (cw * 2 + gx)) / 2
    for i, (a, c) in enumerate(pairs):
        col, row = i % 2, i // 2
        x = left + col * (cw + gx)
        y = 72 + row * (ch + gy)
        b.append(r(x, y, cw, ch, WHITE, LINE, 12))
        b.append(f'<rect x="{x + 16}" y="{y + 15}" width="62" height="52" rx="8" fill="{RED_SOFT}"/>')
        b.append(t(x + 47, y + 52, a, 30, RED, 700, "middle"))
        b.append(arrow(x + 92, y + ch / 2, x + 130, y + ch / 2))
        b.append(t(x + 146, y + 52, c, 26 if len(c) < 5 else 22, GREEN, 700))
    b.append(t(w / 2, h - 18, "〒・※・澤・齋は使えます", 18, MUTED, 400, "middle"))
    write("moji-replace.svg", svg(w, h, "".join(b), "使えない文字の置き換え例。①は(1)、㈱は(株)、㎡は平方メートル、ⅡはII、髙は高、﨑は崎"))


# 12 JISの範囲
def jis_levels():
    w, h = 720, 430
    b = [t(w / 2, 46, "e内容証明で使える文字の範囲", 23, INK, 700, "middle")]
    rows = [
        (True, "JIS第1水準", "よく使う漢字・かな・記号"),
        (True, "JIS第2水準", "人名・地名の漢字など(澤・齋も可)"),
        (False, "第3・第4水準", "例: 﨑"),
        (False, "機種依存文字", "例: ① ㈱ ㎡ Ⅱ 髙"),
        (False, "外字", "事務所で作った字"),
    ]
    y = 70
    for ok, name, note in rows:
        fill = GREEN_SOFT if ok else RED_SOFT
        b.append(r(60, y, 600, 54, fill, "none", 10, 0))
        b.append(check(92, y + 27, ok, 28))
        b.append(t(120, y + 35, name, 21, INK, 700))
        b.append(t(290, y + 35, note, 19, MUTED))
        y += 62
    b.append(t(w / 2, h - 18, "緑の範囲だけ使える。赤はエラーになる", 18, MUTED, 400, "middle"))
    write("jis-levels.svg", svg(w, h, "".join(b), "e内容証明で使えるのはJIS第1・第2水準の文字だけ。第3・第4水準、機種依存文字、外字は使えない"))


# 13 図形
def zukei():
    w, h = 720, 400
    b = [t(w / 2, 46, "e内容証明の文書に入れられるもの", 23, INK, 700, "middle")]
    # OK column
    b.append(r(40, 72, 300, 290, GREEN_SOFT, "none", 14, 0))
    b.append(check(76, 106, True, 32))
    b.append(t(104, 114, "入れてよい", 22, GREEN, 700))
    b.append(r(70, 140, 240, 196, WHITE, LINE, 6))
    b.append(lines(90, 162, 200, 9, 16))
    b.append(t(190, 330, "文字(太字・斜体まで)", 17, INK, 700, "middle"))
    # NG column
    b.append(r(380, 72, 300, 290, RED_SOFT, "none", 14, 0))
    b.append(check(416, 106, False, 32))
    b.append(t(444, 114, "入れるとエラー", 22, RED, 700))
    for i, item in enumerate(["表", "画像", "図形・テキストボックス", "ワードアート・罫線", "ページ番号・透かし"]):
        b.append(t(410, 168 + i * 40, "・" + item, 20, INK))
    write("zukei-ok-ng.svg", svg(w, h, "".join(b), "e内容証明の文書に入れてよいのは文字だけ。表、画像、図形、テキストボックス、ワードアート、罫線、ページ番号、透かしはエラーになる"))


# 14 文字の重なり
def kasanari():
    w, h = 720, 400
    b = [t(w / 2, 46, "行間を詰めすぎると、文字がぶつかる", 23, INK, 700, "middle")]
    b.append(r(40, 72, 300, 170, WHITE, LINE, 12))
    b.append(check(70, 102, True, 28))
    b.append(t(94, 110, "雛形のまま", 20, GREEN, 700))
    b.append(t(66, 158, "通知書の本文です。", 24, INK))
    b.append(t(66, 200, "期限までにご連絡を。", 24, INK))
    b.append(r(380, 72, 300, 170, WHITE, LINE, 12))
    b.append(check(410, 102, False, 28))
    b.append(t(434, 110, "行間「固定値」で詰めた", 20, RED, 700))
    b.append(t(406, 168, "通知書の本文です。", 24, INK))
    b.append(t(406, 184, "期限までにご連絡を。", 24, RED))
    b.append(t(w / 2, 286, "ほかに重なりやすい設定", 19, MUTED, 700, "middle"))
    chips = ["文字間隔を詰める", "ルビ・割注", "フォントの混在"]
    cw = 196
    left = (w - (cw * 3 + 24 * 2)) / 2
    for i, c in enumerate(chips):
        x = left + i * (cw + 24)
        b.append(r(x, 306, cw, 50, SOFT, "none", 25, 0))
        b.append(t(x + cw / 2, 338, c, 19, INK, 700, "middle"))
    write("kasanari.svg", svg(w, h, "".join(b), "行間を固定値で詰めると上下の行の文字が重なる。文字間隔、ルビや割注、フォントの混在も重なりの原因になりやすい"))


def pages_row(n, bad_index, blank=False):
    pw, ph, gap = 84, 118, 16
    left = (720 - (pw * n + gap * (n - 1))) / 2
    out = []
    for i in range(n):
        x = left + i * (pw + gap)
        bad = i == bad_index
        out.append(r(x, 92, pw, ph, RED_SOFT if bad else WHITE, RED if bad else LINE, 6, 3 if bad else 2))
        if not (bad and blank):
            out.append(lines(x + 12, 108, pw - 24, 6, 13, "#e6a99a" if bad else "#c9cdc4"))
        out.append(t(x + pw / 2, 240, f"{i + 1}", 20, RED if bad else MUTED, 700, "middle"))
    return out, left, pw, gap


# 15 白紙
def hakushi():
    w, h = 720, 380
    b = [t(w / 2, 50, "最後に白紙のページができるとエラー", 23, INK, 700, "middle")]
    p, left, pw, gap = pages_row(4, 3, blank=True)
    b += p
    x = left + 3 * (pw + gap)
    b.append(t(x + pw / 2, 160, "白紙", 22, RED, 700, "middle"))
    b.append(t(w / 2, 290, "原因になりやすいもの", 19, MUTED, 700, "middle"))
    b.append(t(w / 2, 326, "末尾の空行 / 改ページ / セクション区切り", 20, INK, 700, "middle"))
    b.append(t(w / 2, 356, "最後の行がページの下ぎりぎり", 20, INK, 700, "middle"))
    write("hakushi.svg", svg(w, h, "".join(b), "文書の最後に白紙のページがあるとエラーになる。末尾の空行、改ページ、セクション区切り、最後の行がページの下ぎりぎりなことが原因になりやすい"))


# 16 ページ数
def page_over():
    w, h = 720, 340
    b = [t(w / 2, 50, "e内容証明は5ページまで", 23, INK, 700, "middle")]
    p, left, pw, gap = pages_row(6, 5)
    b += p
    x5 = left + 5 * (pw + gap)
    b.append(f'<line x1="{x5 - gap / 2}" y1="80" x2="{x5 - gap / 2}" y2="225" stroke="{RED}" stroke-width="3" stroke-dasharray="6 6"/>')
    b.append(r(x5 + 8, 136, pw - 16, 34, RED, RED, 6, 0))
    b.append(t(x5 + pw / 2, 160, "エラー", 18, WHITE, 700, "middle"))
    b.append(t(w / 2, 292, "文字を小さくする・余白を狭くするのは規定違反。本文を削って収める", 17, MUTED, 400, "middle"))
    write("page-over.svg", svg(w, h, "".join(b), "e内容証明の文書は5ページまで。6ページ目があるとページ数オーバーのエラーになる"))


# 17 アップロード
def upload_check():
    w, h = 720, 460
    b = [t(w / 2, 46, "アップロード前のチェック", 23, INK, 700, "middle")]
    items = [
        ("ファイルのサイズ", "3MBまで"),
        ("形式", "雛形から作った .docx"),
        ("ファイル名", "全角20文字(半角40文字)以内"),
        ("保存場所のパス", "全角100文字(半角200文字)以内"),
        ("パスワード", "設定しない"),
        ("ウイルス", "検知されていない"),
    ]
    y = 70
    for k, v in items:
        b.append(r(60, y, 600, 52, WHITE, LINE, 10))
        b.append(check(90, y + 26, True, 26))
        b.append(t(116, y + 34, k, 19, MUTED, 700))
        b.append(t(300, y + 34, v, 20, INK, 700))
        y += 60
    write("upload-check.svg", svg(w, h, "".join(b), "アップロード前のチェック項目。3MBまで、雛形から作った.docx、ファイル名は全角20文字以内、保存場所のパスは全角100文字以内、パスワードなし、ウイルスなし"))


# 18 雛形の種類
def hinagata_types():
    w, h = 720, 340
    b = [t(w / 2, 46, "日本郵便の雛形は3種類", 23, INK, 700, "middle")]
    cw = 200
    left = (w - (cw * 3 + 24 * 2)) / 2
    cards = [
        ("A4縦型・横書き", "portrait", "1通ずつ送る"),
        ("A4横型・縦書き", "landscape", "1通ずつ送る"),
        ("差込差出し用(ZIP)", "zip", "同じ文面を複数の宛先へ"),
    ]
    for i, (name, kind, use) in enumerate(cards):
        x = left + i * (cw + 24)
        b.append(r(x, 70, cw, 240, WHITE, LINE, 14))
        cx = x + cw / 2
        if kind == "portrait":
            b.append(r(cx - 38, 92, 76, 106, WHITE, INK, 4, 2))
            b.append(lines(cx - 26, 106, 52, 6, 12))
        elif kind == "landscape":
            b.append(r(cx - 53, 108, 106, 76, WHITE, INK, 4, 2))
            for j in range(6):
                b.append(f'<rect x="{cx + 38 - j * 13}" y="118" width="5" height="{56 if j % 4 != 3 else 34}" rx="2.5" fill="#c9cdc4"/>')
        else:
            b.append(r(cx - 30, 98, 66, 92, WHITE, INK, 4, 2))
            b.append(r(cx - 40, 108, 66, 92, WHITE, INK, 4, 2))
            b.append(t(cx - 7, 160, "CSV", 16, MUTED, 700, "middle"))
        b.append(t(cx, 240, name, 18 if len(name) > 9 else 20, INK, 700, "middle"))
        b.append(t(cx, 274, use, 15 if len(use) > 9 else 17, MUTED, 400, "middle"))
    write("hinagata-types.svg", svg(w, h, "".join(b), "日本郵便の雛形は3種類。A4縦型・横書き、A4横型・縦書き、同じ文面を複数の宛先に送る差込差出し用"))


# 19 イメージファイル作成
def image_error():
    w, h = 720, 420
    b = [t(w / 2, 46, "表示によって、最初にやることが違う", 23, INK, 700, "middle")]
    b.append(r(40, 72, 300, 300, WHITE, LINE, 14))
    b.append(t(190, 112, "「処理を中断しました」", 19, INK, 700, "middle"))
    b.append(t(190, 146, "混雑などの一時的なもの", 17, MUTED, 400, "middle"))
    b.append(arrow(190, 166, 190, 214))
    b.append(r(70, 226, 240, 70, GREEN_SOFT, "none", 10, 0))
    b.append(t(190, 258, "時間をおいて", 19, GREEN, 700, "middle"))
    b.append(t(190, 284, "再申込み", 19, GREEN, 700, "middle"))
    b.append(r(380, 72, 300, 300, WHITE, LINE, 14))
    b.append(t(530, 106, "「イメージファイルの", 18, INK, 700, "middle"))
    b.append(t(530, 132, "作成ができませんでした」", 18, INK, 700, "middle"))
    b.append(t(530, 158, "「文書異常」", 18, INK, 700, "middle"))
    b.append(arrow(530, 172, 530, 200))
    b.append(r(410, 206, 240, 52, GREEN_SOFT, "none", 10, 0))
    b.append(t(530, 240, "まず再申込み", 19, GREEN, 700, "middle"))
    b.append(t(530, 284, "繰り返すなら", 16, MUTED, 400, "middle"))
    b.append(arrow(530, 292, 530, 304))
    b.append(r(410, 308, 240, 52, RED_SOFT, "none", 10, 0))
    b.append(t(530, 342, "雛形から作り直す", 19, RED, 700, "middle"))
    write("image-error.svg", svg(w, h, "".join(b), "「処理を中断しました」は時間をおいて再申込み。「イメージファイルの作成ができませんでした」や「文書異常」は、まず再申込みし、繰り返すなら雛形から作り直す"))


# 20 ログイン
def login():
    w, h = 720, 380
    b = [t(w / 2, 46, "1つの会員IDで同時にログインはできない", 23, INK, 700, "middle")]

    def pc(x, label, state, ok):
        o = [r(x, 90, 200, 130, WHITE, INK, 8, 2.5)]
        o.append(f'<rect x="{x + 80}" y="220" width="40" height="18" fill="{INK}"/>')
        o.append(f'<rect x="{x + 50}" y="236" width="100" height="8" rx="4" fill="{INK}"/>')
        o.append(t(x + 100, 140, label, 18, MUTED, 700, "middle"))
        o.append(t(x + 100, 182, state, 20, GREEN if ok else RED, 700, "middle"))
        return o

    b += pc(60, "事務所のPC", "ログイン中", True)
    b += pc(460, "自宅のPC", "入れない", False)
    b.append(arrow(280, 155, 440, 155, RED))
    b.append(t(360, 138, "同じID", 17, RED, 700, "middle"))
    b.append(r(60, 280, 600, 64, GREEN_SOFT, "none", 12, 0))
    b.append(t(w / 2, 320, "使っている方の画面でログアウトしてから入り直す", 20, GREEN, 700, "middle"))
    write("login-same-id.svg", svg(w, h, "".join(b), "1つの会員IDで同時に複数の場所からログインはできない。使っている方の画面でログアウトしてから入り直す"))


# エラー表示のイメージ(公式資料・記事に記載のある文言のみ)
def dialogs():
    write("dialog-zukei.svg", dialog(720, 280, ["文字以外の図形等の情報があります。", "文字のみで作成してください。"],
                                     "エラー表示のイメージ: 文字以外の図形等の情報があります。文字のみで作成してください。"))
    write("dialog-kasanari.svg", dialog(720, 250, ["文字の重なりを検出しました。"],
                                        "エラー表示のイメージ: 文字の重なりを検出しました。"))
    write("dialog-hakushi.svg", dialog(720, 280, ["白紙のページがあります。", "白紙ページは削除してください。"],
                                       "エラー表示のイメージ: 白紙のページがあります。白紙ページは削除してください。"))
    write("dialog-page.svg", dialog(720, 280, ["ページ数オーバーです。", "5ページまでで作成してください。"],
                                    "エラー表示のイメージ: ページ数オーバーです。5ページまでで作成してください。"))
    write("dialog-upload.svg", dialog(720, 280, ["アップロードされたファイルに問題が", "発生したため、処理を中止しました。"],
                                      "エラー表示のイメージ: アップロードされたファイルに問題が発生したため、処理を中止しました。"))
    write("dialog-image.svg", dialog(720, 280, ["イメージファイルの作成ができませんでした。", "お手数ですが、もう一度やりなおしてください。"],
                                     "エラー表示のイメージ: イメージファイルの作成ができませんでした。お手数ですが、もう一度やりなおしてください。"))


for fn in [yohaku, rebuild_flow, moji_replace, jis_levels, zukei, kasanari, hakushi, page_over,
           upload_check, hinagata_types, image_error, login, dialogs]:
    fn()
print("ok", sorted(os.listdir(OUT)))
