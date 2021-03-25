import React, { useEffect, useRef, useState } from 'react';
import DeviceSelect from './DeviceSelect';
import VideoFeed from './VideoFeed';

interface toDecider {
	start: Date;
	end: Date;
	url: string;
	id: string;
}

const Decider: (props: toDecider) => JSX.Element = ({ start, end, url, id }) => {
	const [view, setView] = useState<number>(0);
	//0 - before
	//1 - during
	//2 - lecture over
	const [devices, setDevices] = useState<Array<MediaDeviceInfo | InputDeviceInfo>>([]);
	const [selectedDeviceID, setSelectedDeviceID] = useState<string | undefined>(undefined);
    const testingRef = useRef<number>(0);
    const canvasRef = useRef<null | HTMLCanvasElement>(null);
    const vidRef = useRef<HTMLVideoElement | null>(null);

    console.log('re-rendering...');
    //timer function
    const timer = function rec(){
        console.log(testingRef.current);

        if (canvasRef.current && vidRef.current) {
            let canvas = canvasRef.current;
            let vid = vidRef.current;
            canvas.width = vid.videoWidth;
            canvas.height = vid.videoHeight;
            canvas.getContext('2d')?.drawImage(vid, 0, 0);
            canvas.toBlob(async (blob) => {
                if(blob === null)
                    return;

                let buffer = await blob.arrayBuffer();
                let arr8 = new Uint8Array(buffer);
                console.log(blob,buffer, arr8);
                let resp = await fetch('http://localhost:8000/image/verify', {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/octet-stream',
                        'Authorization' : `Bearer ${localStorage.getItem('token')}`
                    }, 
                    body : arr8,
                    credentials : 'include'
                }).then(res => res.json());
                console.info(resp);
            });
        }

        if(testingRef.current === 1){
            setTimeout(() => {
                console.log('logging...');
                rec();
            }, 5000);
        }
    }

	useEffect(() => {
        testingRef.current = view;
		(async () => {
			if (view !== 1) return;
            //setup interval
            timer();

			if ('mediaDevices' in window.navigator && 'getUserMedia' in window.navigator.mediaDevices) {
				try {
					let permission = await navigator.mediaDevices.getUserMedia({ video: true });
					console.log(permission);
					navigator.mediaDevices.enumerateDevices().then(res => {
                    console.log(res);
                    setDevices(res);
					});
				} catch (err) {
					alert(err);
				}
			}
		})();
	}, [view]);

	useEffect(() => {
		let nowSecs = new Date().getTime();
		let startSecs = start.getTime();
		let endSecs = end.getTime();
        let diffs = startSecs - nowSecs;
        let diffe = endSecs - nowSecs;

		if (nowSecs < startSecs) {
			//setup timer for start time and end time
			setTimeout(_ => {
				setView(1);
			}, diffs);
			setTimeout(_ => {
				setView(2);
			}, diffe);
		} else if (nowSecs < endSecs) {
			//setup timer for end time
            setTimeout(_ => {
                setView(2);
            }, diffe)
			setView(1);
		} else setView(2);
	}, []);

	return (
		<>
			<h1>{view === 0 ? `Lecture is scheduled for ${start.toUTCString()}` : view === 1 ? `Lecture is live` : `Lecture is over`}</h1>
			{view === 1 ? (
				<>
					<DeviceSelect idSetter={setSelectedDeviceID} devices={devices} />
					<VideoFeed vidRef={vidRef} canvasRef={canvasRef} id={selectedDeviceID} />
					<iframe
						style={{ margin: '30px 0px' }}
						width="500"
						height="500"
						src={url}
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen></iframe>
				</>
			) : null}
		</>
	);
};

export default Decider;
