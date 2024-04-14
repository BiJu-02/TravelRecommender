import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from "../utils/auth";

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confPassword) {
            alert("confirm password does not match");
            console.log("confirm password mismatch")
            return;
        }
        if (await register(email, password)) {
            navigate('/login', { replace: true });
        }

    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="email" className="block font-bold mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block font-bold mb-2">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block font-bold mb-2">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Register
            </button>
        </form>
    );
};

export default RegisterForm;