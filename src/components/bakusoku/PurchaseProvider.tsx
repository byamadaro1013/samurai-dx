"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  checkoutInputSchema,
  type CheckoutInput,
} from "@/const/bakusoku/checkout-input";
import {
  CHECKOUT_IMPLEMENTED,
  formatJPY,
  product,
} from "@/const/bakusoku/site";
import { Icon } from "./Icon";

const PURCHASE_HASH = "#purchase";
const PurchaseContext = createContext<(() => void) | null>(null);
type FieldErrors = Partial<Record<keyof CheckoutInput, string>>;

function syncScrollLock() {
  document.body.classList.toggle(
    "dialog-open",
    Boolean(document.querySelector("dialog[open]"))
  );
}

export function PurchaseProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<"input" | "review">("input");
  const [officeName, setOfficeName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [draft, setDraft] = useState<CheckoutInput | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const officeInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const requestId = useRef<string | null>(null);

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
    syncScrollLock();
  }, [open]);

  useEffect(() => {
    if (open && stage === "review") heading.current?.focus();
  }, [open, stage]);

  // 記事本文の「#purchase」リンク(例: バクソクで5分で送る)でもモーダルを開く。
  // JSが無い環境ではLPへ遷移し、LP側でハッシュを見て開く。
  useEffect(() => {
    if (window.location.hash === PURCHASE_HASH) {
      history.replaceState(null, "", location.pathname + location.search);
      setOpen(true);
    }
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.hash !== PURCHASE_HASH || link.origin !== location.origin)
        return;
      event.preventDefault();
      setOpen(true);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  function resetAndClose() {
    setOpen(false);
    setStage("input");
    setOfficeName("");
    setCustomerName("");
    setEmail("");
    setAcceptedTerms(false);
    setErrors({});
    setDraft(null);
    setMessage("");
    setBusy(false);
    requestId.current = null;
    syncScrollLock();
  }

  function review(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = checkoutInputSchema.safeParse({
      officeName,
      customerName,
      email,
      acceptedTerms,
    });
    if (!result.success) {
      const next: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof CheckoutInput;
        next[field] ??= issue.message;
      }
      setErrors(next);
      if (next.officeName) officeInput.current?.focus();
      else if (next.customerName) nameInput.current?.focus();
      else if (next.email) emailInput.current?.focus();
      return;
    }
    setErrors({});
    setDraft(result.data);
    setStage("review");
    requestId.current = crypto.randomUUID();
  }

  async function startCheckout() {
    if (!CHECKOUT_IMPLEMENTED || !draft || busy) return;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/bakusoku/checkout", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": requestId.current ?? crypto.randomUUID(),
        },
        body: JSON.stringify(draft),
      });
      if (!response.ok) throw new Error("Checkout unavailable");
      const data: unknown = await response.json();
      if (
        typeof data !== "object" ||
        data === null ||
        !("checkoutUrl" in data) ||
        typeof data.checkoutUrl !== "string"
      )
        throw new Error("Invalid response");
      const target = new URL(data.checkoutUrl);
      if (target.origin !== "https://checkout.stripe.com")
        throw new Error("Invalid checkout origin");
      window.location.assign(target.href);
    } catch {
      setMessage(
        "購入手続きを開始できませんでした。しばらくしてからもう一度お試しください。"
      );
      setBusy(false);
    }
  }

  return (
    <PurchaseContext.Provider value={() => setOpen(true)}>
      {children}
      <dialog
        ref={dialog}
        className="media-dialog purchase-dialog"
        aria-labelledby="purchase-title"
        onClose={resetAndClose}
        onClick={(event) => {
          if (event.target !== event.currentTarget || busy) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            event.currentTarget.close();
        }}
      >
        <div className="dialog-head">
          <h2 id="purchase-title" ref={heading} tabIndex={-1}>
            {stage === "input" ? "バクソク内容証明を購入" : "購入内容の確認"}
          </h2>
          <button
            className="dialog-close"
            type="button"
            aria-label="購入画面を閉じる"
            onClick={() => dialog.current?.close()}
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="purchase-content">
          <div className="purchase-product">
            <div>
              <span className="purchase-product-name">{product.name}</span>
              <p>Windows（64bit）/ macOS・同一事務所で利用可能</p>
            </div>
            <span className="purchase-total">
              ¥{formatJPY(product.priceJpy)}
              <small>税込</small>
            </span>
          </div>
          {!CHECKOUT_IMPLEMENTED && (
            <p className="purchase-notice" role="status">
              現在は販売準備中です。入力内容は送信されず、決済も開始されません。
            </p>
          )}
          {stage === "input" ? (
            <form className="purchase-form" onSubmit={review} noValidate>
              <div className="form-field">
                <label htmlFor="office-name">
                  事務所名 <span>必須</span>
                </label>
                <input
                  ref={officeInput}
                  id="office-name"
                  name="officeName"
                  autoComplete="organization"
                  required
                  maxLength={200}
                  value={officeName}
                  onChange={(event) => setOfficeName(event.target.value)}
                  aria-invalid={Boolean(errors.officeName)}
                  aria-describedby={
                    errors.officeName ? "office-error" : undefined
                  }
                  placeholder="例：山田法律事務所"
                />
                {errors.officeName && (
                  <p id="office-error" className="field-error" role="alert">
                    {errors.officeName}
                  </p>
                )}
              </div>
              <div className="form-field">
                <label htmlFor="customer-name">
                  氏名 <span>必須</span>
                </label>
                <input
                  ref={nameInput}
                  id="customer-name"
                  name="customerName"
                  autoComplete="name"
                  required
                  maxLength={100}
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  aria-invalid={Boolean(errors.customerName)}
                  aria-describedby={
                    errors.customerName ? "name-error" : undefined
                  }
                  placeholder="例：山田 太郎"
                />
                {errors.customerName && (
                  <p id="name-error" className="field-error" role="alert">
                    {errors.customerName}
                  </p>
                )}
              </div>
              <div className="form-field">
                <label htmlFor="purchase-email">
                  メールアドレス <span>必須</span>
                </label>
                <input
                  ref={emailInput}
                  id="purchase-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : "email-hint"}
                  placeholder="office@example.com"
                />
                <p id="email-hint" className="field-hint">
                  決済完了後、このアドレスにダウンロードリンクをお送りします。
                </p>
                {errors.email && (
                  <p id="email-error" className="field-error" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
              <label className="terms-check">
                <input
                  type="checkbox"
                  required
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  aria-invalid={Boolean(errors.acceptedTerms)}
                  aria-describedby={
                    errors.acceptedTerms ? "terms-error" : undefined
                  }
                />
                <span>
                  <a
                    href={product.termsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    利用規約 ↗
                  </a>
                  を確認し、同意します。
                </span>
              </label>
              {errors.acceptedTerms && (
                <p id="terms-error" className="field-error" role="alert">
                  {errors.acceptedTerms}
                </p>
              )}
              <button className="button button-red button-wide" type="submit">
                購入内容を確認する <Icon name="arrow" />
              </button>
              <p className="purchase-privacy">
                ご購入時の情報は、決済と購入後のご案内に利用します。カード情報はStripeの決済画面で入力します。
              </p>
            </form>
          ) : (
            draft && (
              <div className="purchase-review">
                <dl>
                  <div>
                    <dt>事務所名</dt>
                    <dd>{draft.officeName}</dd>
                  </div>
                  <div>
                    <dt>氏名</dt>
                    <dd>{draft.customerName}</dd>
                  </div>
                  <div>
                    <dt>メールアドレス</dt>
                    <dd>{draft.email}</dd>
                  </div>
                  <div>
                    <dt>商品</dt>
                    <dd>
                      {product.name}
                      <br />
                      <small>Windows版（.exe）・Mac版（.dmg）</small>
                    </dd>
                  </div>
                  <div>
                    <dt>お支払い金額</dt>
                    <dd>
                      <strong>¥{formatJPY(product.priceJpy)}（税込）</strong>
                      <small>買い切り・郵便料金は別途</small>
                    </dd>
                  </div>
                </dl>
                <p className="purchase-review-note">
                  決済完了後、完了画面とメールでWindows版・Mac版のダウンロードリンクをお届けします。購入条件・返品等の取り扱いは利用規約をご確認ください。
                </p>
                {message && (
                  <p className="field-error" role="alert">
                    {message}
                  </p>
                )}
                <button
                  className="button button-red button-wide"
                  type="button"
                  disabled={!CHECKOUT_IMPLEMENTED || busy}
                  onClick={startCheckout}
                >
                  {busy
                    ? "決済画面を開いています…"
                    : CHECKOUT_IMPLEMENTED
                      ? "Stripe決済へ進む"
                      : "購入受付準備中"}
                  <Icon name="external" />
                </button>
                <button
                  className="purchase-back"
                  type="button"
                  disabled={busy}
                  onClick={() => {
                    setStage("input");
                    requestId.current = null;
                  }}
                >
                  入力内容を修正する
                </button>
              </div>
            )
          )}
        </div>
      </dialog>
    </PurchaseContext.Provider>
  );
}

export function PurchaseButton({
  children,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const open = useContext(PurchaseContext);
  if (!open) throw new Error("PurchaseButton requires PurchaseProvider");
  return (
    <button
      {...props}
      type="button"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) open();
      }}
    >
      {children}
    </button>
  );
}
