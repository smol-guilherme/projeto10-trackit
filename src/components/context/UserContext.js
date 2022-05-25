import { createContext, useState } from "react"

const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [userContext, setUserContext] = useState({});
    const [progress, setProgress] = useState(0)

    if(userContext.token === "") {
        const data = JSON.parse(localStorage.getItem("login"));
        const token = data.token;
        const image = data.image;
        setUserContext({ token, image });
    }

    return(
        <UserContext.Provider value={{ userContext, setUserContext, progress, setProgress }}>
            { children }
        </UserContext.Provider>
    );
}

export default UserContext;