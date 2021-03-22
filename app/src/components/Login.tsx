import React, { useRef, useState, useContext } from 'react';
import { TextField, Button } from '@material-ui/core';
import { GuidingContext } from '../Navigator';

interface toLogin {
	href: string;
}

export const Login = (props: toLogin) => {
	const [checkLogin, setCheckLogin] = useState<number>(0);
	const Guide = useContext(GuidingContext);
	const fileRef = useRef<HTMLInputElement | null>(null);
	const signInRef = useRef<HTMLDivElement | null>(null);
	const signUpRef = useRef<HTMLDivElement | null>(null);
	const [signInName, setSignInName] = useState("");
	const [signInPass, setSignInPass] = useState("");
	const [signUpuName, setSignUpuName] = useState("");
	const [signUpPass, setSignUpPass] = useState("");
	const [signUpCPass, setSignUpCPass] = useState("");

	const textStyles = {
		width: '70%',
		margin: '5px 0px',
	};
	if (props.href !== Guide.currentPath)
		return null;
	return (
		<div className="authPanel">
			<div ref={signInRef} className="login">
				<h3>Sign In</h3>
				<TextField value={signInName} onChange={e => setSignInName(e.target.value)} style={textStyles} label="Username" />
				<TextField value={signInPass} onChange={e => setSignInPass(e.target.value)} style={textStyles} label="Password" />
				<Button onClick={async (e) => {
					let headers = null;
					let resp = await fetch('http://localhost:8000/auth/login', {
						method: "POST",
						headers: {
							'Content-Type': 'application/json'
						},
						credentials: 'include',
						body: JSON.stringify({ username: signInName, password: signInPass })
					}).then(res => {
						if (res.status !== 200) {
							return Promise.resolve(null);
						} else {
							headers = res.headers;
							return res.blob()
						}
					});

					if (resp !== null) {
						console.log(resp, headers);
						let username = 'Anonymous'
						if (headers !== null) {
							for (let [ik, ival] of (headers as any).entries()) {
								console.log(ik, ival);
								if (ik === 'username')
									username = ival;
							}
						}
						const image_url = URL.createObjectURL(resp);
						console.log(image_url, username);
						localStorage.setItem('image_url', image_url);
						localStorage.setItem('username', username);
						Guide.setUser(username, image_url);
						Guide.changePath("/home");
					} else alert("Unable to login.");
				}} style={{ margin: '30px 0px' }} size="small" variant="outlined" color="primary" children="sign in" />
			</div>
			<div ref={signUpRef} className="signup">
				<h3>Sign Up</h3>
				<TextField value={signUpuName} onChange={(e) => {
					setSignUpuName(e.target.value);
				}} style={textStyles} label="Username" />
				<TextField value={signUpPass} onChange={(e) => { setSignUpPass(e.target.value) }} style={textStyles} label="Password" />
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
							const file = fileRef.current.files[0];
							console.log(fileRef.current.files);
							(async () => {
								let buffer = await file.arrayBuffer();
								let blob = new Blob([buffer]);
								const formData = new FormData();
								formData.append('uname', signUpuName);
								formData.append('pass', signUpPass);
								formData.append('buffer', blob);
								fetch(`http://localhost:8000/auth/signup`, {
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