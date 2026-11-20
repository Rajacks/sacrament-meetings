"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createMeeting as createMeetingInDB,
  updateMeeting as updateMeetingInDB,
  deleteMeeting as deleteMeetingInDB,
  type MeetingInput,
} from "@/lib/meetings-db";

import { MeetingFormSchema, type MeetingFormState } from "@/lib/meeting-schema";

// Convert submitted FormData into structured meeting information
function getMeetingFormData(formData: FormData) {
  const speakerNames = formData.getAll("speakerName");
  const speakerTopics = formData.getAll("speakerTopic");
  const speakerTypes = formData.getAll("speakerType");

  const speakers = speakerNames.map((name, index) => ({
    name: String(name),
    topic: String(speakerTopics[index] ?? ""),
    type: String(speakerTypes[index] ?? "speaker"),
  }));

  return {
    date: String(formData.get("date") ?? ""),
    meetingType: String(formData.get("meetingType") ?? ""),
    presiding: String(formData.get("presiding") ?? ""),
    conducting: String(formData.get("conducting") ?? ""),

    openingHymnNumber: formData.get("openingHymnNumber"),
    openingHymnTitle: String(formData.get("openingHymnTitle") ?? ""),
    openingPrayer: String(formData.get("openingPrayer") ?? ""),

    sacramentHymnNumber: formData.get("sacramentHymnNumber"),
    sacramentHymnTitle: String(formData.get("sacramentHymnTitle") ?? ""),

    closingHymnNumber: formData.get("closingHymnNumber"),
    closingHymnTitle: String(formData.get("closingHymnTitle") ?? ""),
    closingPrayer: String(formData.get("closingPrayer") ?? ""),

    stakeBusiness:
      formData.get("stakeBusiness") === "on" ||
      formData.get("stakeBusiness") === "true",

    announcements: formData
      .getAll("announcement")
      .flatMap((item) => String(item).split("\n"))
      .map((item) => item.trim())
      .filter(Boolean),

    wardBusiness: formData
      .getAll("wardBusiness")
      .flatMap((item) => String(item).split("\n"))
      .map((item) => item.trim())
      .filter(Boolean)
      .map((description) => ({ description })),
    speakers,
  };
}

// Convert Zod validation errors into field-level errors
function getValidationErrors(
  issues: { path: PropertyKey[]; message: string }[],
) {
  const errors: Record<string, string[]> = {};

  for (const issue of issues) {
    const field = String(issue.path[0] ?? "form");

    if (!errors[field]) {
      errors[field] = [];
    }

    errors[field].push(issue.message);
  }

  return errors;
}

// Convert validated form information into a database meeting
function buildMeetingInput(
  data: ReturnType<typeof MeetingFormSchema.parse>,
): MeetingInput {
  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,

    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },
    openingPrayer: data.openingPrayer,

    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },

    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },
    closingPrayer: data.closingPrayer,

    stakeBusiness: data.stakeBusiness,
    announcements: data.announcements,
    wardBusiness: data.wardBusiness,
    speakers: data.speakers,
  };
}

// Create a new meeting
export async function createMeeting(
  _prevState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  const validatedFields = MeetingFormSchema.safeParse(
    getMeetingFormData(formData),
  );

  if (!validatedFields.success) {
    return {
      message: "Please correct the errors below.",
      errors: getValidationErrors(validatedFields.error.issues),
    };
  }

  const meeting = buildMeetingInput(validatedFields.data);

  try {
    await createMeetingInDB(meeting);
  } catch (error) {
    console.error("Error creating meeting:", error);

    return {
      message: "Unable to create the meeting. Please try again.",
    };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

// Update an existing meeting
export async function updateMeeting(
  id: number,
  _prevState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  if (!Number.isInteger(id) || id <= 0) {
    return {
      message: "Invalid meeting ID.",
    };
  }

  const validatedFields = MeetingFormSchema.safeParse(
    getMeetingFormData(formData),
  );

  if (!validatedFields.success) {
    return {
      message: "Please correct the errors below.",
      errors: getValidationErrors(validatedFields.error.issues),
    };
  }

  const meeting = buildMeetingInput(validatedFields.data);

  try {
    const updated = await updateMeetingInDB(id, meeting);

    if (!updated) {
      return {
        message: "Meeting not found. It may have already been deleted.",
      };
    }
  } catch (error) {
    console.error("Error updating meeting:", error);

    return {
      message: "Unable to update the meeting. Please try again.",
    };
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  redirect("/meetings");
}

// Delete an existing meeting
export async function deleteMeeting(
  id: number,
  formData: FormData,
): Promise<void> {
  void formData;
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid meeting ID.");
  }

  try {
    const deleted = await deleteMeetingInDB(id);

    if (!deleted) {
      throw new Error("Meeting not found.");
    }
  } catch (error) {
    console.error("Error deleting meeting:", error);

    throw new Error("Unable to delete the meeting. Please try again.");
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}
