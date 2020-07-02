import React, { useState } from 'react';

import api from '../../services/api';

export default function Login({ history }) {
    const [email, setEmail] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        if (email.length) {
            const response = await api.post('/user', { email });
            const { _id } = response.data;
            localStorage.setItem('userid', _id);
            history.push('/dashboard');
        }
    }
    return (
        <>
            <p>
                Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa!
        </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input
                    type="email"
                    required
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name="email"
                    id="email"
                    placeholder="Seu melhor e-mail" />
                <button type="submit" className="btn">Entrar</button>
            </form>
        </>
    );
}
