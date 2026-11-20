import { notFound } from "next/navigation";

import { getMeetingById } from "@/lib/meetings-db";
import EditMeetingForm from "@/components/EditMeetingForm";
export const instant = false;

type EditMeetingPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <section className="bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">
          Edit Sacrament Meeting
        </h1>

        <EditMeetingForm meeting={meeting} />
      </div>
    </section>
  );
}
