// pages/404.js
import React from 'react';
import Head from 'next/Head';
import Image from 'next/image';
import {Grid} from '@material-ui/core';
import {Typography} from '@material-ui/core';


export default function Custom404() {

    return ( <React.Fragment>
    <Head>
        <title>404 Page Not Found</title>
    </Head>
    <Grid container direction='column' spacing={5} alignItems='center' justify='center'>
        <Grid item>
            <Typography variant='h2'>Sorry about that :(</Typography>
            
        </Grid>
        <Grid item>
            <Typography variant='subtitle1'>Error 404 - We couldn't find this page</Typography>
        </Grid>
            <Grid item>
            <Image
                src='/photos/custom/not_found.svg'
                alt='404 Page not found'
                width={754}
                height={750}
                />
            </Grid>
            </Grid>
            </React.Fragment>
   )
  }