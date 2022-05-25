import { useContext } from "react";
import header from '../../assets/trackit_header.png'

import styled from "styled-components";

import UserContext from "../context/UserContext";

function Top({ pfp }) {
    return(
        <Content>
            <img src={header} alt="logo" />
            <img src={pfp} alt="foto de perfil" />
        </Content>
    );
}

export default function Header() {
    const { userContext } = useContext(UserContext);
    console.log(userContext)
    // const UserLogged = (() => !userContext.hasOwnProperty("token") ? "" : <Top />)
    // return(<UserLogged />)
    return <Top />
}

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    padding: 0 10px;
    position: fixed;
    background-color: #126BA5;
    top: 0;
    left: 0;
    box-sizing: border-box;

    img {
        width: 50px;
    }
`

const Logo = styled.img`

`