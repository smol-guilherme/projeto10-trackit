import { useContext } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import UserContext from "../context/UserContext";

export default function Footer() {
    const { progress, userContext } = useContext(UserContext)
    return(
        <Content>
            <Button><Link to={"/habitos"}>Hábitos</Link></Button>
            <Progress><Link to={"/hoje"}>Hoje</Link></Progress>
            <p>{ progress }</p>
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
    background-color: #126BA5;
    box-shadow: 0 -1px 2px 2px #66666650;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    z-index: 1;
`

const Button = styled.div`
    display: flex;
`

const Progress = styled.div`
    display: flex;
`
