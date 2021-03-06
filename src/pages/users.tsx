import { Grid } from '@material-ui/core';
import deepEqual from 'fast-deep-equal';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import { useState } from 'react';
import useSWR from 'swr';
import UserSearch from './search';
import { getDBA, BusinessAs } from '../database/getDBA';
import { getTaxID, TaxID } from '../database/getTaxID';
import { getPaginatedUsers } from '../database/getPaginatedUsers';
import { getAsString } from '../getAsString';
import { UserCard } from '../components/UserCard';
import { UserModel } from '../../api/User';
import { UserPagination } from '../components/UserPagination';
import { getCities, City } from '../database/getCities';
import { getState, Region } from '../database/getState';
import { getSIC, SIC } from '../database/getSIC';



export interface UsersListProps {
  users: UserModel[];
  dba: BusinessAs[];
  taxID: TaxID[];
  region: Region[];
  city: City[];
  sic: SIC[];
  totalPages: number;
}

export default function UsersList({
  dba, 
  taxID,
  region,
  city,
  sic,  
  users,
  totalPages,
}: UsersListProps) {
  const { query } = useRouter();
  const [serverQuery] = useState(query);

  const { data } = useSWR('/api/users?' + stringify(query), {
    dedupingInterval: 15000,
    initialData: deepEqual(query, serverQuery)
      ? { users, totalPages }
      : undefined,
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={3} lg={2}>
        <UserSearch singleColumn  dba={dba} taxID={taxID} city={city} region={region} sic={sic} />
      </Grid>
      <Grid container item xs={12} sm={7} md={9} lg={10} spacing={3}>
        <Grid item xs={12}>
          <UserPagination totalPages={data?.totalPages} />
        </Grid>
        {(data?.users || []).map((user) => (
          <Grid key={user.id} item xs={12} sm={6}>
            <UserCard user={user} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <UserPagination totalPages={data?.totalPages} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export const getServerSideProps: GetServerSideProps<UsersListProps> = async (
  ctx
) => {

  const firstCity = getAsString(ctx.query.city);

  const [dba, taxID, region, city, sic, pagination] = await Promise.all([
    getDBA(),
    getTaxID(),
    getState(firstCity),
    getCities(),
    getSIC(),
    getPaginatedUsers(ctx.query),
  ]);

  return {
    props: {
      dba,
      taxID,
      region,
      city, 
      sic,
      users: pagination.users,
      totalPages: pagination.totalPages,
    },
  };
};