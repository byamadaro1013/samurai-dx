"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Icon } from "./Icon";

type Media = { kind: "video" } | { kind: "image"; src: string; title: string };
const MediaContext = createContext<((media: Media) => void) | null>(null);

export function MediaProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<Media | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (active && !node.open) node.showModal();
    if (!active && node.open) node.close();
    document.body.classList.toggle(
      "dialog-open",
      Boolean(document.querySelector("dialog[open]"))
    );
  }, [active]);

  return (
    <MediaContext.Provider
      value={(media) => {
        document.querySelector<HTMLVideoElement>("#demo-video")?.pause();
        setActive(media);
      }}
    >
      {children}
      <dialog
        ref={dialog}
        className={`media-dialog${active?.kind === "image" ? "image-dialog" : ""}`}
        aria-labelledby="media-title"
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
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
          <h2 id="media-title">
            {active?.kind === "image" ? active.title : "実際の操作を見る"}
          </h2>
          <button
            className="dialog-close"
            type="button"
            aria-label="閉じる"
            onClick={() => dialog.current?.close()}
          >
            <Icon name="close" />
          </button>
        </div>
        {active?.kind === "video" && (
          <>
            <div className="video-frame">
              <iframe
                src="https://www.youtube-nocookie.com/embed/yRJg6ViONR8?rel=0&autoplay=1"
                title="バクソク内容証明 — 実際の使用の様子"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <p className="dialog-note">
              再生できない場合は{" "}
              <a
                href="https://www.youtube.com/watch?v=yRJg6ViONR8"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTubeで見る ↗
              </a>
            </p>
          </>
        )}
        {active?.kind === "image" && (
          <div className="lightbox-content">
            <img src={active.src} alt={active.title} />
          </div>
        )}
      </dialog>
    </MediaContext.Provider>
  );
}

export function VideoButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const open = useContext(MediaContext);
  if (!open) throw new Error("VideoButton requires MediaProvider");
  return (
    <button
      type="button"
      className={className}
      onClick={() => open({ kind: "video" })}
    >
      {children}
    </button>
  );
}

export function ImageButton({
  children,
  className,
  src,
  title,
  label,
}: {
  children: ReactNode;
  className?: string;
  src: string;
  title: string;
  label?: string;
}) {
  const open = useContext(MediaContext);
  if (!open) throw new Error("ImageButton requires MediaProvider");
  return (
    <button
      type="button"
      className={className}
      aria-label={label ?? title}
      onClick={() => open({ kind: "image", src, title })}
    >
      {children}
    </button>
  );
}
