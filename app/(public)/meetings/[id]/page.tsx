import MeetingPageClient from "@/components/MeetingPageClient";

export const instant = false;

type MeetingPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;

  return <MeetingPageClient id={id} />;
}
