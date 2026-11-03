import PrintButton from "@/components/PrintButton";
import type { SacramentMeeting } from "@/lib/types";

type MeetingDetailProps = {
  meeting: SacramentMeeting;
};

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <article className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[#E7E1D6] bg-white shadow-xl print:rounded-none print:border-0 print:shadow-none">
      {/* Print Button */}
      <div className="flex justify-end bg-[#F8F7F3] px-8 pt-6 print:hidden">
        <PrintButton />
      </div>

      {/* Meeting Header with Jesus Christ Background */}
      <header
        className="relative overflow-hidden bg-[#172B4D] bg-cover bg-center px-8 py-12 text-center text-white sm:px-12 print:bg-cover print:[print-color-adjust:exact]"
        style={{
          backgroundImage: "url('/jesus-christ.jpeg')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#172B4D]/65 print:bg-[#172B4D]/50" />

        {/* Header Content */}
        <div className="relative z-10">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#172B4D] via-[#C4A46B] to-[#172B4D]" />

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9C7A3]">
            {meeting.meetingType} Meeting
          </p>

          <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Sacrament Meeting
            <span className="mt-2 block text-2xl font-normal italic text-[#E4D4B6] sm:text-3xl">
              Program
            </span>
          </h1>

          <div className="mx-auto mt-6 h-px w-20 bg-[#C4A46B]" />

          <p className="mt-5 text-sm tracking-wide text-slate-200">
            {meeting.date}
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#D9C7A3]">
                Presiding
              </p>
              <p className="mt-1 font-medium text-white">{meeting.presiding}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-[#D9C7A3]">
                Conducting
              </p>
              <p className="mt-1 font-medium text-white">
                {meeting.conducting}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Program Content */}
      <div className="space-y-10 px-6 py-10 sm:px-12 sm:py-12 print:px-0 print:py-6">
        {/* Announcements */}
        <section className="rounded-xl border border-[#E7E1D6] bg-[#FCFBF8] p-6">
          <h2 className="flex items-center gap-3 text-lg font-bold text-[#172B4D]">
            <span className="h-6 w-1 rounded-full bg-[#C4A46B]" />
            Announcements
          </h2>

          {meeting.announcements?.length ? (
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
              {meeting.announcements.map((announcement, index) => (
                <li key={index}>{announcement}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm italic text-slate-500">
              No announcements.
            </p>
          )}
        </section>

        {/* Opening Hymn & Prayer */}
        <section className="space-y-6 text-center">
          <div className="rounded-xl bg-[#F8F7F3] px-6 py-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7B45]">
              Opening Hymn
            </p>
            <p className="mt-3 text-lg font-semibold text-[#172B4D]">
              Hymn {meeting.openingHymn.number}: {meeting.openingHymn.title}
            </p>
          </div>

          <div className="py-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7B45]">
              Opening Prayer
            </p>
            <p className="mt-3 text-lg text-slate-700">
              {meeting.openingPrayer}
            </p>
          </div>
        </section>

        <div className="h-px bg-[#E7E1D6]" />

        {/* Ward Business */}
        <section>
          <h2 className="flex items-center gap-3 text-lg font-bold text-[#172B4D]">
            <span className="h-6 w-1 rounded-full bg-[#C4A46B]" />
            Ward Business
          </h2>

          {meeting.wardBusiness.length ? (
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
              {meeting.wardBusiness.map((item, index) => (
                <li key={index}>{item.description}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm italic text-slate-500">
              No ward business.
            </p>
          )}

          {meeting.stakeBusiness && (
            <p className="mt-4 rounded-lg bg-[#F1EBDD] px-4 py-3 text-sm font-medium text-[#8A6D3B]">
              Stake business will be conducted.
            </p>
          )}
        </section>

        {/* Sacrament Hymn */}
        <section className="rounded-xl border border-[#E7E1D6] bg-[#FCFBF8] px-6 py-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7B45]">
            Sacrament Hymn
          </p>
          <p className="mt-3 text-lg font-semibold text-[#172B4D]">
            Hymn {meeting.sacramentHymn.number}: {meeting.sacramentHymn.title}
          </p>
        </section>

        {/* Speakers & Musical Numbers */}
        <section>
          <h2 className="flex items-center gap-3 text-lg font-bold text-[#172B4D]">
            <span className="h-6 w-1 rounded-full bg-[#C4A46B]" />
            Speakers and Musical Numbers
          </h2>

          <div className="mt-6 space-y-4">
            {meeting.speakers.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#E7E1D6] bg-white px-6 py-5 text-center transition hover:border-[#C9B38A] hover:bg-[#FCFBF8]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9A7B45]">
                  {item.type === "musical-number"
                    ? "Musical Number"
                    : "Speaker"}
                </p>

                <p className="mt-2 text-lg font-semibold text-[#172B4D]">
                  {item.name}
                </p>

                <p className="mt-2 leading-6 text-slate-600">{item.topic}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing Hymn & Prayer */}
        <section className="space-y-6 text-center">
          <div className="rounded-xl bg-[#F8F7F3] px-6 py-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7B45]">
              Closing Hymn
            </p>
            <p className="mt-3 text-lg font-semibold text-[#172B4D]">
              Hymn {meeting.closingHymn.number}: {meeting.closingHymn.title}
            </p>
          </div>

          <div className="py-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7B45]">
              Closing Prayer
            </p>
            <p className="mt-3 text-lg text-slate-700">
              {meeting.closingPrayer}
            </p>
          </div>
        </section>
      </div>

      {/* Footer Accent */}
      <div className="h-1 bg-gradient-to-r from-[#172B4D] via-[#C4A46B] to-[#172B4D]" />
    </article>
  );
}
