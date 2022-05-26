import Header from './shared/Header'
import Footer from './shared/Footer'

import { useState, useEffect, useContext } from 'react'

import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/pt-br';

import axios from "axios";
import styled from "styled-components";
import UserContext from './context/UserContext';

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
const ROUTE_TODAY = "/today"

export default function History() {
    const { userContext, setUserContext, setProgress } = useContext(UserContext);
    
    useEffect(() => {
        let dataToken;
        if(!userContext.hasOwnProperty("token")) {
            let data = localStorage.getItem("login")
            data = JSON.parse(data)
            dataToken = data.token
            const newContext = { ...userContext }
            setUserContext({ newContext, token: dataToken, image: data.image })
        } else {
            dataToken = userContext.token
        }
        const config = {
            headers: {
                "Authorization": `Bearer ${dataToken}`
            }
        }
        getProgress(config)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getProgress(config) {
        const promise = axios.get(URL+ROUTE_TODAY, config)
        promise.then((res) => {
            const count = res.data.filter((item) =>{
                if (item.done) {
                    return item
                }
                return null
            })
            setProgress(Math.round((count.length/res.data.length)*100))
        });
    }
    
    return(
        <Content>
            <Header />
            <PageTop>
                <PageTitle>Histórico</PageTitle>
            </PageTop>
            <Template>Em breve você poderá ver o histórico dos seus hábitos aqui!</Template>
            <Footer />
        </Content>
    )
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 76vh;
    margin: 80px 0;
    padding: 0 2.5vw;
    font-size: 18px;
    color: #666666;
    background-color: #F2F2F2;
    box-sizing: border-box;
`

const PageTop = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 35px;
    margin-top: 15px;
    margin-bottom: 5px;
    justify-content: flex-end;
    align-items: flex-start;
`

const PageTitle = styled.h1`
    display: flex;
    font-size: 23px;
    color: #126BA5;
`

const Template = styled.p`
    display: flex;
    margin-bottom: 15px;
`