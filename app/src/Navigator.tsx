import React, { useEffect, useState } from 'react';

export const GuidingContext = React.createContext<any>("/");
const Guide = (props: { children: (any[] | any) }) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const changePath: (arg: string) => void = (newPath: string) => {
        setCurrentPath(newPath);
        window.history.pushState("", "", newPath);
    }
    useEffect(() => {
        window.onpopstate = () => {
            changePath(window.location.pathname);
        }
    }, [])
    return (
        <GuidingContext.Provider value={{ currentPath, changePath }}>
            {props.children}
        </GuidingContext.Provider>
    );
}

export default Guide;