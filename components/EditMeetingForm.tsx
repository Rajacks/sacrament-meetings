"use client";

import { useActionState } from "react";
import Link from "next/link";

import { updateMeeting } from "@/lib/actions";
import { initialMeetingFormState } from "@/lib/meeting-schema";
import type { SacramentMeeting } from "@/lib/types";

type EditMeetingFormProps = {
  meeting: SacramentMeeting;
};

export default function EditMeetingForm({ meeting }: EditMeetingFormProps) {
  const updateMeetingWithId = updateMeeting.bind(null, meeting.id);

  const [state, formAction, pending] = useActionState(
    updateMeetingWithId,
    initialMeetingFormState,
  );

  function fieldError(field: string) {
    const errors = state.errors?.[field];

    if (!errors?.length) return null;

    return (
      <div id={`${field}-error`} aria-live="polite">
        {errors.map((error, index) => (
          <p key={index} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-8">
      {state.message && (
        <p role="alert" className="rounded-lg bg-red-100 p-4 text-red-700">
          {state.message}
        </p>
      )}

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Meeting Information</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="date" className="mb-1 block font-medium">
              Meeting Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              defaultValue={meeting.date.slice(0, 10)}
              required
              className="w-full rounded border p-2"
              aria-describedby={state.errors?.date ? "date-error" : undefined}
            />
            {fieldError("date")}
          </div>

          <div>
            <label htmlFor="meetingType" className="mb-1 block font-medium">
              Meeting Type
            </label>
            <select
              id="meetingType"
              name="meetingType"
              defaultValue={meeting.meetingType}
              className="w-full rounded border p-2"
              aria-describedby={
                state.errors?.meetingType ? "meetingType-error" : undefined
              }
            >
              <option value="regular">Regular</option>
              <option value="testimony">Testimony</option>
              <option value="stake">Stake</option>
              <option value="general">General</option>
            </select>
            {fieldError("meetingType")}
          </div>

          <div>
            <label htmlFor="presiding" className="mb-1 block font-medium">
              Presiding
            </label>
            <input
              id="presiding"
              name="presiding"
              defaultValue={meeting.presiding}
              required
              className="w-full rounded border p-2"
              aria-describedby={
                state.errors?.presiding ? "presiding-error" : undefined
              }
            />
            {fieldError("presiding")}
          </div>

          <div>
            <label htmlFor="conducting" className="mb-1 block font-medium">
              Conducting
            </label>
            <input
              id="conducting"
              name="conducting"
              defaultValue={meeting.conducting}
              required
              className="w-full rounded border p-2"
              aria-describedby={
                state.errors?.conducting ? "conducting-error" : undefined
              }
            />
            {fieldError("conducting")}
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Opening</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="openingHymnNumber"
              className="mb-1 block font-medium"
            >
              Opening Hymn Number
            </label>
            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              min="1"
              defaultValue={meeting.openingHymn.number}
              required
              className="w-full rounded border p-2"
              aria-describedby={
                state.errors?.openingHymnNumber
                  ? "openingHymnNumber-error"
                  : undefined
              }
            />
            {fieldError("openingHymnNumber")}
          </div>

          <div>
            <label
              htmlFor="openingHymnTitle"
              className="mb-1 block font-medium"
            >
              Opening Hymn Title
            </label>
            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              defaultValue={meeting.openingHymn.title}
              required
              className="w-full rounded border p-2"
              aria-describedby={
                state.errors?.openingHymnTitle
                  ? "openingHymnTitle-error"
                  : undefined
              }
            />
            {fieldError("openingHymnTitle")}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="openingPrayer" className="mb-1 block font-medium">
            Opening Prayer
          </label>
          <input
            id="openingPrayer"
            name="openingPrayer"
            defaultValue={meeting.openingPrayer}
            required
            className="w-full rounded border p-2"
            aria-describedby={
              state.errors?.openingPrayer ? "openingPrayer-error" : undefined
            }
          />
          {fieldError("openingPrayer")}
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          Announcements and Ward Business
        </h2>

        <div>
          <label htmlFor="announcements" className="mb-1 block font-medium">
            Announcements
          </label>
          <textarea
            id="announcements"
            name="announcement"
            rows={3}
            defaultValue={(meeting.announcements ?? []).join("\n")}
            className="w-full rounded border p-2"
            aria-describedby={
              state.errors?.announcements ? "announcements-error" : undefined
            }
          />
          <p className="mt-1 text-sm text-slate-500">
            Enter one announcement per line.
          </p>
          {fieldError("announcements")}
        </div>

        <div className="mt-4">
          <label htmlFor="wardBusiness" className="mb-1 block font-medium">
            Ward Business
          </label>
          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={3}
            defaultValue={meeting.wardBusiness
              .map((item) => item.description)
              .join("\n")}
            className="w-full rounded border p-2"
            aria-describedby={
              state.errors?.wardBusiness ? "wardBusiness-error" : undefined
            }
          />
          <p className="mt-1 text-sm text-slate-500">
            Enter one ward business item per line.
          </p>
          {fieldError("wardBusiness")}
        </div>

        <label className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            name="stakeBusiness"
            defaultChecked={meeting.stakeBusiness}
          />
          <span>Stake Business</span>
        </label>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Sacrament</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="sacramentHymnNumber"
              className="mb-1 block font-medium"
            >
              Sacrament Hymn Number
            </label>
            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              min="1"
              defaultValue={meeting.sacramentHymn.number}
              required
              className="w-full rounded border p-2"
              aria-describedby={
                state.errors?.sacramentHymnNumber
                  ? "sacramentHymnNumber-error"
                  : undefined
              }
            />
            {fieldError("sacramentHymnNumber")}
          </div>

          <div>
            <label
              htmlFor="sacramentHymnTitle"
              className="mb-1 block font-medium"
            >
              Sacrament Hymn Title
            </label>
            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              defaultValue={meeting.sacramentHymn.title}
              required
              className="w-full rounded border p-2"
              aria-describedby={
                state.errors?.sacramentHymnTitle
                  ? "sacramentHymnTitle-error"
                  : undefined
              }
            />
            {fieldError("sacramentHymnTitle")}
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          Speakers and Musical Numbers
        </h2>

        {meeting.speakers.map((speaker, index) => (
          <div
            key={`${speaker.name}-${index}`}
            className="mb-4 grid gap-4 border-b pb-4 md:grid-cols-3"
          >
            <div>
              <label
                htmlFor={`speakerName-${index}`}
                className="mb-1 block font-medium"
              >
                Name
              </label>
              <input
                id={`speakerName-${index}`}
                name="speakerName"
                defaultValue={speaker.name}
                required
                className="w-full rounded border p-2"
                aria-describedby={
                  state.errors?.speakers ? "speakers-error" : undefined
                }
              />
            </div>

            <div>
              <label
                htmlFor={`speakerTopic-${index}`}
                className="mb-1 block font-medium"
              >
                Topic
              </label>
              <input
                id={`speakerTopic-${index}`}
                name="speakerTopic"
                defaultValue={speaker.topic}
                required
                className="w-full rounded border p-2"
                aria-describedby={
                  state.errors?.speakers ? "speakers-error" : undefined
                }
              />
            </div>

            <div>
              <label
                htmlFor={`speakerType-${index}`}
                className="mb-1 block font-medium"
              >
                Type
              </label>
              <select
                id={`speakerType-${index}`}
                name="speakerType"
                defaultValue={speaker.type}
                className="w-full rounded border p-2"
                aria-describedby={
                  state.errors?.speakers ? "speakers-error" : undefined
                }
              >
                <option value="speaker">Speaker</option>
                <option value="musical-number">Musical Number</option>
              </select>
            </div>
          </div>
        ))}

        {fieldError("speakers")}

        {meeting.speakers.length === 0 && (
          <p className="text-sm text-slate-500">
            This meeting currently has no speakers or musical numbers.
          </p>
        )}
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Closing</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="closingHymnNumber"
              className="mb-1 block font-medium"
            >
              Closing Hymn Number
            </label>
            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              min="1"
              defaultValue={meeting.closingHymn.number}
              required
              className="w-full rounded border p-2"
              aria-describedby={
                state.errors?.closingHymnNumber
                  ? "closingHymnNumber-error"
                  : undefined
              }
            />
            {fieldError("closingHymnNumber")}
          </div>

          <div>
            <label
              htmlFor="closingHymnTitle"
              className="mb-1 block font-medium"
            >
              Closing Hymn Title
            </label>
            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              defaultValue={meeting.closingHymn.title}
              required
              className="w-full rounded border p-2"
              aria-describedby={
                state.errors?.closingHymnTitle
                  ? "closingHymnTitle-error"
                  : undefined
              }
            />
            {fieldError("closingHymnTitle")}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="closingPrayer" className="mb-1 block font-medium">
            Closing Prayer
          </label>
          <input
            id="closingPrayer"
            name="closingPrayer"
            defaultValue={meeting.closingPrayer}
            required
            className="w-full rounded border p-2"
            aria-describedby={
              state.errors?.closingPrayer ? "closingPrayer-error" : undefined
            }
          />
          {fieldError("closingPrayer")}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
        >
          {pending ? "Saving Changes..." : "Save Changes"}
        </button>

        <Link
          href={`/meetings/${meeting.id}`}
          className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
