import React from 'react'
import {MdMenuBook} from 'react-icons/md'
import {CgProfile} from 'react-icons/cg'
import {IoMdSettings} from "react-icons/io"
import {BsPeopleFill, BsFillBarChartFill} from 'react-icons/bs'
import { useLocation } from 'react-router-dom'

export default function BottomBar() {
    const location = useLocation()

    const currentPage = location.pathname.slice(1)
    console.log(currentPage)

  return (
    <nav className='border-2 shadow-2xl fixed bottom-0 w-full lg:hidden'>
        <ul className='px-4 py-1 bg-white w-full flex justify-between '>
            <li className={currentPage === '' ? 'cursor-pointer flex flex-col items-center text-black' : 'cursor-pointer flex flex-col items-center text-gray-500'}>
                <MdMenuBook size={25}/>
                <span className={'font-semibold text-xs'}>Library</span>
            </li>
            <li className={currentPage === 'Recommendation' ? 'cursor-pointer flex flex-col items-center text-black' : 'cursor-pointer flex flex-col items-center text-gray-500'}>
                <BsPeopleFill size={25} />
                <span className='font-semibold text-xs '>Recommendation</span>
            </li>
            <li className='cursor-pointer flex flex-col items-center text-gray-500'>
                <BsFillBarChartFill size={25} />
                <span className='font-semibold text-xs '>Stats</span>
            </li>
            <li className='cursor-pointer flex flex-col items-center text-gray-500'>
                <CgProfile size={25}/>
                <span className='font-semibold text-xs'>Profile</span>
            </li>
            
        </ul>
    </nav>
  )
}
