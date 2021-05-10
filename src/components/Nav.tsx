import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function Nav() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" className={classes.title}>
          Boost
        </Typography>

        <Link href="/search" passHref>
        <Button color="inherit" startIcon={<HomeIcon/>}>
             Home
        </Button>
        </Link>
        <Link href="/faq">

        <Button color="inherit" startIcon={<HelpIcon/>}>
             FAQ
        </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
