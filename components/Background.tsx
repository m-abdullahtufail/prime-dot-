export default function Background() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div
        className="blob animate-blob left-[-12%] top-[-14%] size-[46rem]"
        style={{
          background:
            "radial-gradient(circle, rgba(229,22,44,0.32) 0%, rgba(229,22,44,0.12) 42%, transparent 70%)",
        }}
      />
      <div
        className="blob animate-blob-2 right-[-14%] top-[30%] size-[40rem]"
        style={{
          background:
            "radial-gradient(circle, rgba(110,11,20,0.5) 0%, rgba(110,11,20,0.16) 45%, transparent 72%)",
        }}
      />
      <div
        className="blob animate-blob bottom-[-18%] left-[22%] size-[44rem]"
        style={{
          background:
            "radial-gradient(circle, rgba(229,22,44,0.18) 0%, rgba(255,59,78,0.08) 40%, transparent 68%)",
        }}
      />
      <div className="grain" />
    </div>
  );
}
