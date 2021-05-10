import { openDB } from '../openDB';

export interface BusinessAs {
  id: number;
  name: string;
  count: number;
}

export async function getDBA() {
  const db = await openDB();
  const dbas = await db.all<BusinessAs[]>(`
    SELECT dba, count(*) as count
    FROM user
    GROUP BY dba
  `);
  return dbas;
}
