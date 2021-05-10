import { openDB } from '../openDB';

export interface Region {
  id: number;
  name: string;
  count: number;
  region: string;
}

export async function getRegion() {
  const db = await openDB();
  const dbas = await db.all<Region[]>(`
    SELECT region, count(*) as count
    FROM user
    GROUP BY region
  `);
  return dbas;
}
