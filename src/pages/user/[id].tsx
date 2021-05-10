import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { UserModel } from '../../../api/User';
import { openDB } from '../../openDB';
import Image from 'next/image';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MapIcon from '@material-ui/icons/Map';
import Checkbox from '@material-ui/core/Checkbox';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import WorkIcon from '@material-ui/icons/Work';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  avatar: {
    backgroundColor: '#1D1E1F',
  },
}));

interface UserDetailsProps {
  user: UserModel | null | undefined;
}

export default function UserDetails({ user }: UserDetailsProps) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);


  if (!user) {
    return <Typography variant='h6'>Sorry, something went wrong!</Typography>;
  }

  return (
    <div>
      <Head>
        <title>{user.dba}</title>
      </Head>
        <Grid container spacing={3} alignItems='center' justify='center'>
          <Grid item xs={12} sm={6} md={7} container >
          <Paper className={classes.paper}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="h5">
                  {user.dba}
                </Typography>
              </Grid>

              <Grid item xs>
                <Typography variant="h6">
                  Company Details
                </Typography>
                  <List dense={dense}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classes.avatar}>
                            <MapIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Location"
                          secondary={user.address1 + ' ' + user.city + ', ' + user.region+ ' '+user.postalCode}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classes.avatar}>
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Point of Contact"
                          secondary= {user.merchantName}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classes.avatar}>
                            <WorkIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Merchant ID"
                          secondary= {user.externalMID}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classes.avatar}>
                            <FingerprintIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Tax ID"
                          secondary= {user.taxID}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classes.avatar}>
                            <TimelapseIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Tenure"
                          secondary= {user.tenure}
                        />
                      </ListItem>
            
                  </List>
              </Grid>
              <Grid item xs>
              <FormControlLabel
                control={
                  <Checkbox checked={dense} onChange={(event) => setDense(event.target.checked)} />
                }
                label="Enable dense formatting"
              />
              </Grid>
              
              <Grid item>
              <Image
              src={user.logoUrl}
              alt={"Logo of "+user.dba}
              width={user.logoWidth}
              height={user.logoHeight}
              >
              </Image>
              </Grid>
            </Grid>
            </Paper>
          </Grid>
        </Grid>
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
