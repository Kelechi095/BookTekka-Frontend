import { AiOutlineSearch } from "react-icons/ai"

export default function Search({setSearchTerm, searchTerm}) {
  return (
    <div className="rounded-xl bg-zinc-100 px-2 my-2 flex items-center">
        <AiOutlineSearch size={20} />
        <input
          type="text"
          className="bg-zinc-100 outline-none px-2 py-[10px] w-full text-sm"
          placeholder="search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
  )
}
