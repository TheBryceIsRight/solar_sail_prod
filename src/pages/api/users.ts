import { NextApiRequest, NextApiResponse } from 'next';
import { getPaginatedUsers } from '../../database/getPaginatedUsers';

export default async function users(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const users = await getPaginatedUsers(req.query);
  res.json(users);
}