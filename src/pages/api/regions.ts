import { NextApiRequest, NextApiResponse } from 'next';
import { getModels } from '../../database/getModels';
import { getState } from '../../database/getState';
import { getAsString } from '../../getAsString';

export default async function regions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const city = getAsString(req.query.city);
  const regions = await getState(city);
  res.json(regions);
}
