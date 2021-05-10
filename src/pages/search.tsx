import { Button, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, SelectProps, Typography } from '@material-ui/core';
import { Field, Form, Formik, useField, useFormikContext } from 'formik';
import { GetServerSideProps } from 'next';
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getTaxID, TaxID } from '../database/getTaxID';
import { getDBA, BusinessAs } from '../database/getDBA';
// import { getRegion, Region } from '../database/getRegion';
import { getCities, City } from '../database/getCities';
import { getState, Region } from '../database/getState';

import { getAsString } from '../getAsString';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";


export interface UserSearchProps {
  dba: BusinessAs[];
  taxID: TaxID[];
  region: Region[];
  city: City[];
  singleColumn?: boolean;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 'auto',
    maxWidth: 500,
    padding: theme.spacing(3),
  },
}));

const prices = [500, 1000, 5000, 15000, 25000, 50000, 250000];

export default function Search({ dba, taxID, region, city,  singleColumn }: UserSearchProps) {
  const classes = useStyles();
  const { query } = useRouter();
  const smValue = singleColumn ? 12 : 6;

  const [initialValues] = useState({
    dba: getAsString(query.dba) || 'all',
    taxID: getAsString(query.taxID) || 'all',
    region: getAsString(query.region) || 'all',
    city: getAsString(query.region) || 'all',
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        router.push(
          {
            pathname: '/users',
            query: { ...values, page: 1 },
          },
          undefined,
          { shallow: true }
        );
      }}
    >
      {({ values }) => (
        <Form>
          <Paper elevation={5} className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={smValue}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-users">DBA</InputLabel>
                  <Field
                    name="dba"
                    as={Select}
                    labelId="search-users"
                    label="DBA"
                  >
                    <MenuItem value="all">
                      <em>All Businesses</em>
                    </MenuItem>
                    {dba.map((dba) => (
                      <MenuItem key={dba.dba} value={dba.dba}>
                        {dba.dba}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={smValue}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-taxID">Tax ID</InputLabel>
                  <Field
                    name="taxID"
                    as={Select}
                    labelId="search-taxid"
                    label="Tax ID"
                  >
                    <MenuItem value="all">
                      <em>All IDs</em>
                    </MenuItem>
                    {taxID.map((taxID) => (
                      <MenuItem key={taxID.taxID} value={taxID.taxID}>
                      {taxID.taxID}
                    </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={smValue}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-city">City</InputLabel>
                  <Field
                    name="city"
                    as={Select}
                    labelId="search-city"
                    label="City"
                  >
                    <MenuItem value="all">
                      <em>All Cities</em>
                    </MenuItem>
                    {city.map((city) => (
                      <MenuItem key={city.city} value={city.city}>
                      {city.city}
                    </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12} sm={smValue}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-region">State</InputLabel>
                  <Field
                    name="region"
                    as={Select}
                    labelId="search-region"
                    label="State"
                  >
                    <MenuItem value="all">
                      <em>All States</em>
                    </MenuItem>
                    {region.map((region) => (
                      <MenuItem key={region.region} value={region.region}>
                      {region.region}
                    </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid> */}
              <Grid item xs={12} sm={smValue}>
                <RegionSelect initialCity={initialValues.city} city={values.city} name="region" region={region} />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Form>
      )}
    </Formik>
  );
}

export interface RegionSelectProps extends SelectProps {
  name: string;
  region: Region[];
  city: string;
  initialCity: string;
}

export function RegionSelect({ initialCity, region, city, ...props }: RegionSelectProps) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField({
    name: props.name
  });

  const initialRegionsOrUndefined = city === initialCity ? region : undefined;

  const { data: newRegions } = useSWR<Region[]>('/api/regions?city=' + city, {
    dedupingInterval: 60000,
    initialData: city === 'all' ? [] : initialRegionsOrUndefined 
  });

  useEffect(() => {
    if (!newRegions?.map((a) => a.region).includes(field.value)) {
      setFieldValue('region', 'all');
    }
  }, [city, newRegions]);

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="search-region">State</InputLabel>
      <Select
        name="region"
        labelId="search-region"
        label="State"
        {...field}
        {...props}
      >
        <MenuItem value="all">
          <em>All States</em>
        </MenuItem>
        {newRegions?.map((region) => (
          <MenuItem key={region.region} value={region.region}>
            {region.region}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export const getServerSideProps: GetServerSideProps<UserSearchProps> = async (
  ctx
) => {

  const firstCity = getAsString(ctx.query.city);

  const [taxID, dba, region, city] = await Promise.all([getTaxID(), getDBA(), getState(firstCity), getCities()]);

  return { props: { taxID, dba, region, city } };
};
