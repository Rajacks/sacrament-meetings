import pool from "./db";
import type { SacramentMeeting } from "./types";

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

async function buildMeeting(row: any): Promise<SacramentMeeting> {
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
