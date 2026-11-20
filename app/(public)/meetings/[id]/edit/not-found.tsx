import Link from "next/link";

export default function MeetingNotFound() {
  return (
    <section className="flex min-h-[50vh] items-center justify-center bg-slate-50 px-6 py-12">
      <div className="max-w-lg rounded-lg bg-white p-8 text-center shadow">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">
          Meeting Not Found
        </h1>

        <p className="mb-6 text-slate-600">
          Sorry, the meeting you are looking for does not exist or may have been
          removed.
        </p>

        <Link
          href="/meetings"
          className="inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Back to Meetings
        </Link>
      </div>
    </section>
  );
}
