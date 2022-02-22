import * as React from 'react';

const useAuth = () => {
  const [authed, setAuthed] = React.useState(false);

  const login = () => new Promise(() => {
    setAuthed(true);
    console.log('login', authed);
    setTimeout(() => {
    }, 2000);
  });

  const logout = () => new Promise(() => {
    setAuthed(false);
    console.log('login', authed);
    setTimeout(() => {
    }, 2000);
  });

  return { authed, login, logout };
}

export default useAuth;