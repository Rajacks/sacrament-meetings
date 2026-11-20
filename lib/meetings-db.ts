import pool from "./db";
import type { MeetingType, SacramentMeeting } from "./types";

interface MeetingRow {
  id: number;
  date: string;
  meeting_type: MeetingType;
  presiding: string;
  conducting: string;
  opening_hymn_number: number;
  opening_hymn_title: string;
  opening_prayer: string;
  sacrament_hymn_number: number;
  sacrament_hymn_title: string;
  closing_hymn_number: number;
  closing_hymn_title: string;
  closing_prayer: string;
  stake_business: boolean;
}

const meetingColumns = `
  id,
  TO_CHAR(date, 'YYYY-MM-DD') AS date,
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
`;

async function buildMeeting(row: MeetingRow): Promise<SacramentMeeting> {
  const meetingId: number = row.id;

  const [announcementsResult, businessResult, speakersResult] =
    await Promise.all([
      pool.query(
        "SELECT description FROM announcements WHERE meeting_id = $1",
        [meetingId],
      ),
      pool.query(
        "SELECT description FROM ward_business WHERE meeting_id = $1",
        [meetingId],
      ),
      pool.query(
        "SELECT name, topic, type FROM speakers WHERE meeting_id = $1",
        [meetingId],
      ),
    ]);

  return {
    id: meetingId,
    date: row.date,
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: announcementsResult.rows.map((item) => item.description),
    openingHymn: {
      number: row.opening_hymn_number,
      title: row.opening_hymn_title,
    },
    openingPrayer: row.opening_prayer,
    wardBusiness: businessResult.rows.map((item) => ({
      description: item.description,
    })),
    stakeBusiness: row.stake_business,
    sacramentHymn: {
      number: row.sacrament_hymn_number,
      title: row.sacrament_hymn_title,
    },
    speakers: speakersResult.rows.map((speaker) => ({
      name: speaker.name,
      topic: speaker.topic,
      type: speaker.type,
    })),
    closingHymn: {
      number: row.closing_hymn_number,
      title: row.closing_hymn_title,
    },
    closingPrayer: row.closing_prayer,
  };
}

// Get all meetings, optionally filtered by date
export async function getMeetings(
  date?: string | null,
): Promise<SacramentMeeting[]> {
  const result = await pool.query(
    `SELECT ${meetingColumns}
     FROM meetings
     WHERE ($1::date IS NULL OR date = $1::date)
     ORDER BY date`,
    [date ?? null],
  );

  return Promise.all(result.rows.map(buildMeeting));
}

// Search and paginate meetings
export async function getMeetingsPaginated(query = "", page = 1, limit = 5) {
  const search = query.trim();
  const offset = (page - 1) * limit;

  const searchCondition = `
    (
      meeting_type ILIKE $1
      OR presiding ILIKE $1
      OR conducting ILIKE $1
      OR EXISTS (
        SELECT 1
        FROM speakers
        WHERE speakers.meeting_id = meetings.id
        AND speakers.name ILIKE $1
      )
    )
  `;

  const searchValue = `%${search}%`;

  const countResult = await pool.query(
    `SELECT COUNT(*) AS total
     FROM meetings
     WHERE ($2 = '' OR ${searchCondition})`,
    [searchValue, search],
  );

  const total = Number(countResult.rows[0].total);
  const totalPages = Math.ceil(total / limit);

  const meetingsResult = await pool.query(
    `SELECT ${meetingColumns}
     FROM meetings
     WHERE ($2 = '' OR ${searchCondition})
     ORDER BY date
     LIMIT $3 OFFSET $4`,
    [searchValue, search, limit, offset],
  );

  const meetings = await Promise.all(meetingsResult.rows.map(buildMeeting));

  return {
    meetings,
    total,
    page,
    totalPages,
  };
}

// Get one meeting by ID
export async function getMeetingById(
  id: number,
): Promise<SacramentMeeting | null> {
  const result = await pool.query(
    `SELECT ${meetingColumns}
     FROM meetings
     WHERE id = $1`,
    [id],
  );

  if (result.rows.length === 0) {
    return null;
  }

  return buildMeeting(result.rows[0]);
}

// Input type for creating or updating a meeting
export type MeetingInput = Omit<SacramentMeeting, "id">;

// Create a new meeting and its related records
export async function createMeeting(meeting: MeetingInput): Promise<number> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const meetingResult = await client.query(
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
      VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, $13
      )
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

    const meetingId: number = meetingResult.rows[0].id;

    // Insert announcements
    for (const announcement of meeting.announcements ?? []) {
      await client.query(
        `INSERT INTO announcements (meeting_id, description)
         VALUES ($1, $2)`,
        [meetingId, announcement],
      );
    }

    // Insert ward business
    for (const item of meeting.wardBusiness) {
      await client.query(
        `INSERT INTO ward_business (meeting_id, description)
         VALUES ($1, $2)`,
        [meetingId, item.description],
      );
    }

    // Insert speakers and musical numbers
    for (const speaker of meeting.speakers) {
      await client.query(
        `INSERT INTO speakers (meeting_id, name, topic, type)
         VALUES ($1, $2, $3, $4)`,
        [meetingId, speaker.name, speaker.topic, speaker.type],
      );
    }

    await client.query("COMMIT");

    return meetingId;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

// Update an existing meeting and replace its related records
export async function updateMeeting(
  id: number,
  meeting: MeetingInput,
): Promise<boolean> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const meetingResult = await client.query(
      `UPDATE meetings
       SET
         date = $1,
         meeting_type = $2,
         presiding = $3,
         conducting = $4,
         opening_hymn_number = $5,
         opening_hymn_title = $6,
         opening_prayer = $7,
         sacrament_hymn_number = $8,
         sacrament_hymn_title = $9,
         closing_hymn_number = $10,
         closing_hymn_title = $11,
         closing_prayer = $12,
         stake_business = $13
       WHERE id = $14
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
        id,
      ],
    );

    // Stop if the meeting does not exist
    if (meetingResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return false;
    }

    // Remove old related records
    await client.query("DELETE FROM announcements WHERE meeting_id = $1", [id]);

    await client.query("DELETE FROM ward_business WHERE meeting_id = $1", [id]);

    await client.query("DELETE FROM speakers WHERE meeting_id = $1", [id]);

    // Insert updated announcements
    for (const announcement of meeting.announcements ?? []) {
      await client.query(
        `INSERT INTO announcements (meeting_id, description)
         VALUES ($1, $2)`,
        [id, announcement],
      );
    }

    // Insert updated ward business
    for (const item of meeting.wardBusiness) {
      await client.query(
        `INSERT INTO ward_business (meeting_id, description)
         VALUES ($1, $2)`,
        [id, item.description],
      );
    }

    // Insert updated speakers and musical numbers
    for (const speaker of meeting.speakers) {
      await client.query(
        `INSERT INTO speakers (meeting_id, name, topic, type)
         VALUES ($1, $2, $3, $4)`,
        [id, speaker.name, speaker.topic, speaker.type],
      );
    }

    await client.query("COMMIT");

    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

// Delete a meeting
export async function deleteMeeting(id: number): Promise<boolean> {
  const result = await pool.query(
    `DELETE FROM meetings
     WHERE id = $1
     RETURNING id`,
    [id],
  );

  return (result.rowCount ?? 0) > 0;
}
