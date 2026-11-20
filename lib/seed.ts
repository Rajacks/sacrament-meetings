import { loadEnvConfig } from "@next/env";
import type { SacramentMeeting } from "./types";

loadEnvConfig(process.cwd());

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
    speakers: [
      {
        name: "Ward Members",
        topic: "Testimonies",
        type: "speaker",
      },
    ],
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

async function seedDatabase() {
  const { default: pool } = await import("./db");
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    for (const meeting of meetings) {
      const result = await client.query(
        `INSERT INTO meetings (
          date,
          meeting_type,
          presiding,
          conducting,
          opening_hymn_number,
          opening_hymn_title,
          opening_prayer,
          sacrament_hymn_number,
          sacrament_hymn_title,
          closing_hymn_number,
          closing_hymn_title,
          closing_prayer,
          stake_business
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING id`,
        [
          meeting.date,
          meeting.meetingType,
          meeting.presiding,
          meeting.conducting,
          meeting.openingHymn.number,
          meeting.openingHymn.title,
          meeting.openingPrayer,
          meeting.sacramentHymn.number,
          meeting.sacramentHymn.title,
          meeting.closingHymn.number,
          meeting.closingHymn.title,
          meeting.closingPrayer,
          meeting.stakeBusiness,
        ],
      );

      const meetingId: number = result.rows[0].id;

      for (const announcement of meeting.announcements ?? []) {
        await client.query(
          `INSERT INTO announcements (meeting_id, description)
           VALUES ($1, $2)`,
          [meetingId, announcement],
        );
      }

      for (const item of meeting.wardBusiness) {
        await client.query(
          `INSERT INTO ward_business (meeting_id, description)
           VALUES ($1, $2)`,
          [meetingId, item.description],
        );
      }

      for (const speaker of meeting.speakers) {
        await client.query(
          `INSERT INTO speakers (meeting_id, name, topic, type)
           VALUES ($1, $2, $3, $4)`,
          [meetingId, speaker.name, speaker.topic, speaker.type],
        );
      }
    }

    await client.query("COMMIT");
    console.log("Successfully seeded 5 sacrament meetings!");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Seeding failed:", error);
  } finally {
    client.release();
    await pool.end();
  }
}

seedDatabase();
