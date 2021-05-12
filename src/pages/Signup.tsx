import { useRef, useState } from 'react';
import Form from '../../components/SignupForm';
import {Grid, Container} from '@material-ui/core';


export default function Signup() {
  // const emailRef = useRef<HTMLInputElement>(null);
  // const passRef = useRef<HTMLInputElement>(null);
//   const [message, setMessage] = useState<any>(null);
//   let [result, setResult] = useState<any>(null);

//   async function handleLogin() {
//     const resp = await fetch('http://localhost:3000/api/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         email: emailRef.current?.value,
//         password: passRef.current?.value
//       })
//     });
//     const json = await resp.json();
//     setMessage(json);
//   }

//   result = JSON.stringify(message, function(key, val) {
//     if (key !== "password")
//         return val;
// });

  return (
    <div>
      <div>
      <Grid container spacing={2} direction='column' justify='center' alignItems='center'>
      <Grid item>
      <Container>
        <Form />
      </Container>
      </Grid>
    </Grid>
      </div>
      {/* <h1>Create a new user!!</h1>
      {JSON.stringify(result)}
      <input type="text" placeholder="email" ref={emailRef} />
      <input type="password" placeholder="password" ref={passRef} />
      <button onClick={handleLogin}>Sign up</button> */}
    </div>
  );
}
