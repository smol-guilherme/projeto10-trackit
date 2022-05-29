import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import header from '../../assets/trackit_header.png'
import altPfp from '../../assets/android-chrome-512x512.png'

import styled from "styled-components";

import UserContext from "../context/UserContext";

function Top({ pfp, display, setDisplay, logOff }) {
    const Dropdown = (() => {
        if(display) {
            return (
                <>
                    <ArrowUp />
                    <ExitButton onClick={logOff} >Sair</ExitButton>
                </>)
        } else {
            return <ExitIcon ><ion-icon name="exit-outline"></ion-icon></ExitIcon>
        }
    })
    return(
        <Content>
            <Logo src={header} alt="logo" />
            <Profile>
                <img src={pfp} onClick={() => setDisplay(!display)} alt={altPfp} />
                <Dropdown />
            </Profile>
        </Content>
    );
}

export default function Header() {
    const { userContext } = useContext(UserContext);
    const [display, setDisplay] = useState(false);
    const navigate = useNavigate();

    function logOff() {
        localStorage.clear();
        navigate("/")
    }

    const UserLogged = (() => !userContext.hasOwnProperty("token") ? null : <Top logOff={logOff} display={display} setDisplay={setDisplay} pfp={userContext.image} />)

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

const Profile = styled.div`
    height: 50px;
    width: 50px;
    position: relative;

    img {
        height: 50px;
        width: 50px;
        position: absolute;
        object-fit: cover;
        border-radius: 50%;
    }
`

const ArrowUp = styled.div`
    width: 0; 
    height: 0; 
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #52B6FF;
    position: absolute;
    bottom: -5px;
    right: 20px;
    z-index: 1;
`

const ExitIcon = styled.div`
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: #DBDBDB;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: -5px;
    right: -5px;
    z-index: 1;
`

const ExitButton = styled.div`
    width: 60px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #52B6FF;
    color: #FFFFFF;
    box-shadow: 0 1px -2px 2px #66666640;
    border-radius: 4px;
    position: absolute;
    bottom: -34px;
    right: 17px;
`