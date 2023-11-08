import React from 'react';
import { Auth } from 'aws-amplify';

function SignIn() {
  const signIn = async () => {
    try {
      await Auth.signIn('username', 'password');
      console.log('User signed in');
    } catch (error) {
      console.error('Error signing in', error);
    }
  }

  return (
    <div>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
}

export default SignIn;
