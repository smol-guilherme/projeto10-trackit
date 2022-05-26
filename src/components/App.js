import { BrowserRouter, Routes, Route } from "react-router-dom";

import Goals from "./Goals";
import Header from "./shared/Header";
import Home from "./Home";
import Register from "./Register";
import Track from "./Track";
import History from "./History";

import GlobalStyle from "../assets/globalStyles";
import { UserContextProvider } from "./context/UserContext";

export default function App() {
    return (
        <UserContextProvider>
            <BrowserRouter>
                    <GlobalStyle />
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cadastro" element={<Register />} />
                        <Route path="/habitos" element={<Goals />} />
                        <Route path="/hoje" element={<Track />} />
                        <Route path="/historico" element={<History />} />
                    </Routes>
            </BrowserRouter>
        </UserContextProvider>
    )
}
