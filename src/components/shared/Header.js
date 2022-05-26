import { useContext } from "react";
import header from '../../assets/trackit_header.png'

import styled from "styled-components";

import UserContext from "../context/UserContext";

function Top({ pfp }) {
    return(
        <Content>
            <Logo src={header} alt="logo" />
            <Profile src={pfp} alt="foto de perfil" />
        </Content>
    );
}

export default function Header() {
    const { userContext } = useContext(UserContext);
    const UserLogged = (() => !userContext.hasOwnProperty("token") ? "" : <Top pfp={userContext.image} />)
    return(<UserLogged />)
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
    box-shadow: 0 1px 2px 2px #66666650;
    top: 0;
    left: 0;
    box-sizing: border-box;
    z-index: 1;
`

const Logo = styled.img`
    height: 50px;
    width: 100px;
    object-fit: contain;
`

const Profile = styled.img`
    height: 50px;
    width: 50px;
    object-fit: cover;
    border-radius: 50%;
`