"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MeetingDetail from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";

type MeetingPageClientProps = {
  id: string;
};

export default function MeetingPageClient({ id }: MeetingPageClientProps) {
  const [meeting, setMeeting] = useState<SacramentMeeting | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMeeting() {
      try {
        const response = await fetch(`/api/meetings/${id}`);

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Meeting not found."
              : "Failed to load meeting.",
          );
        }

        const data: SacramentMeeting = await response.json();
        setMeeting(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchMeeting();
  }, [id]);

  return (
    <section className="bg-slate-50 px-6 py-12">
      {loading && (
        <p className="mx-auto max-w-4xl text-slate-600">Loading meeting...</p>
      )}

      {error && (
        <div className="mx-auto max-w-4xl rounded-lg bg-red-100 p-6 text-red-700">
          <p>{error}</p>
          <Link
            href="/meetings"
            className="mt-4 inline-block font-semibold underline"
          >
            Back to Meetings
          </Link>
        </div>
      )}

      {!loading && !error && meeting && (
        <>
          <MeetingDetail meeting={meeting} />

          <div className="mx-auto mt-8 max-w-4xl">
            <Link
              href="/meetings"
              className="font-semibold text-blue-900 hover:underline"
            >
              ← Back to Meetings
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
