// バクソク内容証明LPの修正指示書(コピー修正・セクション統合)が反映されているかを、
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

describe("1. ファーストビュー", () => {
  const hero = block("hero");

  test("メインキャッチは「e内容証明を爆速送付」", () => {
    assert.equal(text(block("hero-catch")), "e内容証明を爆速送付");
    assert.ok(!pageText.includes("その入力、バクソクに。"));
  });

  test("サブコピーは機能の説明(使いづらさ・自動化・高速送付)", () => {
    const desc = text(block("hero-description"));
    assert.ok(!desc.includes("書面に向き合う時間を、取り戻す。"));
    assert.match(desc, /使いづらく手間のかかる/);
    assert.match(desc, /入力作業と画面遷移/);
    assert.match(desc, /自動化/);
    assert.match(desc, /すばやく送付/);
  });

  test("価格は11,800円(税込)で、9,800円はどこにも残っていない", () => {
    assert.match(text(hero), /11,800円（税込）/);
    assert.ok(!html.includes("9,800") && !html.includes("9800"));
    assert.match(html, /"price":11800/);
  });

  test("所要時間は「入力開始から文書確認まで約60秒」で注記は維持", () => {
    const note = text(block("speed-note"));
    assert.match(note, /入力開始から文書確認まで約60秒※/);
    assert.ok(!note.includes("30秒"));
    assert.match(
      text(block("hero-bottom")),
      /記事執筆者による実測値です。環境・文書・宛先数などにより所要時間は異なります。/
    );
  });

  test("OGPの旧キャッチも差し替わっている", () => {
    assert.ok(!html.includes("書面に向き合う時間を、取り戻す"));
    assert.match(
      html,
      /property="og:title" content="バクソク内容証明 \| e内容証明を爆速送付"/
    );
  });
});

describe("2. ターゲット紹介・課題提起", () => {
  const problem = block("problem-section");

  test("ターゲット帯は単独セクションでなく課題提起に統合されている", () => {
    assert.ok(!html.includes("audience-strip"));
    assert.ok(!pageText.includes("内容証明を、日々の仕事に使う方へ。"));
    assert.match(problem, /class="audience-box"/);
  });

  test("「こんな方におすすめ」と対象者4種が載っている", () => {
    const audience = text(block("audience-box"));
    assert.match(audience, /こんな方におすすめ/);
    for (const who of ["弁護士", "司法書士", "行政書士", "企業の法務部門"]) {
      assert.ok(audience.includes(who), `${who} がありません`);
    }
  });

  test("見出しは「e内容証明、使いづらくないですか？」", () => {
    assert.equal(h2(problem), "e内容証明、使いづらくないですか？");
  });

  test("説明文は1通約7分・積み重なって何時間・実務家ほど負担大", () => {
    const desc = text(
      problem.match(/<p class="section-description">([\s\S]*?)<\/p>/)[1]
    );
    assert.ok(!desc.includes("一つひとつは小さな作業"));
    // 数値はnote記事(販売ページ)の記載どおり。実測とは書かれていないので「実測」と付けない
    assert.match(desc, /1通送るのに約7分/);
    assert.match(desc, /30分かかることもあります/);
    assert.match(desc, /10通送れば、それだけで1時間を超えます/);
    assert.ok(!desc.includes("実測"));
    assert.match(desc, /日常的に送る実務家ほど/);
  });

  test("右側の課題一覧はそのまま", () => {
    const list = text(block("problem-list"));
    for (const item of [
      "毎回、同じ住所を打ち直す。",
      "差出人も、以前送った相手も、また最初から。",
      "入力エラーで、行ったり来たり。",
      "全角・半角、書式の確認、画面の切り替え。",
      "宛先の数だけ、同じ操作。",
      "複数の相手方への差出しで、手間が積み重なる。",
    ]) {
      assert.ok(list.includes(item), `${item} がありません`);
    }
  });
});

describe("3. 機能紹介", () => {
  const features = block("features-section");

  test("見出しは「バクソク内容証明なら、たった3作業・約1分」", () => {
    assert.equal(h2(features), "バクソク内容証明なら、たった3作業・約1分");
  });

  test("機能カード4枚は維持", () => {
    assert.equal((features.match(/class="feature-card /g) ?? []).length, 4);
    assert.match(text(features), /住所は「入力」から「選択」へ。/);
  });
});

describe("4. デモ動画(変更なし)", () => {
  test("見出し・動画・説明文はそのまま", () => {
    const demo = block("demo-section");
    assert.equal(h2(demo), "実際の操作を、動画でチェック。");
    assert.match(demo, /demo-operation\.mp4/);
    assert.match(
      text(demo),
      /入力支援を開始して、確認画面へ。実際のアプリの動きをご覧ください。/
    );
  });
});

describe("5. 操作フロー", () => {
  const how = block("how-section");

  test("見出しは「実際の作業フロー」", () => {
    assert.equal(h2(how), "実際の作業フロー");
  });

  test("3ステップの説明は維持", () => {
    const t = text(how);
    for (const step of [
      "文書と宛先を準備",
      "入力支援をスタート",
      "確認して、差し出す",
    ]) {
      assert.ok(t.includes(step), `${step} がありません`);
    }
  });
});

describe("6. 安全性・確認作業", () => {
  const security = block("security-section");
  const t = text(security);

  test("見出しは「文書確認と決済はご自身で」", () => {
    assert.equal(h2(security), "文書確認と決済はご自身で");
    assert.ok(!t.includes("大事なところで止まる"));
  });

  test("自動化の範囲と利用者が行う作業が明記されている", () => {
    assert.match(t, /入力作業・画面遷移はアプリが自動で進める/);
    assert.match(t, /文書確認・差出し・決済は利用者ご自身で行う/);
  });

  test("生成AI不使用・ローカル処理・それによる安全性が明記されている", () => {
    assert.match(t, /生成AIは使用せず/);
    assert.match(t, /文書の読み込み・規定チェックはPC内（ローカル環境）で処理/);
    assert.match(t, /PC内で処理するため、機密性の高い書面も安心して扱えます/);
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
