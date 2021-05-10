import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { UserModel } from '../../../api/User';
import { openDB } from '../../openDB';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
  img: {
    width: '100%',
  },
}));

interface UserDetailsProps {
  user: UserModel | null | undefined;
}

export default function UserDetails({ user }: UserDetailsProps) {
  const classes = useStyles();

  if (!user) {
    return <h1>Sorry, something went wrong!</h1>;
  }

  return (
    <div>
      <Head>
        <title>{user.dba}</title>
      </Head>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={7} container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="h5">
                  {user.dba}
                </Typography>
                <Typography variant="h5">
                  Some details
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<UserDetailsProps> = async (ctx) => {
  const id = ctx.params.id;
  const db = await openDB();
  const user = await db.get<UserModel | undefined>(
    'SELECT * FROM user where id = ?',
    id
  );
  return { props: { user: user || null } };
};
