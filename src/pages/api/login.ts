import { compare } from 'bcrypt';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';
import { secret } from '../../../api/secret';
import { openDB } from '../../openDB';


export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const db = await openDB();

  if (req.method === 'POST') {
    const person = await db.get('select * from person where email = ?', [
      req.body.email
    ]);

    if (typeof person === 'undefined') {
      return res.json({ message: 'Woops, something went wrong! ¯\\_(ツ)_/¯' });
    }

    compare(req.body.password, person.password, function(err, result) {
      if (!err && result ) {
        const claims = { sub: person.id, myPersonEmail: person.email };
        const jwt = sign(claims, secret, { expiresIn: '1h' });

        res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 3600,
          path: '/'
        }));

        res.status(200).json({message: 'Welcome back!'});
      } else {
        res.json({ message: 'Woops, something went wrong! ¯\\_(ツ)_/¯' });
      }
    });
  } else {
    res.status(405).json({ message: 'We only support POST' });
  }
}
