import axios from "axios";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/trackit_logo.png"



const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [picture, setPicture] = useState('')
    const [interact, setInteract] = useState(false)

    function userRegister(e) {
        e.preventDefault();
        const registry = { email: email, name: userName, image: picture, password: password }
        console.log(registry)
        setInteract(!interact)

        const promise = axios.post(URL, registry);
        setEmail('');
        setPassword('');
        setUserName('');
        setPicture('');
        promise.then((res) => {
            console.log(res.data)
        });
        promise.catch((err) => alert(err.response.status));
    }

    const IsLoading = (() => {
        if(!interact) {
            return (<Button type={'submit'} interact={interact}>Entrar</Button>)
        }
        return <Button><ThreeDots height="15px" width="60px" color="#FFFFFF" /></Button>
    })

    return (
        <Container>
            <Logo src={logo} alt="Logotipo da aplicação" />
            <InputWrapper onSubmit={userRegister}>
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
                    required
                />
                <input
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                    type={'text'}
                    placeholder='foto'
                    required
                />
                <IsLoading />
            </InputWrapper>
            <Text><Link to="/">Já tem uma conta? Faça login</Link></Text>
        </Container>)
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
        pointer-events: ${ ({ interact }) => !interact ? 'auto' : 'none' };
        background-color: ${ ({ interact }) => !interact ? '#FFFFFF' : '#F2F2F2' };
        color: ${ ({ interact }) => !interact ? '#666666' : '#AFAFAF' };
        width: 100%;
        height: 40px;
        margin: 5px 0;
        padding: 4px 16px;
        border: 1px solid #D4D4D4;
        border-radius: 5px;
        box-sizing: border-box;

        &::placeholder {
        color: #DBDBDB
        }
    }
`

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: ${ ({ disable }) => !disable ? '#52B6FF' : '#52B6FF70' }; ;
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
