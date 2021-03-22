import React from 'react';

interface toDeviceSelect {
    devices: Array<MediaDeviceInfo | InputDeviceInfo>,
}

const DeviceSelect: (props: toDeviceSelect) => JSX.Element = ({ devices }) => {

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
        <select onChange={(e) => {
            console.log(e.target);
            console.log(e.currentTarget);
            console.log(e.target.querySelectorAll('option[data-did]'));
            console.log(e.target.value)
        }}>
            {devices.filter(ele => ele.kind === 'videoinput').map(ele => <option data-did={ele.deviceId}>{ele.label}</option>)}
        </select>
    </div>
}

export default DeviceSelect;