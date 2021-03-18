import React, { useContext, useEffect } from 'react';
import { GuidingContext } from '../Navigator'
import { styled, makeStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import { flex } from '../styles';

interface toHome {
    href: string
}

const StyledWrapper = styled('div')({
    width: '100%',
    height: '100%',
    overflow: 'auto',
    position: 'relative',
})

const StyledAppBar = styled(AppBar)({
    height: '60px',
    background: '#0d3d6d',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
})

const StyledPortrait = styled('img')({
    maxWidth: '60px',
    maxHeight: '60px',
})

const useStyles = makeStyles({
    navChildren: {
        marginLeft: '10px',
        cursor: 'default'
    },
})

export const Home = (props: toHome) => {

    const classes = useStyles();
    const Guide = useContext(GuidingContext);

    if (props.href !== Guide.currentPath)
        return null;

    return <StyledWrapper>
        <StyledAppBar position='static'>
            <div className={flex({}).flex}>
                <StyledPortrait className={classes.navChildren} src={Guide.userInfo.image} />
                {<h3 className={classes.navChildren}>{Guide.userInfo.username}</h3>}
            </div>

        </StyledAppBar>
        <h1>Welcome Home</h1>
        <AppBar style={{ background: '#0d3d6d', top: 'auto', bottom: '0px', height: '15px' }} position='absolute'></AppBar>
    </StyledWrapper>
}