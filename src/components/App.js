import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Goals from "./Goals";
import Header from "./shared/Header";
import Home from "./Home";
import Register from "./Register";
import Track from "./Track";

import GlobalStyle from "../assets/globalStyles";
import UserContext from "./shared/UserContext";

export default function App() {
    const [userContext, setUserContext] = useState('');
    const contextValue = { userContext, setUserContext }
    return (
        <BrowserRouter>
            <UserContext.Provider value={contextValue}>
                <GlobalStyle />
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cadastro" element={<Register />} />
                    <Route path="/habitos" element={<Goals />} />
                    <Route path="/hoje" element={<Track />} />
                    {/* <Route path="/historico" element={<History />} /> */}
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    )
}