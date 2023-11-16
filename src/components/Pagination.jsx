import { BiChevronsRight, BiChevronsLeft } from "react-icons/bi";

export default function Pagination({
  data,
  currentPage,
  handlePageNext,
  handlePagePrev,
}) {
  return (
    <div className="flex justify-end items-center gap-8 my-[12px] lg:my-4">
      <button
        className="border shadow-sm flex items-center rounded lg:text-lg text-cyan-500 px-2 bg-white disabled:text-gray-400 cursor-pointer"
        disabled={currentPage === 1}
        onClick={handlePagePrev}
      >
        Prev
        <BiChevronsLeft size={20} className=" mt-1 " />
      </button>
      <button
        className="border shadow-sm flex items-center rounded lg:text-lg text-cyan-500 px-2 bg-white disabled:text-gray-400 cursor-pointer"
        disabled={currentPage === data?.numOfPages}
        onClick={handlePageNext}
      >
        Next
        <BiChevronsRight size={20} className="  mt-1 " />
      </button>
    </div>
  );
}
