import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';
import { openDB } from '../../../../openDB';


export default async function getAllVehiclesByPersonId(req: NextApiRequest, res: NextApiResponse) {
    const db = await openDB();
    const allVehicles = await db.all('select * from vehicle where ownerId = ?', [req.query.id]);
    res.json(allVehicles);
} 