import { hash } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';
import { openDB } from '../../openDB';


export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await openDB();

  if (req.method === 'POST') {
    hash(req.body.password, 10, async function(err, hash) {
      // Store hash in your password DB.

      const statement = await db.prepare(
        'INSERT INTO person (firstName, lastName, email, password) values (?, ?, ?, ?)'
      );
      const result = await statement.run(req.body.firstName, req.body.lastName, req.body.email, hash);
      // result.finalize();

      const person = await db.all('select * from person');
      res.status(200).json({ message: 'Sign up successful' });
    });
  } else {
    res.status(405).json({ message: 'We only support POST' });
  }
}
