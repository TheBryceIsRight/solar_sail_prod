import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Link from 'next/link';
import React from 'react';
import { UserModel } from '../../api/User';

export interface UserCardProps {
  user: UserModel;
}

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  achorTag: {
      textDecoration: 'none'
  }
}));

export function UserCard({ user }: UserCardProps) {
  const classes = useStyles();

  return (
    <Link
      href="/user/[id]"
      as={`/user/${user.id}`}
    >
      <a className={classes.achorTag}>
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                U
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={user.dba}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Details
            </Typography>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}