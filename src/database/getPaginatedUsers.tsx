import { ParsedUrlQuery } from 'querystring';
import { UserModel } from '../../api/User';
import { getAsString } from '../getAsString';
import { openDB } from '../openDB';

const mainQuery = `
    FROM user
    WHERE (@dba is NULL OR @dba = dba)
    AND (@taxID is NULL OR @taxID = taxID)
`;

export async function getPaginatedUsers(query: ParsedUrlQuery) {
  const db = await openDB();

  const page = getValueNumber(query.page) || 1;
  const rowsPerPage = getValueNumber(query.rowsPerPage) || 4;
  const offset = (page - 1) * rowsPerPage;

  const dbParams = {
    '@dba': getValueStr(query.dba),
    '@taxID': getValueStr(query.taxID),
  };

  const usersPromise = db.all<UserModel[]>(
    `SELECT * ${mainQuery} LIMIT @rowsPerPage OFFSET @offset`,
    {
      ...dbParams,
      '@rowsPerPage': rowsPerPage,
      '@offset': offset,
    }
  );

  const totalRowsPromise = db.get<{ count: number }>(
    `SELECT COUNT(*) as count ${mainQuery}`,
    dbParams
  );

  const [users, totalRows] = await Promise.all([usersPromise, totalRowsPromise]);

  return { users, totalPages: Math.ceil(totalRows.count / rowsPerPage) };
}

function getValueNumber(value: string | string[]) {
  const str = getValueStr(value);
  const number = parseInt(str);
  return isNaN(number) ? null : number;
}

function getValueStr(value: string | string[]) {
  const str = getAsString(value);
  return !str || str.toLowerCase() === 'all' ? null : str;
}
