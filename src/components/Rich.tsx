// "50% OFF" and *word* get the gradient highlight automatically
export default function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*|50% OFF)/g);
  return (
    <>
      {parts.map((p, i) =>
        p === "50% OFF" ? <span key={i} className="grad-text">{p}</span>
        : p.length > 2 && p.startsWith("*") && p.endsWith("*") ? <strong key={i} className="grad-text">{p.slice(1, -1)}</strong>
        : <span key={i}>{p}</span>
      )}
    </>
  );
}
