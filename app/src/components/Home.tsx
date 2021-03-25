import React, { useContext, useEffect, useState } from 'react';
import { GuidingContext } from '../Navigator'
import { styled, makeStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import { flex } from '../styles';
import Decider from './Decider';

export interface toHome {

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
    const [selectedDeviceID, setSelectedDeviceID] = useState<string | undefined>(undefined);
    const [userInfo, setUserInfo] = useState<{ image: string, username: string }>({ image: "", username: "" });
    const [lecture, setLecture] = useState<null | { [props: string]: string }>(null);

    const classes = useStyles();
    const Guide = useContext(GuidingContext);
    const flexStyle = flex({});
    const WrapperFlex = flex({ disp: 'flex', flow: 'column nowrap', jc: 'space-between', ai: 'center' });

    const logout = async () => {
        let res = await fetch('http://localhost:8000/auth/signout', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: "include",
        }).then(res => res.json());
        if (res.err) {
            alert(res.err);
        } else {
            localStorage.removeItem('token');
            Guide.changePath('/');
        }
    }

    useEffect(() => {

        (async () => {
            let res = await fetch('http://localhost:8000/auth/userinfo', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }).then(res => res.json());
            console.log(res);

            //getting latest lecture
            let res1 = await fetch('http://localhost:8000/api/current-lecture', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }).then(res => res.json());
            console.log(res1);

            if(Object.keys(res1).length > 0){
                setLecture({
                    ...res1.lecture
                })
            }
            
            let arr = res.loggedIn.image.data;
            let narr = new Uint8Array(arr);
            let blob = new Blob([narr]);
            let objectUrl = URL.createObjectURL(blob);
            setUserInfo({
                image: objectUrl,
                username: res.loggedIn.username
            });

        })();

    }, []);

    return <StyledWrapper className={WrapperFlex.flex}>
        <StyledAppBar position='static'>
            <div className={flexStyle.flex}>
                <StyledPortrait className={classes.navChildren} src={userInfo.image} />
                {<h3 className={classes.navChildren}>{userInfo.username}</h3>}
                {<h3 onClick={logout} className={classes.navChildren}>Logout</h3>}
            </div>

        </StyledAppBar>
        <h1>Welcome Home</h1>

        {lecture ? <>
            <Decider end={new Date(lecture.end)} start={new Date(lecture.start)} url={lecture.src} id={lecture._id} />
        </> : <h1>No Lectures Scheduled</h1>}

        <AppBar style={{ background: '#0d3d6d', height: "15px" }} position='static'></AppBar>
    </StyledWrapper>
}