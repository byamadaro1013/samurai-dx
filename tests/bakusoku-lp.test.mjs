// バクソク内容証明LPの価格・記事・ロゴ差し替え・記事一覧導線が反映されているかを、
// `next build` が書き出した静的HTMLで確かめる。実行: npm run build && npm test
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, test } from "node:test";

const appDir = join(import.meta.dirname, "..", ".next", "server", "app");
const lpFile = join(appDir, "bakusokunaiyoushoumei.html");

if (!existsSync(lpFile)) {
  throw new Error(
    "ビルド結果がありません。先に `npm run build` を実行してください。"
  );
}

const html = readFileSync(lpFile, "utf8");

// タグを除いて、改行・空白を詰めたテキストにする
const text = (fragment) =>
  fragment
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, "");

// class名を持つ要素(section / div / span / p)を、閉じタグまで含めて返す
function block(className) {
  const start = html.search(
    new RegExp(`<(section|div|span|p)[^>]*class="[^"]*\\b${className}\\b`)
  );
  assert.notEqual(start, -1, `${className} が見つかりません`);
  const tag = html.slice(start + 1).match(/^\w+/)[0];
  const re = new RegExp(`<${tag}\\b|</${tag}>`, "g");
  re.lastIndex = start;
  let depth = 0;
  for (let m; (m = re.exec(html)); ) {
    depth += m[0].startsWith("</") ? -1 : 1;
    if (depth === 0) return html.slice(start, re.lastIndex);
  }
  throw new Error(`${className} が閉じていません`);
}

const h2 = (fragment) => text(fragment.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)[1]);
const pageText = text(html.replace(/<script[\s\S]*?<\/script>/g, ""));

describe("価格", () => {
  test("価格は11,800円(税込)で、9,800円はどこにも残っていない", () => {
    assert.ok(!html.includes("9,800") && !html.includes("9800"));
    assert.match(html, /"price":11800/);
  });
});

describe("LP内の記事", () => {
  const articleFiles = readdirSync(join(appDir, "bakusokunaiyoushoumei"), {
    recursive: true,
  }).filter((f) => f.endsWith(".html"));

  test("記事ページがビルドされている", () => {
    assert.ok(articleFiles.length >= 12);
  });

  test("どの記事にも旧価格9,800円が残っておらず、価格表記は11,800円", () => {
    let withPrice = 0;
    for (const f of articleFiles) {
      const page = readFileSync(
        join(appDir, "bakusokunaiyoushoumei", f),
        "utf8"
      );
      assert.ok(!page.includes("9,800"), `${f} に9,800円が残っています`);
      if (page.includes("料金は11,800円(税込)")) withPrice++;
    }
    assert.equal(withPrice, 12);
  });
});

describe("ロゴとサイトアイコン", () => {
  const assetDir = join(
    import.meta.dirname,
    "..",
    "public",
    "assets",
    "bakusoku"
  );
  // PNGのIHDRから幅・高さ・カラータイプ(6 = RGBA)を読む
  const png = (name) => {
    const buf = readFileSync(join(assetDir, name));
    return {
      width: buf.readUInt32BE(16),
      height: buf.readUInt32BE(20),
      colorType: buf[25],
    };
  };
  const articleHtml = readFileSync(
    join(appDir, "bakusokunaiyoushoumei", "error.html"),
    "utf8"
  );

  test("ヘッダーとフッターは文字つきロゴ画像を使う(LP・記事ページとも)", () => {
    for (const page of [html, articleHtml]) {
      for (const area of ["site-header", "site-footer"]) {
        const el = page.match(
          new RegExp(`<(header|footer) class="${area}"[\\s\\S]*?</\\1>`)
        )[0];
        assert.match(
          el,
          /<img class="brand-logo" src="\/assets\/bakusoku\/logo.png"[^>]*alt="バクソク内容証明"/,
          `${area} にロゴ画像がありません`
        );
        assert.ok(
          !el.includes("brand-mark") && !el.includes("brand-word"),
          `${area} に旧ロゴが残っています`
        );
      }
    }
  });

  test("サイトアイコンはアイコンのみの画像を使う", () => {
    for (const page of [html, articleHtml]) {
      assert.match(
        page,
        /<link rel="icon" href="\/assets\/bakusoku\/icon-32.png" sizes="32x32" type="image\/png"\/>/
      );
      assert.match(
        page,
        /<link rel="icon" href="\/assets\/bakusoku\/icon-192.png" sizes="192x192" type="image\/png"\/>/
      );
      assert.match(
        page,
        /<link rel="apple-touch-icon" href="\/assets\/bakusoku\/apple-touch-icon.png"\/>/
      );
      assert.ok(!page.includes("favicon.svg"));
    }
  });

  test("画像は指定サイズで、ロゴとアイコンは背景が透過", () => {
    assert.deepEqual(png("icon-32.png"), {
      width: 32,
      height: 32,
      colorType: 6,
    });
    assert.deepEqual(png("icon-192.png"), {
      width: 192,
      height: 192,
      colorType: 6,
    });
    assert.deepEqual(png("apple-touch-icon.png"), {
      width: 180,
      height: 180,
      colorType: 2,
    });
    assert.deepEqual(png("logo.png"), {
      width: 885,
      height: 120,
      colorType: 6,
    });
  });
});

describe("記事一覧への導線", () => {
  const articleHtml = readFileSync(
    join(appDir, "bakusokunaiyoushoumei", "error.html"),
    "utf8"
  );
  const area = (page, re) => page.match(re)[0];
  const listLink = /<a href="\/bakusokunaiyoushoumei\/articles">記事一覧<\/a>/;

  test("ヘッダー(PCナビとスマホのメニュー)に記事一覧がある", () => {
    for (const page of [html, articleHtml]) {
      assert.match(
        area(page, /<nav class="desktop-nav"[\s\S]*?<\/nav>/),
        listLink
      );
      assert.match(
        area(page, /<nav class="mobile-nav"[\s\S]*?<\/nav>/),
        listLink
      );
    }
  });

  test("フッターに記事一覧がある", () => {
    for (const page of [html, articleHtml]) {
      assert.match(
        area(page, /<div class="footer-links">[\s\S]*?<\/div>/),
        listLink
      );
    }
  });

  test("記事一覧ページがビルドされ、記事へのリンクが並んでいる", () => {
    const list = readFileSync(
      join(appDir, "bakusokunaiyoushoumei", "articles.html"),
      "utf8"
    );
    const links =
      list.match(/href="\/bakusokunaiyoushoumei\/(?:error|moji)[^"]*"/g) ?? [];
    assert.ok(
      new Set(links).size >= 12,
      `記事リンクが${new Set(links).size}件しかありません`
    );
  });
});
