import { openDB } from '../openDB';

export interface TaxID {
    name: string;
    count: number;
}

export async function getTaxID() {
  const db = await openDB();
  const taxids = await db.all<TaxID[]>(`
    SELECT taxid, count(*) as count
    FROM user
    GROUP BY taxid
  `);
  return taxids;
}
