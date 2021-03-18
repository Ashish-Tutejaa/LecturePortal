import React, { useEffect, useState } from 'react';

export const GuidingContext = React.createContext<any>("/");
const Guide = (props: { children: (any[] | any) }) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const [userInfo, setUserInfo] = useState<{ username: string, image: string }>({ username: "Anonymous", image: "none" });
    const changePath: (arg: string) => void = (newPath: string) => {
        setCurrentPath(newPath);
        window.history.pushState("", "", newPath);
    }
    const setUser = (username: string, image: string) => {
        setUserInfo({ username, image });
    }

    useEffect(() => {
        if (localStorage.getItem('username') && localStorage.getItem('image_url')) {
            setUserInfo({
                username: localStorage.getItem('username') as string,
                image: localStorage.getItem('image_url') as string,
            })
        }
    }, []);

    useEffect(() => {
        window.onpopstate = () => {
            changePath(window.location.pathname);
        }
    }, [])
    return (
        <GuidingContext.Provider value={{ currentPath, changePath, userInfo, setUser }}>
            {props.children}
        </GuidingContext.Provider>
    );
}

export default Guide;