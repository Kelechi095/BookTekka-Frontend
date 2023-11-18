import { createContext, useState } from "react";

const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const handleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <GlobalContext.Provider value={{
            handleSidebar,
            setIsSidebarOpen,
            isSidebarOpen,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext