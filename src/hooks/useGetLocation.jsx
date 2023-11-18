import { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'

export default function useGetLocation() {
    const {currentLocation, setCurrentLocation, } = useContext(GlobalContext)
  return (
    {currentLocation, setCurrentLocation}
  )
}
