import React, { useState } from 'react';
import userRegister from '@/libs/userRegister';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await userRegister(name, email, telephone, password);
            setMessage('Registration successful!');
            console.log(result);
        } catch (error) {
            setMessage('Registration failed. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className='text-center'><br/>
            <h1 className='font-[Open_Sans] text-xl '>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="telephone">Telephone:</label>
                    <input type="tel" id="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='bg-white text-cyan-600 border border-cyan-600 font-semibold py-2 px-2 m-2 rounded z-30 absolute hover:bg-cyan-600 hover:text-white hover:border-transparent' type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
