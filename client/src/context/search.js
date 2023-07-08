import { useState, useContext, createContext } from "react";

const searchContext = createContext();

const SearchProvider = ({children}) => {
    const [auth, setAuth] = useState({
        keyword:"",
        results: []
    });

    return (
        <searchContext.Provider value={[auth, setAuth]} >
            {children}
        </searchContext.Provider>
    )
}

//custom hook
const useSearch = () => useContext(searchContext)

export { useSearch, SearchProvider }