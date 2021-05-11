import { openDB } from '../openDB';

export interface SIC {
  id: number;
  name: string;
  count: number;
  sic: string;
}

export async function getSIC() {
  const db = await openDB();
  const dbas = await db.all<SIC[]>(`
    SELECT sic, count(*) as count
    FROM user
    GROUP BY sic
  `);
  return dbas;
}
