import { Button, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, SelectProps } from '@material-ui/core';
import { Field, Form, Formik, useField, useFormikContext } from 'formik';
import { GetServerSideProps } from 'next';
import router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getTaxID, TaxID } from '../database/getTaxID';
import { getDBA, BusinessAs } from '../database/getDBA';
import { getAsString } from '../getAsString';

export interface UserSearchProps {
  dba: BusinessAs[];
  taxID: TaxID[];
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

export default function Search({ dba, taxID, singleColumn }: UserSearchProps) {
  const classes = useStyles();
  const { query } = useRouter();
  const smValue = singleColumn ? 12 : 6;

  const [initialValues] = useState({
    dba: getAsString(query.dba) || 'all',
    taxID: getAsString(query.taxID) || 'all',
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
                  <InputLabel id="search-make">Users</InputLabel>
                  <Field
                    name="users"
                    as={Select}
                    labelId="search-users"
                    label="Users"
                  >
                    <MenuItem value="all">
                      <em>All Users</em>
                    </MenuItem>
                    {dba.map((name) => (
                      <MenuItem key={name.name} value={name.name}>
                        {`${name.name}`}
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
                    labelId="search-users"
                    label="Users"
                  >
                    <MenuItem value="all">
                      <em>All IDs</em>
                    </MenuItem>
                    {taxID.map((name) => (
                      <MenuItem key={name.name} value={name.name}>
                        {`${name.name}`}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
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
