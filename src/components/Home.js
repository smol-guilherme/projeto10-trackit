import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";

import axios from "axios";
import styled from "styled-components";
import logo from "../assets/trackit_logo.png"
import UserContext from "./context/UserContext";

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"

export default function Home() {
    const { setUserContext } = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [interact, setInteract] = useState(true)

    useEffect(() => {
        setUserContext({})
        const autoLogin = localStorage.getItem("login");
        if (autoLogin !== null) {
            const parseUser = JSON.parse(autoLogin)
            setEmail(parseUser.email)
            setPassword(parseUser.password)
            const login = { email: parseUser.email, password: parseUser.password }
            userLogin(login);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        e.target.blur();
        const login = { email: email, password: password }
        userLogin(login);
    }

    function userLogin(login) {
        const promise = axios.post(URL, login)
        setInteract(false)
        promise.then((res) => {
            setUserContext( {
                token: res.data.token,
                image: res.data.image,
            })
            const user = JSON.stringify(res.data)
            localStorage.setItem("login", user)
            navigate("/hoje")
        })
        promise.catch((err) => { alert(err.response.data.message); toggleInputs(); })
    }

    function toggleInputs() {
        setInteract(true);
        setEmail('');
        setPassword('');
    }

    const IsLoading = (() => {
        if(interact) {
            return (<Button type={'submit'} interact={interact}>Entrar</Button>)
        }
        return <Button><ThreeDots height="15px" width="60px" color="#FFFFFF" /></Button>
    })

    return (
        <Container>
            <Logo src={logo} alt="Logotipo da aplicação" />
            <InputWrapper onSubmit={handleSubmit} interact={interact}>
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
                <IsLoading />
            </InputWrapper>
            <Text><Link to="/cadastro">Não tem uma conta? cadastre-se</Link></Text>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-top: 12vh;
`

const Logo = styled.img`
`

const InputWrapper = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 3vh 5vh;
    box-sizing: border-box;

    input {
        display: flex;
        pointer-events: ${ ({ interact }) => interact ? 'auto' : 'none' };
        background-color: ${ ({ interact }) => interact ? '#FFFFFF' : '#F2F2F2' };
        color: ${ ({ interact }) => interact ? '#666666' : '#AFAFAF' };
        width: 100%;
        height: 40px;
        margin: 5px 0;
        padding: 4px 12px;
        border: 1px solid #D4D4D4;
        border-radius: 5px;
        box-sizing: border-box;

        &::placeholder {
        	font-family: 'Lexend Deca';
            font-size: 20px;
            color: #DBDBDB
        }
    }
`

const Button = styled.button`
	font-family: 'Lexend Deca';
    font-size: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: ${ ({ interact }) => interact ? '#52B6FF' : '#52B6FF70' }; ;
    color: #FFFFFF;
    width: 100%;
    height: 40px;
    margin: 5px 0;
    padding: 4px 16px;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    box-sizing: border-box;
`

const Text = styled.p`
    font-size: 14px;
    color: #52B6FF;
    text-decoration: underline;

    a {
        font-size: 14px;
        color: #52B6FF;
        text-decoration: underline;
    }
`
