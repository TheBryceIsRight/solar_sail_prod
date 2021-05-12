import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Card from '@material-ui/core/Card';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '80ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function SearchList() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
    <List className={classes.root}>
      <ListItem alignItems="flex-start" button>
        <ListItemAvatar>
          <Avatar alt="Date 1" src="/date_01.svg" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                component="span"
                variant="h5"
                className={classes.inline}
                color="textPrimary"
              >
                Client Group & Chain Number
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Client Group: 12345  Chain Number: 12345
              </Typography>
            </React.Fragment>
          }
        />
        <ListItemIcon>
                <ChevronRightIcon />
            </ListItemIcon>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start" button>
        <ListItemAvatar>
            <Avatar alt="Date 2" src="/date_02.svg" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                component="span"
                variant="h5"
                className={classes.inline}
                color="textPrimary"
              >
                Multiple Merchant IDs
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                MIDs: 123456789; 123456789
              </Typography>
            </React.Fragment>
          }
        />
                <ListItemIcon>
                <ChevronRightIcon />
            </ListItemIcon>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start" button>
        <ListItemAvatar>
            <Avatar alt="Date 1" src="/date_03.svg" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                component="span"
                variant="h5"
                className={classes.inline}
                color="textPrimary"
              >
                Single Merchant ID
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                MID: 123456789
              </Typography>
            </React.Fragment>
          }
        />
                <ListItemIcon>
                <ChevronRightIcon />
            </ListItemIcon>
      </ListItem>
    </List>
    </Card>
  );
}