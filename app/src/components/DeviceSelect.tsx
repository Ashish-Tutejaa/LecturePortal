import React, { useRef } from 'react';

export interface toDeviceSelect {
    devices: Array<MediaDeviceInfo | InputDeviceInfo>,
    idSetter: React.Dispatch<React.SetStateAction<string | undefined>>,
}

const DeviceSelect: (props: toDeviceSelect) => JSX.Element = ({ devices, idSetter }) => {

    const ref = useRef<null | HTMLSelectElement>(null);

    const askPermission = async (ele: InputDeviceInfo | MediaDeviceInfo) => {
        if ('mediaDevices' in window.navigator && 'getUserMedia' in window.navigator.mediaDevices) {
            navigator.mediaDevices.enumerateDevices().then(res => {
                console.log(res);
            });
            navigator.mediaDevices.getUserMedia({ video: { deviceId: ele.deviceId } }).then(stream => {
                console.log(stream);
            })
        }
    }

    return <div>
        <select ref={ref} onChange={() => {
            if (ref.current !== null) {
                let id = ref.current.selectedOptions[0].dataset['did'];
                idSetter(id);
            }
        }}>
            {devices.filter(ele => ele.kind === 'videoinput').map(ele => <option data-did={ele.deviceId}>{ele.label}</option>)}
        </select>
    </div>
}

export default DeviceSelect;