import React, { useRef } from 'react';
import { TextField, Button } from '@material-ui/core';

export const Login = () => {
	const fileRef = useRef<HTMLInputElement | null>(null);

	const textStyles = {
		width: '70%',
		margin: '5px 0px',
	};
	return (
		<div className="authPanel">
			<div className="login">
				<h3>Sign In</h3>
				<TextField style={textStyles} label="Username" />
				<TextField style={textStyles} label="Password" />
				<Button style={{ margin: '30px 0px' }} size="small" variant="outlined" color="primary" children="sign in" />
			</div>
			<div className="signup">
				<h3>Sign Up</h3>
				<TextField style={textStyles} label="Username" />
				<TextField style={textStyles} label="Password" />
				<TextField style={textStyles} label="Confirm Password" />
				<Button
					onClick={e => {
						e.preventDefault();
						if (fileRef.current !== null) {
							fileRef.current.click();
						}
					}}
					style={{ margin: '15px 0px' }}
					size="small"
					variant="contained"
					color="default"
					children="Select ID Photo"
				/>
				<Button
					type="submit"
					onClick={e => {
						if (fileRef.current !== null && fileRef.current.files !== null) {
							const file = fileRef.current.files[0];
							console.log(fileRef.current.files);
							(async () => {
								let buffer = await file.arrayBuffer();
								fetch('http://localhost:5000/getData', {
									method: 'POST',
									headers: {
										'Content-Type': 'application/octet-stream',
									},
									body: buffer,
								});
							})();
						}
					}}
					size="small"
					variant="contained"
					color="primary"
					children="sign up"
				/>
				<input ref={fileRef} type="file" hidden></input>
				<canvas id="canvas" style={{ display: 'none' }} />
			</div>
		</div>
	);
};

