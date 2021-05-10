import { Button, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, SelectProps, Typography } from '@material-ui/core';
import { Field, Form, Formik, useField, useFormikContext } from 'formik';
import { GetServerSideProps } from 'next';
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getTaxID, TaxID } from '../database/getTaxID';
import { getDBA, BusinessAs } from '../database/getDBA';
import { getAsString } from '../getAsString';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";


export interface UserSearchProps {
  dba: BusinessAs[];
  taxID: TaxID[];
  singleColumn?: boolean;
}

export const cities = [{
    state: "Illinois",
    name: "Chicago",
    id: 3,
}, {
    state: "Texas",
    name: "Houston",
    id: 2
}, {
    state: "California",
    name: "Los Angeles",
    id: 1
}, {
    state: "New York",
    name: "New York City",
    id: 4
}];


const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 'auto',
    maxWidth: 500,
    padding: theme.spacing(3),
  },
}));

const prices = [500, 1000, 5000, 15000, 25000, 50000, 250000];

export default function Search({ dba, taxID, singleColumn }: UserSearchProps) {
  const classes = useStyles();
  const { query } = useRouter();
  const smValue = singleColumn ? 12 : 6;

  const [initialValues] = useState({
    dba: getAsString(query.dba) || 'all',
    taxID: getAsString(query.taxID) || 'all',
    city_id: getAsString(query.taxID) || 'all',
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
      {({ values, setFieldValue }) => (
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
                      <em>All businesses</em>
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
                  <InputLabel id="search-taxID">IDs</InputLabel>
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
              {/* <Grid item xs={12} sm={smValue}>
                <Autocomplete
                    id="taxID"
                    options={taxID}
                    getOptionLabel={option => option.name}
                    onChange={(e, value) => {
                        console.log(value);
                        setFieldValue(
                          "Tax ID: ",
                          value !== null ? value : initialValues.taxID
                        );
                      }}
                    renderInput={params => (
                    <TextField
                        margin="normal"
                        label="Tax ID"
                        fullWidth
                        name="taxID"
                        variant='outlined'
                        {...params}
                    />
                    )}
                />
              </Grid>
               */}
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

// export interface ModelSelectProps extends SelectProps {
//   name: string;
//   models: Model[];
//   make: string;
//   initialMake: string;
// }

// export function ModelSelect({ initialMake, models, make, ...props }: ModelSelectProps) {
//   const { setFieldValue } = useFormikContext();
//   const [field] = useField({
//     name: props.name
//   });

//   const initialModelsOrUndefined = make === initialMake ? models : undefined;

//   const { data: newModels } = useSWR<Model[]>('/api/models?make=' + make, {
//     dedupingInterval: 60000,
//     initialData: make === 'all' ? [] : initialModelsOrUndefined 
//   });

//   useEffect(() => {
//     if (!newModels?.map((a) => a.model).includes(field.value)) {
//       setFieldValue('model', 'all');
//     }
//   }, [make, newModels]);

//   return (
//     <FormControl fullWidth variant="outlined">
//       <InputLabel id="search-model">Model</InputLabel>
//       <Select
//         name="model"
//         labelId="search-model"
//         label="Model"
//         {...field}
//         {...props}
//       >
//         <MenuItem value="all">
//           <em>All Models</em>
//         </MenuItem>
//         {newModels?.map((model) => (
//           <MenuItem key={model.model} value={model.model}>
//             {`${model.model} (${model.count})`}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// }

export const getServerSideProps: GetServerSideProps<UserSearchProps> = async (
  ctx
) => {

  const [taxID, dba] = await Promise.all([getTaxID(), getDBA()]);

  return { props: { taxID, dba } };
};
