import React, { useContext } from 'react';
import { GuidingContext } from '../Navigator'

interface toHome {
    href: string
}

export const Home = (props: toHome) => {

    const Guide = useContext(GuidingContext);

    if (props.href !== Guide.currentPath)
        return null;

    return <h1>
        welcome home
    </h1>
}