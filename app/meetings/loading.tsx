export default function MeetingsLoading() {
  return (
    <section className="bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="animate-pulse">
          <div className="h-8 w-64 rounded bg-slate-200"></div>

          <div className="mt-4 h-4 w-96 max-w-full rounded bg-slate-200"></div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="h-5 w-32 rounded bg-slate-200"></div>
                <div className="mt-4 h-6 w-48 rounded bg-slate-200"></div>
                <div className="mt-3 h-4 w-40 rounded bg-slate-200"></div>
                <div className="mt-2 h-4 w-36 rounded bg-slate-200"></div>
                <div className="mt-6 h-10 w-28 rounded bg-slate-200"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
