import { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'

export default function useGetContext() {
    const {isSidebarOpen, setIsSidebarOpen, handleSidebar} = useContext(GlobalContext)

  return {isSidebarOpen, setIsSidebarOpen, handleSidebar}
}
