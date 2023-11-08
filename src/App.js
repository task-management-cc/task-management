import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import TaskList from './TaskList';
Amplify.configure(awsExports);

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Welcome {user.username}!!</h1>
          <TaskList />
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}