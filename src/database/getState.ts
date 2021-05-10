import { openDB } from '../openDB';

export interface Region {
  id: number;
  count: number;
  region: string;
}

export async function getState(city: string) {
  const db = await openDB();
  const region = await db.all<Region[]>(
    `
        SELECT region, count(*) as count
        FROM user
        WHERE city = @city
        GROUP BY region
    `,
    { '@city': city }
  );
  return region;
}
