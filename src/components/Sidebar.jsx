import {LiaTimesSolid} from "react-icons/lia"

export default function Sidebar() {
  return (
    <div>
        <div className="flex gap-2">
          {
            <LiaTimesSolid
              size={30}
              className="cursor-pointer lg:hidden dark:text-white"
            />
          }
            <h1 className="font-bold text-xl font-mono mb-2">Booktekka</h1>
          </div>
          <h2>My Profile</h2>

    </div>
  )
}
