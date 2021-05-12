import { Box, Button, Card, CardContent, Checkbox, CheckboxProps, FormControlLabel, FormGroup, MenuItem, TextField, Typography, Container, Grid } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik, useField } from 'formik';
import React, {useState} from 'react';
import { array, boolean, mixed, number, object, string } from 'yup';
import { SignupDetail } from './SignupDetail';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Link from 'next/link';


const initialValues: SignupDetail = {
firstName: "",
lastName: "",
email: "",
password: "",
  acceptedTermsAndConditions: false
};



function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));



export default function SignupForm() {



    const [message, setMessage] = useState<any>(null);
    const [open, setOpen] = React.useState(false);

    async function handleLogin(firstName:string, lastName:string, email:string, password:string) {
      const resp = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        })
      });
      const json = await resp.json();
      setMessage(json);
      if (json.message === 'Sign up successful') {
        setOpen(true);
      }
    }
    
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

    setOpen(false);
    };


  return (
    <React.Fragment>
    <Card>
      <CardContent>
      <Grid container direction="column" spacing={2} justify='center' alignItems='center'>
        <Grid item>
          <Typography variant="h4">Sign up</Typography>
        </Grid>
        <Grid item>
        <Formik
          validationSchema={
            object({
              firstName: string().required('Your first name is required').min(2, 'Too short!').max(100, 'Too long!'),
              lastName: string().required('Your last name is required').min(2, 'Too short!').max(100, 'Too long!'),
              email: string().email('Invalid Email').required('Your email is required').min(5, 'Too short!').max(100,'Too long!'),
              acceptedTermsAndConditions: boolean().oneOf([true], "Please accept the terms and conditions"),
              password: string().required('Your password is required').min(2, 'Too short!').max(100, 'Too long!'),
              // recaptcha: string().required(),
            })
          }
        initialValues={initialValues} onSubmit={(values, formikHelpers) => {
          return new Promise(res => {
            setTimeout(() => {
              console.log(values);
              console.log(formikHelpers);
              console.log('---------');
              console.log("Email test")
              console.log(values.email)
              handleLogin(values.firstName, values.lastName, values.email, values.password)
              res("onSubmitHandler complete");
            }, 2000);
          })
        }}>
          {({ values, errors, isSubmitting, isValidating, setFieldValue }) => (
            <Form>
              <Box marginBottom={2}>
                <FormGroup>
                  <Field name="firstName" as={TextField} label="First Name" variant='outlined' />
                  <ErrorMessage name="firstName" />
                </FormGroup>
              </Box>
              <Box marginBottom={2}>
                <FormGroup>
                  <Field name="lastName" as={TextField} label="Last Name" variant='outlined' />
                  <ErrorMessage name="lastName" />
                </FormGroup>
              </Box>
              <Box marginBottom={2}>
                <FormGroup>
                  <Field name="email" as={TextField} label="Email" variant='outlined' />
                  <ErrorMessage name="email" />
                </FormGroup>
              </Box>
              <Box marginBottom={2}>
                <FormGroup>
                  <Field name="password" type="password" as={TextField} label="Password" variant='outlined' />
                  <ErrorMessage name="password" />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <MyCheckbox
                    name="acceptedTermsAndConditions"
                    label="Accept terms and conditions"
                  />
                  <ErrorMessage name="acceptedTermsAndConditions" />
                </FormGroup>
              </Box>
              {/* <Box marginBottom={2}>
              <Recaptcha
                  sitekey="6Le2nREUAAAAALYuOv7X9Fe3ysDmOmghtj0dbCKW"
                  render="explicit"
                  theme="dark"
                  verifyCallback={(response) => { setFieldValue("recaptcha", response); }}
                  onloadCallback={() => { console.log("done loading!"); }}
                />
              </Box> */}
              <Button variant='contained' color='primary' type="submit" disabled={isSubmitting || isValidating}>Submit</Button>

            <pre>{JSON.stringify(errors, null, 4)}</pre>
              <pre>{JSON.stringify(values, null, 4)}</pre>

            </Form>
          )}
        </Formik>
        </Grid>
        <Grid item>
            <Typography variant='body1'>Already have an account?</Typography>
          </Grid>
          <Grid item>
          <Link href='/Login' passHref>
            <Button variant='outlined' color='primary'>Sign on</Button>
          </Link>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="success">
      Successfully signed up
    </Alert>
  </Snackbar>
    </React.Fragment>

  );
}

export interface MyCheckboxProps extends CheckboxProps {
  name: string;
  value?: string | number;
  label?: string;
}

export function MyCheckbox(props: MyCheckboxProps) {
  const [field] = useField({
    name: props.name,
    type: 'checkbox',
    value: props.value
  });
  return (
    <FormControlLabel
      control={<Checkbox {...props} {...field} />}
      label={props.label}
    />
  );
}
