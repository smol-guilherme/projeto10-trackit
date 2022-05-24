import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [picture, setPicture] = useState('')


    function userRegister(e) {
        e.preventDefault();
        const registry = { email: email, name: userName, image: picture, password: password }
        console.log(registry)

        const promise = axios.post(URL, registry);
        promise.then((res) => {
            setEmail('');
            setPassword('');
            setUserName('');
            setPicture('');
            console.log(res.data)
        });
        promise.catch((err) => console.log(err.response.status));
    }

    return (
        <>
            <form onSubmit={userRegister}>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type={'email'}
                    placeholder='email'
                    required
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={'password'}
                    placeholder='senha'
                    required
                />
                <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    type={'text'}
                    placeholder='nome'
                    pattern="[A-Za-z]{1, 31}"
                    required
                />
                <input
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                    type={'text'}
                    placeholder='foto'
                    required
                />
                <input type={'submit'} value='Cadastrar' />
            </form>
            <div><Link to="/">Já tem uma conta? Faça login</Link></div>
        </>)
}