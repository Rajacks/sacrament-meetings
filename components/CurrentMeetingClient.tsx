"use client";

import { useEffect, useState } from "react";
import MeetingDetail from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";

export default function CurrentMeetingClient() {
  const [meeting, setMeeting] = useState<SacramentMeeting | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCurrentMeeting() {
      try {
        const response = await fetch("/api/meetings");

        if (!response.ok) {
          throw new Error("Failed to load meetings.");
        }

        const meetings: SacramentMeeting[] = await response.json();

        const today = new Date();
        const sunday = new Date(today);

        sunday.setDate(today.getDate() - today.getDay());

        const sundayDate = [
          sunday.getFullYear(),
          String(sunday.getMonth() + 1).padStart(2, "0"),
          String(sunday.getDate()).padStart(2, "0"),
        ].join("-");

        const currentMeeting = meetings.find(
          (item) => item.date === sundayDate,
        );

        const latestMeeting = meetings[meetings.length - 1];

        setMeeting(currentMeeting ?? latestMeeting ?? null);
      } catch (error) {
        console.error("Error loading current meeting:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCurrentMeeting();
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="animate-pulse rounded-xl bg-white p-8 shadow-sm">
          <div className="mx-auto h-8 w-64 rounded bg-slate-200" />
          <div className="mx-auto mt-6 h-4 w-48 rounded bg-slate-200" />
          <div className="mt-10 h-4 w-full rounded bg-slate-200" />
          <div className="mt-4 h-4 w-3/4 rounded bg-slate-200" />
        </div>
      </section>
    );
  }

  if (!meeting) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900">Current Meeting</h1>
        <p className="mt-4 text-slate-600">No meeting program is available.</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F8F7F3] px-6 py-12">
      <MeetingDetail meeting={meeting} />
    </section>
  );
}
