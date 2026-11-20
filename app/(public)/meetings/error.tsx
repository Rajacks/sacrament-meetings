"use client";

import Link from "next/link";

type MeetingsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function MeetingsError({ error, reset }: MeetingsErrorProps) {
  return (
    <section className="flex min-h-[50vh] items-center justify-center bg-slate-50 px-6 py-12">
      <div className="max-w-lg rounded-lg bg-white p-8 text-center shadow">
        <h1 className="mb-4 text-3xl font-bold text-red-700">
          Something Went Wrong
        </h1>

        <p className="mb-6 text-slate-600">
          We encountered an unexpected error while loading the meetings. Please
          try again.
        </p>

        {process.env.NODE_ENV === "development" && (
          <p className="mb-4 break-words text-sm text-slate-500">
            {error.message}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Try Again
          </button>

          <Link
            href="/meetings"
            className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
          >
            Back to Meetings
          </Link>
        </div>
      </div>
    </section>
  );
}
