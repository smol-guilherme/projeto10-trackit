import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import styled from "styled-components";
import UserContext from "../context/UserContext";
import axios from "axios";

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
const ROUTE_TODAY = "/today";

export default function Footer() {
    const { progress, setProgress, userContext, setUserContext } = useContext(UserContext)

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
    })

    function getProgress(config) {
        const promise = axios.get(URL+ROUTE_TODAY, config)
        promise.then((res) => {
            const count = res.data.filter((item) =>{
                if (item.done) {
                    return item
                }
                return null
            })
            const value = isNaN(Math.round((count.length/res.data.length)*100)) ? 0 : Math.round((count.length/res.data.length)*100)
            setProgress(value)
        });
    }

    return(
        <Content>
            <Button><Link to={"/habitos"}>Hábitos</Link></Button>
            <Progress>
                <Link to={"/hoje"}>
                    <CircularProgressbar 
                        background
                        backgroundPadding={6}
                        value={progress}
                        text='Hoje'
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            textColor: "#FFFFFF",
                            pathColor: "#FFFFFF",
                            trailColor: "transparent"
                        })} 
                    />
                </Link>
            </Progress>
            <Button><Link to={"/historico"}>Histórico</Link></Button>
        </Content>
    )
}

const Content = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    padding: 0 10px;
    justify-content: space-around;
    position: fixed;
    background-color: #FFFFFF;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    z-index: 1;
`

const Button = styled.div`
    display: flex;
    
    a {
        color: #52B6FF;
        text-decoration: none;
    }
`

const Progress = styled.div`
    display: flex;
    width: 100px;
    height: 100px;
    margin-bottom: 35px;
    box-sizing: border-box;
`
