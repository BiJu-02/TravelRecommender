
// store the access token in localstorage
export const login = async (email, password) => {
	try {
		const resp = await fetch("http://localhost:4000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({email, password})
		});
		if (resp.ok) {
			const { access_token } = await resp.json();
            localStorage.setItem('access_token', access_token);
            return true;
		}
	} catch (err) {
		console.error("login error:", err)
	}
	return false;
};

export const register = async (email, password) => {
	try {
		const resp = await fetch("http://localhost:4000/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({email, password})
		});
		console.log(resp.status);
		if (resp.status === 201) {
			return true;
		} else if (resp.status === 409) {
			console.log("user already exists");
			return false;
		}
	} catch (err) {
		console.error("register error:", err)
	}
	console.log("some error occured during registration");
	return false;
};

// clear the access token in localstorage
export const logout = async () => {
	try {
		localStorage.removeItem('access_token');
		return true;
	} catch (err) {
		console.error("logout error:", err)
	}
	return false;
};

