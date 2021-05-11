import { openDB } from '../openDB';

export interface City {
  id: number;
  count: number;
  city: string;
}

export async function getCities() {
  const db = await openDB();
  const cities = await db.all<City[]>(`
    SELECT city, count(*) as count
    FROM user
    GROUP BY city
  `);
  return cities;
}
