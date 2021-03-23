import React, { useEffect, useState } from 'react';
import { toLogin, Login } from './Login';

interface toIsLoggedIn {
    children: (any[] | any),
}

const Loader = () => {
    return <img src='/loading_bar.gif' />
}

const IsLoggedIn = (props: toIsLoggedIn): JSX.Element => {

    const [loading, setLoading] = useState<number>(0);
    //0 - init
    //1 - show login
    //2 - retry
    //3 - showpage

    useEffect(() => {
        (async () => {
            let res = await fetch('http://localhost:8000/auth/userinfo', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => res.json());

            if (res.redirect) {
                //try to refresh using refresh token;
                let token = await fetch('http://localhost:8000/auth/refresh', {
                    method: "GET",
                    credentials: "include"
                }).then(res => res.json());

                if (token.err) {
                    // alert(token.err);
                    //show login page.
                    setLoading(1);
                } else {
                    //recieve new token.
                    localStorage.setItem('token', token.token);
                    setLoading(2);
                }

            } else if (res.err) {
                alert(res.err);
            } else {
                //actually have userinfo
                setLoading(3);
            }

        })();

    });

    return <>
        {loading === 3 ? props.children : loading === 1 ? <Login /> : <Loader />}
    </>
}

export default IsLoggedIn;