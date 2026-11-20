import { z } from "zod";

// Validation schema for meeting forms
export const MeetingFormSchema = z.object({
  date: z.string().min(1, "Meeting date is required."),
  meetingType: z.enum(["testimony", "regular", "stake", "general"]),
  presiding: z.string().min(1, "Presiding officer is required."),
  conducting: z.string().min(1, "Conducting officer is required."),

  openingHymnNumber: z.coerce
    .number()
    .int()
    .positive("Enter a valid opening hymn number."),
  openingHymnTitle: z.string().min(1, "Opening hymn title is required."),
  openingPrayer: z.string().min(1, "Opening prayer is required."),

  sacramentHymnNumber: z.coerce
    .number()
    .int()
    .positive("Enter a valid sacrament hymn number."),
  sacramentHymnTitle: z.string().min(1, "Sacrament hymn title is required."),

  closingHymnNumber: z.coerce
    .number()
    .int()
    .positive("Enter a valid closing hymn number."),
  closingHymnTitle: z.string().min(1, "Closing hymn title is required."),
  closingPrayer: z.string().min(1, "Closing prayer is required."),

  stakeBusiness: z.boolean(),

  announcements: z.array(z.string()),

  wardBusiness: z.array(
    z.object({
      description: z.string().min(1, "Business description is required."),
    }),
  ),

  speakers: z.array(
    z.object({
      name: z.string().min(1, "Speaker name is required."),
      topic: z.string().min(1, "Speaker topic is required."),
      type: z.enum(["speaker", "musical-number"]),
    }),
  ),
});

export type MeetingFormState = {
  message: string;
  errors?: {
    [key: string]: string[];
  };
};

export const initialMeetingFormState: MeetingFormState = {
  message: "",
};
