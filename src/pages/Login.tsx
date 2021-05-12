import { useRef, useState } from 'react';
import {TextField, Button, Container} from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Form from '../../components/LoginForm';

export default function Login() {

  // const [message, setMessage] = useState<any>(null);
  // async function handleLogin() {
  //   const resp = await fetch('http://localhost:3000/api/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       email: emailRef.current?.value,
  //       password: passRef.current?.value
  //     })
  //   });
  //   const json = await resp.json();
  //   setMessage(json);
    
  // }

  return (
    <div>
      <Grid container spacing={2} direction='column' justify='center' alignItems='center'>
      <Grid item>
      <Container>
        <Form />
      </Container>
      </Grid>
    </Grid>
    {/* <br/>
    <br/> */}
      {/* {console.log(JSON.stringify(message))} */}
      {/* <br/><br/> */}
      {/* <input type="text" placeholder="email" ref={emailRef} />
      <br/>
      <input type="password" placeholder="password" ref={passRef} />
      <br/>
      <br/>
      <button onClick={handleLogin}>Login</button> */}

    </div>
  );
}
