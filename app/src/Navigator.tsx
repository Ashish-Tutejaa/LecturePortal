import React, { useEffect, useState } from 'react';
const def = 'default';

export const GuidingContext = React.createContext<{ currentPath: { path: string }, changePath: ((prop: string) => void) }>({ currentPath: { path: "/" }, changePath: ((def) => { console.log('you\'re in default') }) });

const Guide = (props: { children: (any[] | any) }) => {
    const [currentPath, setCurrentPath] = useState({ path: window.location.pathname });

    const changePath: (arg: string) => void = (newPath: string) => {
        console.log('changing paths...');
        setCurrentPath({ path: newPath });
        window.history.pushState("", "", newPath);
    }

    useEffect(() => {
        window.onpopstate = () => {
            setCurrentPath({ path: window.location.pathname });
        }
    }, [])

    console.log('changing here...');

    return (
        <GuidingContext.Provider value={{ currentPath, changePath }}>
            {props.children}
        </GuidingContext.Provider>
    );
}

export default Guide;