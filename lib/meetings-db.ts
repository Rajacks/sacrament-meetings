import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-05-03",
    meetingType: "regular",
    presiding: "Bishop John Smith",
    conducting: "Brother Mark Johnson",
    announcements: ["Ward activity next Saturday."],
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Brother David Brown",
    wardBusiness: [{ description: "Sustain new ward officers." }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
    speakers: [
      {
        name: "Sister Mary Jones",
        topic: "Faith in Jesus Christ",
        type: "speaker",
      },
      {
        name: "Brother Peter Lee",
        topic: "Following the Savior",
        type: "speaker",
      },
    ],
    closingHymn: { number: 134, title: "I Believe in Christ" },
    closingPrayer: "Sister Anna White",
  },
  {
    id: 2,
    date: "2026-05-10",
    meetingType: "regular",
    presiding: "Bishop John Smith",
    conducting: "Brother Mark Johnson",
    announcements: ["Mother’s Day celebration."],
    openingHymn: { number: 19, title: "We Thank Thee, O God, for a Prophet" },
    openingPrayer: "Brother James Clark",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: "Jesus of Nazareth, Savior and King" },
    speakers: [
      {
        name: "Sister Rachel Green",
        topic: "The Love of a Mother",
        type: "speaker",
      },
    ],
    closingHymn: { number: 308, title: "Love One Another" },
    closingPrayer: "Brother Thomas Hall",
  },
  {
    id: 3,
    date: "2026-05-17",
    meetingType: "testimony",
    presiding: "Bishop John Smith",
    conducting: "Brother Mark Johnson",
    openingHymn: { number: 89, title: "The Lord Is My Light" },
    openingPrayer: "Sister Emily Davis",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: "I Stand All Amazed" },
    speakers: [{ name: "Ward Members", topic: "Testimonies", type: "speaker" }],
    closingHymn: { number: 100, title: "Nearer, My God, to Thee" },
    closingPrayer: "Brother Michael Scott",
  },
  {
    id: 4,
    date: "2026-05-24",
    meetingType: "stake",
    presiding: "Stake President Robert King",
    conducting: "Brother Mark Johnson",
    openingHymn: { number: 27, title: "Praise to the Lord, the Almighty" },
    openingPrayer: "Brother Daniel Young",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 185, title: "Reverently and Meekly" },
    speakers: [
      {
        name: "President Robert King",
        topic: "Building Zion",
        type: "speaker",
      },
    ],
    closingHymn: { number: 97, title: "Lead, Kindly Light" },
    closingPrayer: "Sister Olivia Moore",
  },
  {
    id: 5,
    date: "2026-05-31",
    meetingType: "regular",
    presiding: "Bishop John Smith",
    conducting: "Brother Mark Johnson",
    openingHymn: { number: 30, title: "Come, Come, Ye Saints" },
    openingPrayer: "Brother William Adams",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 188, title: "Thy Will, O Lord, Be Done" },
    speakers: [
      {
        name: "Sister Grace Wilson",
        topic: "Trusting in the Lord",
        type: "speaker",
      },
      {
        name: "Brother Samuel Reed",
        topic: "Service and Discipleship",
        type: "speaker",
      },
    ],
    closingHymn: { number: 85, title: "How Firm a Foundation" },
    closingPrayer: "Sister Hannah Lewis",
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (!date) {
    return meetings;
  }

  return meetings.filter((meeting) => meeting.date === date);
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}
