import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

type MeetingCardProps = {
  meeting: SacramentMeeting;
};

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[#E7E1D6] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#C9B38A] hover:shadow-xl">
      {/* Gold Accent */}
      <div className="h-1 bg-gradient-to-r from-[#172B4D] via-[#C4A46B] to-[#172B4D]" />

      <div className="p-7">
        {/* Meeting Type & Date */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full border border-[#D9C7A3] bg-[#F1EBDD] px-3 py-1.5 text-xs font-semibold capitalize tracking-wide text-[#8A6D3B]">
            {meeting.meetingType} Meeting
          </span>

          <span className="text-sm font-medium text-slate-500">
            {meeting.date}
          </span>
        </div>

        {/* Meeting Title */}
        <h2 className="mt-6 text-xl font-bold tracking-tight text-[#172B4D]">
          Sacrament Meeting
        </h2>

        <div className="mt-5 space-y-3">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EDE5D5] text-xs text-[#8A6D3B]">
              P
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Presiding
              </p>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {meeting.presiding}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EDE5D5] text-xs text-[#8A6D3B]">
              C
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Conducting
              </p>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {meeting.conducting}
              </p>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="mt-6 border-t border-[#EEE8DD] pt-5">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-[#172B4D]">
              {meeting.speakers.length}
            </span>{" "}
            program participant(s)
          </p>
        </div>

        {/* View Program Button */}
        <Link
          href={`/meetings/${meeting.id}`}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#172B4D] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition duration-300 hover:bg-[#243D65] focus:outline-none focus:ring-2 focus:ring-[#C4A46B] focus:ring-offset-2"
        >
          View Program
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
