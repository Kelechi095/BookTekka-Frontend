import { LiaTimesSolid } from "react-icons/lia";
import useGetContext from "../hooks/useGetContext";
import {MdMenuBook} from 'react-icons/md'
import {CgProfile} from 'react-icons/cg'
import {IoMdSettings} from 'react-icons/io'
import {BsPeopleFill, BsFillBarChartFill} from 'react-icons/bs'

export default function Sidebar() {
  const {isSidebarOpen, handleSidebar} = useGetContext()
  return (
    <div
      className={
        isSidebarOpen ? "inset-0 fixed  bg-black bg-opacity-10 min-h-screen z-10" : ""
      }
      onClick={handleSidebar}
    >
      <nav
        className={
          isSidebarOpen
            ? "w-[300px] bg-white py-4 px-4 text-[13px]  shadow-md h-full top-0 left-0 fixed duration-300"
            : "w-[300px] bg-white py-4 px-4 text-[13px]  shadow-md h-full top-0 -left-96 fixed duration-300"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-2 items-center my-2 mb-9">
          {
            <LiaTimesSolid
              size={25}
              className="cursor-pointer"
              onClick={handleSidebar}
            />
          }
          
        </div>

        <ul className='py-1 bg-white h-48 flex justify-around flex-col'>
            <li className='cursor-pointer flex gap-4 items-center text-gray-700 mt-4'>
                <MdMenuBook size={30}/>
                <span className={'font-semibold text-base'}>Library</span>
            </li>
            <li className='cursor-pointer flex gap-4 items-center text-gray-700 mt-4'>
                <BsPeopleFill size={30} />
                <span className='font-semibold text-base '>Recommendation</span>
            </li>
            <li className='cursor-pointer flex gap-4 items-center text-gray-700 mt-4'>
                <BsFillBarChartFill size={30} />
                <span className='font-semibold text-base '>Stats</span>
            </li>
            <li className='cursor-pointer flex gap-4 items-center text-gray-700 mt-4'>
                <CgProfile size={30}/>
                <span className='font-semibold text-base'>Profile</span>
            </li>
            <li className='cursor-pointer flex gap-4 items-center text-gray-700 mt-4'>
                <IoMdSettings size={30}/>
                <span className='font-semibold text-base'>Setting</span>
            </li>
            
        </ul>
      </nav>
    </div>
  );
}


