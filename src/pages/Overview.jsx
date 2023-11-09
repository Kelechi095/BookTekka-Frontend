import React from "react";
import Header from "../components/Header";
import {
    BiSolidBookReader,
    BiSolidBookAlt,
  } from "react-icons/bi";
  import { FaBook } from "react-icons/fa";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from "../components/Loader";

export default function Overview() {

    const fetchStats = async() => {
        const response = await axios.get(`${import.meta.env.VITE_BASE_ENDPOINT}/api/overview`)
        return response.data
    }

    const {data, isLoading} = useQuery("stats", fetchStats)

    if(isLoading) return <Loader />

  return (
    <div className="mx-auto text-slate-900 m-4 mt-6 px-4 mb-8 ">
      <Header title={"Stats"} />

      <div className="border border-b-[6px] shadow-sm border-b-red-500 rounded-b-lg h-48 mt-8 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-center">
            <p className="font-bold text-5xl text-red-500">{data?.totalUnread}</p>
            <BiSolidBookAlt size={48} className="text-red-500"/>
        </div>
        <p className="font-semibold text-gray-500 text-xl">Unread</p>
      </div>
      <div className="border border-b-[6px] shadow-sm border-b-blue-500 rounded-b-lg h-48 mt-8 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-center">
            <p className="font-bold text-5xl text-blue-500">{data?.totalReading}</p>
            <BiSolidBookReader size={48} className="text-blue-500"/>
        </div>
        <p className="font-semibold text-gray-500 text-xl">Reading</p>
      </div>
      <div className="border border-b-[6px] shadow-sm border-b-green-500 rounded-b-lg h-48 mt-8 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-center">
            <p className="font-bold text-5xl text-green-500">{data?.totalFinished}</p>
            <FaBook size={48} className="text-green-500"/>
        </div>
        <p className="font-semibold text-gray-500 text-xl">Finished</p>
      </div>
    </div>
  );
}
