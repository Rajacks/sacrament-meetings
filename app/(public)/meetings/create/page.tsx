"use client";

import { useActionState } from "react";
import Link from "next/link";

import { createMeeting } from "@/lib/actions";
import { initialMeetingFormState } from "@/lib/meeting-schema";

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={id} aria-live="polite">
      {errors?.map((error, index) => (
        <p key={index} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      ))}
    </div>
  );
}

const inputClass =
  "mt-2 w-full rounded-lg border border-[#D9C7A3] bg-white px-4 py-3 text-slate-700 outline-none focus:border-[#8A6D3B] focus:ring-2 focus:ring-[#D9C7A3]";

const labelClass = "block text-sm font-semibold text-[#172B4D]";

export default function CreateMeetingPage() {
  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialMeetingFormState,
  );

  return (
    <main className="min-h-screen bg-[#F8F7F3] px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/meetings"
          className="font-semibold text-[#8A6D3B] hover:underline"
        >
          ← Back to Meetings
        </Link>

        <header className="mb-10 mt-8">
          <span className="rounded-full border border-[#D9C7A3] bg-[#F1EBDD] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#8A6D3B]">
            Meeting Management
          </span>

          <h1 className="mt-5 text-4xl font-bold text-[#172B4D]">
            Create Sacrament Meeting
          </h1>

          <p className="mt-3 text-slate-600">
            Enter the details below to create a new sacrament meeting program.
          </p>
        </header>

        <form
          action={formAction}
          noValidate
          className="space-y-8 rounded-2xl border border-[#E7E1D6] bg-white p-6 shadow-sm sm:p-10"
        >
          {state.message && (
            <div
              role="alert"
              aria-live="polite"
              className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {state.message}
            </div>
          )}

          {/* Meeting Information */}
          <section className="space-y-5">
            <h2 className="border-b border-[#E7E1D6] pb-3 text-xl font-bold text-[#172B4D]">
              Meeting Information
            </h2>

            <div>
              <label htmlFor="date" className={labelClass}>
                Meeting Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                aria-describedby="date-error"
                className={inputClass}
              />
              <FieldError id="date-error" errors={state.errors?.date} />
            </div>

            <div>
              <label htmlFor="meetingType" className={labelClass}>
                Meeting Type
              </label>
              <select
                id="meetingType"
                name="meetingType"
                required
                aria-describedby="meetingType-error"
                className={inputClass}
                defaultValue="regular"
              >
                <option value="regular">Regular</option>
                <option value="testimony">Testimony</option>
                <option value="stake">Stake</option>
                <option value="general">General</option>
              </select>
              <FieldError
                id="meetingType-error"
                errors={state.errors?.meetingType}
              />
            </div>

            <div>
              <label htmlFor="presiding" className={labelClass}>
                Presiding Officer
              </label>
              <input
                id="presiding"
                name="presiding"
                required
                aria-describedby="presiding-error"
                className={inputClass}
                placeholder="Enter presiding officer"
              />
              <FieldError
                id="presiding-error"
                errors={state.errors?.presiding}
              />
            </div>

            <div>
              <label htmlFor="conducting" className={labelClass}>
                Conducting Officer
              </label>
              <input
                id="conducting"
                name="conducting"
                required
                aria-describedby="conducting-error"
                className={inputClass}
                placeholder="Enter conducting officer"
              />
              <FieldError
                id="conducting-error"
                errors={state.errors?.conducting}
              />
            </div>
          </section>

          {/* Opening Hymn and Prayer */}
          <section className="space-y-5">
            <h2 className="border-b border-[#E7E1D6] pb-3 text-xl font-bold text-[#172B4D]">
              Opening Hymn and Prayer
            </h2>

            <div>
              <label htmlFor="openingHymnNumber" className={labelClass}>
                Opening Hymn Number
              </label>
              <input
                id="openingHymnNumber"
                name="openingHymnNumber"
                type="number"
                min="1"
                required
                aria-describedby="openingHymnNumber-error"
                className={inputClass}
              />
              <FieldError
                id="openingHymnNumber-error"
                errors={state.errors?.openingHymnNumber}
              />
            </div>

            <div>
              <label htmlFor="openingHymnTitle" className={labelClass}>
                Opening Hymn Title
              </label>
              <input
                id="openingHymnTitle"
                name="openingHymnTitle"
                required
                aria-describedby="openingHymnTitle-error"
                className={inputClass}
              />
              <FieldError
                id="openingHymnTitle-error"
                errors={state.errors?.openingHymnTitle}
              />
            </div>

            <div>
              <label htmlFor="openingPrayer" className={labelClass}>
                Opening Prayer
              </label>
              <input
                id="openingPrayer"
                name="openingPrayer"
                required
                aria-describedby="openingPrayer-error"
                className={inputClass}
              />
              <FieldError
                id="openingPrayer-error"
                errors={state.errors?.openingPrayer}
              />
            </div>
          </section>

          {/* Announcements */}
          <section className="space-y-5">
            <h2 className="border-b border-[#E7E1D6] pb-3 text-xl font-bold text-[#172B4D]">
              Announcements
            </h2>

            <div>
              <label htmlFor="announcement" className={labelClass}>
                Announcement
              </label>
              <textarea
                id="announcement"
                name="announcement"
                rows={3}
                aria-describedby="announcement-help"
                className={inputClass}
                placeholder="Enter an announcement (optional)"
              />
              <p id="announcement-help" className="mt-1 text-sm text-slate-500">
                Leave blank if there are no announcements.
              </p>
            </div>
          </section>

          {/* Ward Business */}
          <section className="space-y-5">
            <h2 className="border-b border-[#E7E1D6] pb-3 text-xl font-bold text-[#172B4D]">
              Ward Business
            </h2>

            <div>
              <label htmlFor="wardBusiness" className={labelClass}>
                Ward Business Description
              </label>
              <textarea
                id="wardBusiness"
                name="wardBusiness"
                rows={3}
                className={inputClass}
                placeholder="Enter ward business (optional)"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                id="stakeBusiness"
                name="stakeBusiness"
                type="checkbox"
                className="h-5 w-5 accent-[#172B4D]"
              />
              <label htmlFor="stakeBusiness" className={labelClass}>
                Stake business will be conducted
              </label>
            </div>
          </section>

          {/* Sacrament Hymn */}
          <section className="space-y-5">
            <h2 className="border-b border-[#E7E1D6] pb-3 text-xl font-bold text-[#172B4D]">
              Sacrament Hymn
            </h2>

            <div>
              <label htmlFor="sacramentHymnNumber" className={labelClass}>
                Sacrament Hymn Number
              </label>
              <input
                id="sacramentHymnNumber"
                name="sacramentHymnNumber"
                type="number"
                min="1"
                required
                aria-describedby="sacramentHymnNumber-error"
                className={inputClass}
              />
              <FieldError
                id="sacramentHymnNumber-error"
                errors={state.errors?.sacramentHymnNumber}
              />
            </div>

            <div>
              <label htmlFor="sacramentHymnTitle" className={labelClass}>
                Sacrament Hymn Title
              </label>
              <input
                id="sacramentHymnTitle"
                name="sacramentHymnTitle"
                required
                aria-describedby="sacramentHymnTitle-error"
                className={inputClass}
              />
              <FieldError
                id="sacramentHymnTitle-error"
                errors={state.errors?.sacramentHymnTitle}
              />
            </div>
          </section>

          {/* Speakers and Musical Numbers */}
          <section className="space-y-5">
            <h2 className="border-b border-[#E7E1D6] pb-3 text-xl font-bold text-[#172B4D]">
              Speakers and Musical Numbers
            </h2>

            <div>
              <label htmlFor="speakerName" className={labelClass}>
                Speaker or Performer Name
              </label>
              <input
                id="speakerName"
                name="speakerName"
                required
                aria-describedby="speakers-error"
                className={inputClass}
                placeholder="Enter name"
              />
            </div>

            <div>
              <label htmlFor="speakerTopic" className={labelClass}>
                Topic or Musical Number
              </label>
              <input
                id="speakerTopic"
                name="speakerTopic"
                required
                aria-describedby="speakers-error"
                className={inputClass}
                placeholder="Enter topic or musical number"
              />
            </div>

            <div>
              <label htmlFor="speakerType" className={labelClass}>
                Participant Type
              </label>
              <select
                id="speakerType"
                name="speakerType"
                className={inputClass}
                defaultValue="speaker"
                aria-describedby="speakers-error"
              >
                <option value="speaker">Speaker</option>
                <option value="musical-number">Musical Number</option>
              </select>
            </div>

            <FieldError id="speakers-error" errors={state.errors?.speakers} />
          </section>

          {/* Closing Hymn and Prayer */}
          <section className="space-y-5">
            <h2 className="border-b border-[#E7E1D6] pb-3 text-xl font-bold text-[#172B4D]">
              Closing Hymn and Prayer
            </h2>

            <div>
              <label htmlFor="closingHymnNumber" className={labelClass}>
                Closing Hymn Number
              </label>
              <input
                id="closingHymnNumber"
                name="closingHymnNumber"
                type="number"
                min="1"
                required
                aria-describedby="closingHymnNumber-error"
                className={inputClass}
              />
              <FieldError
                id="closingHymnNumber-error"
                errors={state.errors?.closingHymnNumber}
              />
            </div>

            <div>
              <label htmlFor="closingHymnTitle" className={labelClass}>
                Closing Hymn Title
              </label>
              <input
                id="closingHymnTitle"
                name="closingHymnTitle"
                required
                aria-describedby="closingHymnTitle-error"
                className={inputClass}
              />
              <FieldError
                id="closingHymnTitle-error"
                errors={state.errors?.closingHymnTitle}
              />
            </div>

            <div>
              <label htmlFor="closingPrayer" className={labelClass}>
                Closing Prayer
              </label>
              <input
                id="closingPrayer"
                name="closingPrayer"
                required
                aria-describedby="closingPrayer-error"
                className={inputClass}
              />
              <FieldError
                id="closingPrayer-error"
                errors={state.errors?.closingPrayer}
              />
            </div>
          </section>

          {/* Submit */}
          <div className="border-t border-[#E7E1D6] pt-6">
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-[#172B4D] px-6 py-4 font-semibold text-white transition hover:bg-[#243D65] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Creating Meeting..." : "Create Meeting"}
            </button>

            <Link
              href="/meetings"
              className="mt-4 block text-center text-sm font-medium text-[#8A6D3B] hover:underline"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
