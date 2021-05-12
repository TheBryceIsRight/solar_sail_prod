import { Container, Grid } from '@material-ui/core';
import React from 'react';
import { FormDemo } from '../../components/FormDemo';

const Formik: React.FC = () => {
  return (
    <React.Fragment>
    <Grid container spacing={2} direction='column' justify='center' alignItems='flex-start'>
      <Grid item>
      <Container>
        <FormDemo />
      </Container>
      </Grid>
    </Grid>

    </React.Fragment>

  );
};

export default Formik;
