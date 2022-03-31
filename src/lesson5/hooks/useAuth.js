import React from "react";

const useAuth = () => {
    const [authed, setAuthed] = React.useState(false);
    const [token, setToken] = React.useState('');

    const login = (token) => new Promise(() => {
        setAuthed(true);
        setToken(token);
        setTimeout(() => {
            console.log('login', authed);
        }, 2000);
    });

    const logout = () => new Promise(() => {
        setAuthed(false);
        setToken('');
        setTimeout(() => {
            console.log('login', authed);
        }, 2000);
    });

    return { authed, token, login, logout };
}

export default useAuth;