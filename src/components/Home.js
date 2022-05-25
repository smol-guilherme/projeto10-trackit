import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react";

import axios from "axios";
import styled from "styled-components";
import UserContext from "./shared/UserContext";

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"

export default function Home() {
    const { userContext, setUserContext } = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const autoLogin = localStorage.getItem("login");
        if (autoLogin !== null) {
            const parseUser = JSON.parse(autoLogin)
            setEmail(parseUser.email)
            setPassword(parseUser.password)
            const login = { email: parseUser.email, password: parseUser.password }
            userLogin(login);
        }
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        const login = { email: email, password: password }
        userLogin(login);
    }

    function userLogin(login) {
        const promise = axios.post(URL, login)
        promise.then((res) => {
            setEmail('')
            setPassword('')
            setUserContext(res.data.token)
            const user = JSON.stringify(res.data)
            localStorage.setItem("login", user)
            navigate("/hoje", { state: res.data.token })
        })
        promise.catch((err) => console.log(err.response.status))
    }

    return (
        <>
            <img src="../assets/trackit_logo.png" alt="Logotipo da aplicação" />
            <form onSubmit={handleSubmit}>
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
                <input type={'submit'} value='Entrar' />
            </form>
            <div><Link to="/cadastro">Não tem uma conta? cadastre-se</Link></div>
        </>
    )
}