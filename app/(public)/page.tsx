import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#F8F7F3]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="grid items-center gap-14 md:grid-cols-2">
            {/* Hero Text */}
            <div className="max-w-xl">
              <span className="inline-block rounded-full border border-[#D9C7A3] bg-[#F1EBDD] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8A6D3B]">
                Sacrament Meeting
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-[#172B4D] sm:text-5xl lg:text-6xl">
                Plan Meetings
                <span className="mt-2 block font-serif font-normal italic text-[#9A7B45]">
                  with Purpose.
                </span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                Plan, organize, and review meaningful sacrament meeting
                programs. Keep meeting details, hymns, prayers, announcements,
                and speakers in one convenient place.
              </p>

              {/* Buttons */}
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/meetings"
                  className="rounded-xl bg-[#172B4D] px-7 py-4 font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-[#243D65] hover:shadow-lg"
                >
                  View Meetings →
                </Link>

                <Link
                  href="/meetings/current"
                  className="rounded-xl border border-[#D6C8AE] bg-white px-7 py-4 font-semibold text-[#172B4D] transition duration-300 hover:border-[#A88A54] hover:bg-[#F3EFE6]"
                >
                  Current Meeting
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-3 text-sm text-slate-500">
                <span className="h-px w-10 bg-[#B99A61]" />A simple way to
                prepare and organize
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-[#E9E1D2]" />

              <div className="relative overflow-hidden rounded-[1.5rem] border-4 border-white shadow-2xl">
                <Image
                  src="/meeting.jpg"
                  alt="Sacrament meeting in a chapel"
                  width={800}
                  height={500}
                  priority
                  className="h-[320px] w-full object-cover sm:h-[420px]"
                />
              </div>

              <div className="absolute -bottom-6 left-6 rounded-xl border border-[#E8DFCF] bg-white px-5 py-4 shadow-xl sm:left-10">
                <p className="text-xs font-medium uppercase tracking-widest text-[#9A7B45]">
                  Meeting Preparation
                </p>
                <p className="mt-1 font-semibold text-[#172B4D]">
                  Organized. Peaceful. Meaningful.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-[#E7E1D6] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7B45]">
              Simple & Organized
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#172B4D] sm:text-4xl">
              Meeting Planning Made Simple
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Everything you need to organize and review sacrament meeting
              programs in one place.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="group rounded-2xl border border-[#E7E1D6] bg-[#FCFBF8] p-8 transition duration-300 hover:-translate-y-1 hover:border-[#C9B38A] hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EDE5D5] text-xl text-[#8A6D3B]">
                ♧
              </div>

              <h3 className="mt-6 text-lg font-bold text-[#172B4D]">
                Organize Programs
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Keep hymns, prayers, speakers, and announcements organized.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl border border-[#E7E1D6] bg-[#FCFBF8] p-8 transition duration-300 hover:-translate-y-1 hover:border-[#C9B38A] hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EDE5D5] text-xl text-[#8A6D3B]">
                ◷
              </div>

              <h3 className="mt-6 text-lg font-bold text-[#172B4D]">
                Review Meetings
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                View current and previous sacrament meeting programs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl border border-[#E7E1D6] bg-[#FCFBF8] p-8 transition duration-300 hover:-translate-y-1 hover:border-[#C9B38A] hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EDE5D5] text-xl text-[#8A6D3B]">
                ♧
              </div>

              <h3 className="mt-6 text-lg font-bold text-[#172B4D]">
                Share Programs
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Access meeting details in a clear, printable format.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Accent */}
      <div className="h-1 bg-gradient-to-r from-[#172B4D] via-[#C4A46B] to-[#172B4D]" />
    </div>
  );
}
