import React, { useContext, useEffect, useState } from 'react';
import { GuidingContext } from '../Navigator'
import { styled, makeStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import { flex } from '../styles';
import DeviceSelect from './DeviceSelect';
import VideoFeed from './VideoFeed';

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

    const [devices, setDevices] = useState<Array<MediaDeviceInfo | InputDeviceInfo>>([]);
    const classes = useStyles();
    const Guide = useContext(GuidingContext);
    const flexStyle = flex({});
    const WrapperFlex = flex({ disp: 'flex', flow: 'column nowrap', jc: 'space-between', ai: 'center' });

    useEffect(() => {
        (async () => {
            if ('mediaDevices' in window.navigator && 'getUserMedia' in window.navigator.mediaDevices) {
                if (props.href !== Guide.currentPath)
                    return;
                let permission = await navigator.mediaDevices.getUserMedia({ video: true });
                navigator.mediaDevices.enumerateDevices().then(res => {
                    console.log(res);
                    setDevices(res);
                });
            }
        })();
    }, []);

    if (props.href !== Guide.currentPath)
        return null;

    return <StyledWrapper className={WrapperFlex.flex}>
        <StyledAppBar position='static'>
            <div className={flexStyle.flex}>
                <StyledPortrait className={classes.navChildren} src={Guide.userInfo.image} />
                {<h3 className={classes.navChildren}>{Guide.userInfo.username}</h3>}
            </div>

        </StyledAppBar>
        <h1>Welcome Home</h1>
        <DeviceSelect devices={devices} />
        <VideoFeed />
        <iframe style={{ margin: '30px 0px' }} width="500" height="500" src="https://www.youtube.com/embed/vOXZkm9p_zY"
            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        <AppBar style={{ background: '#0d3d6d', height: "15px" }} position='static'></AppBar>
    </StyledWrapper>
}