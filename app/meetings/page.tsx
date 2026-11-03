"use client";

import { useEffect, useState } from "react";
import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<SacramentMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMeetings() {
      try {
        const response = await fetch("/api/meetings");

        if (!response.ok) {
          throw new Error("Failed to load meetings.");
        }

        const data: SacramentMeeting[] = await response.json();
        setMeetings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchMeetings();
  }, []);

  return (
    <section className="min-h-screen bg-[#F8F7F3]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        {/* Page Header */}
        <div className="mb-12">
          <span className="inline-block rounded-full border border-[#D9C7A3] bg-[#F1EBDD] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8A6D3B]">
            Meeting Programs
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#172B4D] sm:text-5xl">
            Past & Upcoming Meetings
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Browse meeting programs, review previous meetings, and view
            scheduled sacrament meeting details.
          </p>

          <div className="mt-8 h-1 w-20 rounded-full bg-[#C4A46B]" />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-[#E7E1D6] bg-white p-6 shadow-sm"
              >
                <div className="h-5 w-1/2 rounded bg-slate-200" />
                <div className="mt-4 h-4 w-3/4 rounded bg-slate-100" />
                <div className="mt-3 h-4 w-2/3 rounded bg-slate-100" />
                <div className="mt-8 h-10 w-full rounded-lg bg-slate-200" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
            <p className="font-semibold">Unable to load meetings</p>
            <p className="mt-2 text-sm">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && meetings.length === 0 && (
          <div className="rounded-2xl border border-[#E7E1D6] bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-[#172B4D]">
              No meetings found
            </h2>
            <p className="mt-3 text-slate-600">
              Meeting programs will appear here when available.
            </p>
          </div>
        )}

        {/* Meeting Cards */}
        {!loading && !error && meetings.length > 0 && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Available Programs
              </p>

              <span className="rounded-full bg-[#EDE5D5] px-4 py-2 text-sm font-semibold text-[#8A6D3B]">
                {meetings.length}{" "}
                {meetings.length === 1 ? "Meeting" : "Meetings"}
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {meetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
