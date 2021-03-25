import React, { useEffect, useState, useRef } from 'react';
import { CSSProperties } from 'react';

interface toVideoFeed {
    id: string | undefined,
}

const VideoFeed: (props: toVideoFeed) => JSX.Element = ({ id }) => {

    const [src, setSrc] = useState<MediaStream | null>(null);
    const vidRef = useRef<HTMLVideoElement | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        console.log(vidRef.current);
        if (vidRef.current !== null) {
            vidRef.current.srcObject = src;
            vidRef.current.play();
        }
        // let timer = setInterval(() => {

        // }, 5000);
    }, [src]);

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

    let videoStyles = { position: 'absolute' as 'absolute', top: '50px', right: '50px', height: '200px', width: '200px' }


    return <>
        {src && <video ref={vidRef} style={{ ...videoStyles }}></video>}
        <canvas style={{ display: 'none' }} ref={canvasRef}></canvas>
        <img style={{ ...videoStyles, top: '270px' }} ref={imgRef} />
        <button style={{ ...videoStyles, height: '50px', width: '100px', top: '500px' }} onClick={() => {
            if (imgRef.current && canvasRef.current && vidRef.current) {
                let canvas = canvasRef.current;
                let vid = vidRef.current;
                let img = imgRef.current;
                canvas.width = vid.videoWidth;
                canvas.height = vid.videoHeight;
                canvas.getContext('2d')?.drawImage(vid, 0, 0);
                img.src = canvas.toDataURL('image/webp');
            }
        }}>Screenshot</button>
    </>
}

export default VideoFeed;