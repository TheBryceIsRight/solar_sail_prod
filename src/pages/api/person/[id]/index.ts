import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';
import { openDB } from '../../../../openDB';


export default async function getPersonById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await openDB();

  if (req.method === 'PUT') {
    const statement = await db.prepare(
      'UPDATE person SET firstName = ?, lastName = ?, email = ? where id = ?'
    );
    const result = await statement.run(
      req.body.fistName,
      req.body.lastName,
      req.body.email,
      req.query.id
    );
    // result.finalize();
  }

  const person = await db.get('select * from person where id = ?', [
    req.query.id
  ]);
  res.json(person);
}
