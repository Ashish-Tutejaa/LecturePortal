import React, { useEffect, useState, useRef } from 'react';
import { CSSProperties } from 'react';

interface toVideoFeed {
    id: string | undefined,
}

const VideoFeed: (props: toVideoFeed) => JSX.Element = ({ id }) => {

    const [src, setSrc] = useState<MediaStream | undefined>(undefined);
    const vidRef = useRef<HTMLVideoElement | undefined>(undefined);

    useEffect(() => {
        // let timer = setInterval(() => {

        // }, 5000);
    },
        []);

    const askPermission = async () => {
        console.log('requesting permission');
        if ('mediaDevices' in window.navigator && 'getUserMedia' in window.navigator.mediaDevices && (typeof id !== undefined)) {
            try {
                let permission = await navigator.mediaDevices.getUserMedia({ video: { deviceId: id } });
                setSrc(permission);
            } catch (err) {
                alert(err);
            }
        }
    }

    useEffect(() => {
        askPermission();
    }, [id]);

    let videoStyles = { position: 'absolute', top: '50px', right: '50px', height: '200px', width: '200px' }


    return <>
        {src && <video style={videoStyles as CSSProperties}></video>}
    </>
}

export default VideoFeed;