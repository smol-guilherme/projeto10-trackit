import { useContext } from "react";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import styled from "styled-components";
import UserContext from "../context/UserContext";

export default function Footer() {
    const { progress, userContext } = useContext(UserContext)

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
            {/* <p>{ progress }</p> */}
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
