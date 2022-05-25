import { useContext } from "react";
import header from '../../assets/trackit_header.png'

import styled from "styled-components";

import UserContext from "../context/UserContext";

function Top({ header }) {
    return(
        <Content>
            <img src={header} />
        </Content>
    );
}

export default function Header() {
    const userContext = useContext(UserContext);
    // const UserLogged = (() => userContext.length === 0 ? "" : <Top header={header}></Top>)
    // return(<UserLogged />)
    return <Top header={header}></Top>
}

const Content = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 0 10px;
    justify-content: space-between;
    position: fixed;
    background-color: #126BA5;
    top: 0;
    left: 0;
    box-sizing: border-box;
`