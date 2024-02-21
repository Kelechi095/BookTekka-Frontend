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

  return (
    <div className="container">
      
      <div className=" px-4">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="content">
            <h2 className="hidden lg:block text-center text-3xl py-2 px-4 font-semibold uppercase font-mono text-neutral-500">Stats</h2>
            <Header title={"Stats"} />
            <div className="lg:grid lg:grid-cols-2  gap-2 lg:gap-8">
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
                    {data?.totalRecommendations}z
                  </p>
                  <IoEyeSharp size={40} className="text-purple-500" />
                </div>
                <p className="font-semibold text-gray-500 text-lg">
                  Recommendations
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
