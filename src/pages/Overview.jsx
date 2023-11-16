import React from "react";
import Header from "../components/Header";
import { BiSolidBookReader, BiSolidBookAlt } from "react-icons/bi";
import { IoEyeSharp } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from "../components/Loader";
import { customFetch } from "../utils/customFetch";
import Nav from "../components/Nav";

export default function Overview() {
  const fetchStats = async () => {
    const response = await customFetch.get(`/overview`);
    return response.data;
  };

  const { data, isLoading } = useQuery("stats", fetchStats);

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto text-slate-900 grid lg:grid-cols-10 gap-2 relative">
      <div className="hidden lg:grid justify-center px-4 lg:fixed lg:w-[20%] lg:left-0  bg-white border-r h-screen">
        <Nav />
      </div>
      <div className=" px-4 lg:absolute lg:right-0 lg:w-[80%]  mt-2 gap-4">
        <h2 className="hidden lg:block">Stats</h2>
        <Header title={"Stats"} />
        <div className="lg:grid lg:grid-cols-2  gap-2">
        <div className="border border-b-[6px] shadow-sm border-b-red-500 rounded-b -lg h-48 mt-8 p-8 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <p className="font-bold text-4xl text-red-500">
              {data?.totalUnread}
            </p>
            <BiSolidBookAlt size={40} className="text-red-500" />
          </div>
          <p className="font-semibold text-gray-500 text-lg">Unread</p>
        </div>
        <div className="border border-b-[6px] shadow-sm border-b-blue-500 rounded-b-lg h-48 mt-8 p-8 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <p className="font-bold text-4xl text-blue-500">
              {data?.totalReading}
            </p>
            <BiSolidBookReader size={40} className="text-blue-500" />
          </div>
          <p className="font-semibold text-gray-500 text-lg">Reading</p>
        </div>
        <div className="border border-b-[6px] shadow-sm border-b-green-500 rounded-b-lg h-48 mt-8 p-8 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <p className="font-bold text-4xl text-green-500">
              {data?.totalFinished}
            </p>
            <FaBook size={40} className="text-green-500" />
          </div>
          <p className="font-semibold text-gray-500 text-lg">Finished</p>
        </div>
        <div className="border border-b-[6px] shadow-sm border-b-purple-500 rounded-b-lg h-48 mt-8 p-8 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <p className="font-bold text-4xl text-purple-500">
              {data?.totalRecommendations}
            </p>
            <IoEyeSharp size={40} className="text-purple-500" />
          </div>
          <p className="font-semibold text-gray-500 text-lg">Recommendations</p>
        </div>
        </div>
      </div>
    </div>
  );
}
