import Link from "next/link";

export default function MeetingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-6 px-6 py-4">
          <Link
            href="/meetings"
            className="font-medium text-slate-700 hover:text-blue-900"
          >
            All Meetings
          </Link>

          <Link
            href="/meetings/current"
            className="font-medium text-slate-700 hover:text-blue-900"
          >
            Current Meeting
          </Link>

          <Link
            href="/meetings/create"
            className="font-semibold text-blue-900 hover:text-blue-700"
          >
            + Create Meeting
          </Link>
        </div>
      </nav>

      {children}
    </div>
  );
}
