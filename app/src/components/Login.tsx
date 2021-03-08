import React, { useRef,useState } from 'react';
import { TextField, Button } from '@material-ui/core';

export const Login = () => {
	const fileRef = useRef<HTMLInputElement | null>(null);
	const signInRef = useRef<HTMLDivElement | null>(null);
	const signUpRef = useRef<HTMLDivElement | null>(null);
	const [signUpuName,setSignUpuName] = useState("");
	const [signUpPass, setSignUpPass] = useState("");
	const [signUpCPass, setSignUpCPass] = useState("");

	const textStyles = {
		width: '70%',
		margin: '5px 0px',
	};
	return (
		<div className="authPanel">
			<div ref={signInRef} className="login">
				<h3>Sign In</h3>
				<TextField style={textStyles} label="Username" />
				<TextField style={textStyles} label="Password" />
				<Button style={{ margin: '30px 0px' }} size="small" variant="outlined" color="primary" children="sign in" />
			</div>
			<div ref={signUpRef} className="signup">
				<h3>Sign Up</h3>
				<TextField value={signUpuName} onChange={(e) => {
					setSignUpuName(e.target.value);
				}} style={textStyles} label="Username" />
				<TextField value={signUpPass} onChange={(e) => {
					setSignUpPass(e.target.value);
				}} style={textStyles} label="Password" />
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
						if (signUpRef.current !== null && fileRef.current !== null && fileRef.current.files !== null) {
							console.log(signUpRef.current.childNodes);
							console.log(signUpuName);
							let childDivs = Array.from(signUpRef.current.childNodes).filter((ele) => {
								console.log(ele.nodeType)
									return (ele as HTMLDivElement).tagName === 'DIV';
							}); 
							// console.log(childDivs[0].textContent);
							const file = fileRef.current.files[0];
							console.log(fileRef.current.files);
							(async () => {
								let buffer = await file.arrayBuffer();
								let blob = new Blob([buffer]);
								const formData = new FormData();
								formData.append('uname',signUpuName);
								formData.append('pass', signUpPass);
								formData.append('buffer', blob);
								fetch(`http://localhost:5000/data`, {
									method: 'POST',
									body: formData,
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

