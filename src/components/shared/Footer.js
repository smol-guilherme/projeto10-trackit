import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Footer() {
    return(
        <Content>
            <Button><Link to={"/habitos"}>Hábitos</Link></Button>
            <Progress><Link to={"/hoje"}>Hoje</Link></Progress>
            <Button><Link to={"/historico"}>Histórico</Link></Button>
        </Content>
    )
}

const Content = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 0 10px;
    justify-content: space-around;
    position: fixed;
    background-color: #126BA5;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
`

const Button = styled.div`
    display: flex;
`

const Progress = styled.div`
    display: flex;
`
