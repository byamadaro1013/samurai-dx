export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // "<" をエスケープして、文字列中の </script> でタグが閉じないようにする
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
